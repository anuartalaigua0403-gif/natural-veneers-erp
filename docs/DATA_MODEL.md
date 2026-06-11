# Data Model — Natural Veneers ERP

## Almacenamiento actual
Todo en `localStorage` del browser con key `nv_orders`. Schema JSON documentado aquí.

---

## Entidad: Order (Caso)

```typescript
interface OrderItem {
  product: string        // ej: "Corona Zirconio", "Carilla Porcelana"
  units: number          // cantidad de unidades
  unitPrice: number      // precio por unidad (COP o USD)
  discount?: number      // descuento porcentual (0-100)
}

interface HistoryEvent {
  stage: Stage           // etapa donde ocurrió el evento
  at: string             // ISO timestamp
  by?: string            // usuario que realizó la acción
  note?: string          // nota opcional
}

interface Insumo {
  name: string           // nombre del insumo
  qty: number            // cantidad utilizada
}

type Stage =
  | 'received'           // Recibido
  | 'pending_refs'       // Esperando referencias
  | 'digital'            // Diseño digital
  | 'printing'           // Impresión 3D
  | 'injection'          // Inyección
  | 'ceramic'            // Cerámica
  | 'qc'                 // Control de calidad
  | 'dispatch'           // Despacho
  | 'dispatched'         // Despachado ✓
  | 'delivered'          // Entregado ✓

type Currency = 'COP' | 'USD'

interface Order {
  id: string             // "DL-2024-0001" (auto-generado)
  dentist: string        // Cliente / Odontólogo
  patient: string        // Nombre del paciente
  country: string        // País del cliente (Colombia, etc.)
  phone?: string         // Teléfono de contacto
  dueDate?: string       // Fecha compromiso (ISO)
  priority?: 'normal' | 'urgent'
  
  items: OrderItem[]     // Productos del caso
  currency: Currency     // Moneda de facturación
  
  status: Stage          // Estado actual
  history: HistoryEvent[] // Historial completo de estados
  
  responsibles: {        // Empleado responsable por etapa
    digital?: string
    injection?: string
    ceramic?: string
    qc?: string
  }
  
  insumos: Insumo[]      // Insumos utilizados
  
  isWarranty: boolean    // true = caso de repetición/garantía
  warrantyReason?: string // Motivo de la garantía
  warrantyRef?: string   // ID del caso original
  
  createdAt: string      // ISO timestamp de creación
  completedAt?: string   // ISO timestamp de finalización
  
  cotizacion?: {         // Datos de cotización
    id: string           // "COT-2024-001"
    sentAt?: string
    approvedAt?: string
  }
  
  payments: Payment[]    // Pagos realizados
  notes?: string         // Notas internas
}
```

## Entidad: Payment

```typescript
interface Payment {
  id: string             // UUID
  amount: number         // Monto
  currency: Currency     // COP | USD
  method: 'transferencia' | 'efectivo' | 'nequi' | 'daviplata' | 'otro'
  date: string           // ISO date
  note?: string
}
```

## Entidad: User

```typescript
interface User {
  username: string
  role: 'admin' | 'asistente'
  dept?: Department
  displayName?: string
}

type Department = 'Admin' | 'Digital' | 'Inyección' | 'Cerámica' | 'QC'
```

## Estado global (localStorage)

```typescript
// localStorage keys
'nv_orders'   → Order[]        // Todos los casos
'nv_counter'  → number         // Contador para IDs
'nv_cur'      → 'COP' | 'USD' // Moneda activa
'nv_prices'   → Record<string, {cop: number, usd: number}> // Precios custom
'nv_theme'    → 'dark' | 'light'
'nv_session'  → string         // Username activo
```

## Catálogo de productos (hardcoded + customizable)

| Producto | Precio COP | Precio USD |
|---------|-----------|-----------|
| Corona Zirconio Monolítica | $180,000 | $45 |
| Corona Metal Porcelana | $150,000 | $38 |
| Carilla Porcelana | $200,000 | $50 |
| Corona E-max | $220,000 | $55 |
| Prótesis Parcial Removible | $350,000 | $88 |
| Prótesis Total | $450,000 | $113 |
| Retenedor/Hawley | $120,000 | $30 |
| Puente 3 unidades | $480,000 | $120 |
| Implante Corona | $250,000 | $63 |

## Flujo de estados (State Machine)

```
received → pending_refs → digital → printing → injection → ceramic → qc → dispatch → dispatched
                       ↘                                                              ↘
                        → digital → injection → ceramic → qc → dispatch             delivered
                        
Cualquier estado → isWarranty = true (repetición)
TERM states: ['dispatched', 'delivered'] → auto-archive after 72h
```

## Empleados predefinidos

```typescript
const EMP_DEPT = {
  'Sheyla':    'Admin',
  'Mabridis':  'Admin',
  'Yeiner':    'Digital',
  'Cesar':     'Digital',
  'Eliecer':   'Inyección',
  'Keiner':    'Inyección',
  'Alexander': 'Cerámica',
  'Karolay':   'Cerámica',
  'Keid':      'QC',
}
```

---

## Migración futura a base de datos

Schema PostgreSQL (Supabase-ready):

```sql
-- orders table
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  dentist TEXT NOT NULL,
  patient TEXT,
  country TEXT DEFAULT 'Colombia',
  status TEXT NOT NULL,
  currency TEXT DEFAULT 'COP',
  is_warranty BOOLEAN DEFAULT FALSE,
  warranty_reason TEXT,
  warranty_ref TEXT REFERENCES orders(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  notes TEXT,
  lab_id UUID REFERENCES labs(id)  -- para SaaS multi-tenant
);

CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id TEXT REFERENCES orders(id) ON DELETE CASCADE,
  product TEXT NOT NULL,
  units INTEGER DEFAULT 1,
  unit_price NUMERIC(12,2),
  discount NUMERIC(5,2) DEFAULT 0
);

CREATE TABLE order_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id TEXT REFERENCES orders(id) ON DELETE CASCADE,
  stage TEXT NOT NULL,
  occurred_at TIMESTAMPTZ DEFAULT NOW(),
  by_user TEXT
);

CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id TEXT REFERENCES orders(id) ON DELETE CASCADE,
  amount NUMERIC(12,2),
  currency TEXT DEFAULT 'COP',
  method TEXT,
  paid_at DATE,
  note TEXT
);
```
