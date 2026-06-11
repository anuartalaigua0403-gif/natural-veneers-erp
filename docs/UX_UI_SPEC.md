# UX/UI Specification — Natural Veneers ERP

## Principios de UX

### 1. Orientado al flujo de trabajo del laboratorio
Los técnicos del lab tienen las manos ocupadas. La interfaz debe:
- Mostrar el estado de todos los casos de un vistazo (Kanban)
- Permitir actualizaciones en 2-3 clics
- Alertas automáticas para casos retrasados

### 2. Densidad + claridad
- No paginar cuando se puede scrollear
- Información compacta pero legible (13-14px body)
- Color semántico consistente en toda la app

### 3. Sin fricción
- No hay confirmaciones para acciones reversibles
- Los formularios recuerdan el último valor usado
- Autoguardado inmediato (localStorage)

---

## Flujos de usuario

### Flujo 1: Crear nuevo caso
```
Header → "+ Nuevo Caso"
  ↓
Modal: Datos del caso
  ├── Cliente (autocomplete)
  ├── Paciente
  ├── País
  ├── Productos (+ agregar ítems)
  │     ├── Seleccionar producto del catálogo
  │     ├── Unidades
  │     ├── Precio (auto desde catálogo)
  │     └── Descuento %
  ├── Fecha compromiso
  ├── Notas
  └── Insumos utilizados
  ↓
Guardar → Caso aparece en Kanban (columna "Recibido")
  ↓
Sistema asigna ID automático: DL-YYYY-NNNN
```

### Flujo 2: Avanzar estado de un caso
```
Kanban → Click en caso
  ↓
Modal de detalle del caso
  ├── Ver información completa
  ├── Asignar responsable por área
  └── → Avanzar al siguiente estado
  ↓
Estado actualizado → Caso se mueve en el Kanban
  ↓
Historial registrado automáticamente con timestamp
```

### Flujo 3: Registrar garantía/repetición
```
Cualquier caso → "Marcar como garantía"
  ↓
Modal: motivo de repetición
  ↓
Caso duplicado con isWarranty = true
  ↓
Aparece en tab "Garantías" del módulo Operativo
  ↓
Afecta métricas de productividad y dashboard
```

### Flujo 4: Facturación
```
Finanzas → Cotizaciones
  ↓
Seleccionar caso → "Generar cotización"
  ↓
Vista previa → "Aprobar cotización"
  ↓
Finanzas → Facturado
  ↓
Registrar pago / abono (COP o USD)
  ↓
Dashboard refleja nuevas métricas
```

### Flujo 5: Reporte de productividad
```
Productividad → Seleccionar período
  ↓
KPIs se actualizan en tiempo real
  ↓
Ver sub-tab: Área / Empleado / Productos / Tiempos
  ↓
"Exportar Excel" → 3 hojas descargadas
```

---

## Layout principal

```
┌─────────────────────────────────────────────────────┐
│ HEADER                                              │
│ 🦷 Natural Veneers    [fecha]  [KPIs rápidos]  [👤] │
├─────────────────────────────────────────────────────┤
│ NAV TABS (horizontal)                               │
│ [🔄 Operativo] [💰 Finanzas] [📊 Productividad]    │
│ [🗂️ Dashboard] [⚙️ Config]   [COP|USD]  [🌙]        │
├─────────────────────────────────────────────────────┤
│                                                     │
│  CONTENIDO DEL MÓDULO ACTIVO                        │
│                                                     │
│  Sub-tabs del módulo                                │
│  ─────────────────                                  │
│  Contenido (Kanban / Tabla / Gráficos / etc.)       │
│                                                     │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## Módulo: Operativo

```
Sub-tabs: [Flujo] [Casos] [Despachos] [Garantías] [Historial]

FLUJO (Kanban):
┌────────────┬────────────┬────────────┬─────────────┐
│ Recibido   │  Digital   │ Inyección  │  Cerámica   │
│            │            │            │             │
│ [DL-0001]  │ [DL-0003]  │ [DL-0005]  │ [DL-0007]  │
│ Dr. García │ Dr. López  │ Dr. Martín │ Dr. Pérez   │
│ 2 uds.     │ 4 uds.     │ 1 ud.      │ 3 uds.      │
│ ⚠️ +2 días │ 📅 mañana  │ ✅ en tiempo│ 🔴 vencido  │
└────────────┴────────────┴────────────┴─────────────┘
```

---

## Módulo: Productividad

```
Sub-tabs: [🏭 Por Área] [👤 Por Empleado] [📦 Productos] [⏱ Tiempos]
Filtro período: [Hoy] [Esta semana] [Este mes] [Todo]
                                               [⬇️ Exportar Excel]

Por Área:
┌─────────────────────────────────────────────────────┐
│ KPIs: Uds totales | Exitosas | Repetición | Top área│
├───────────────────────┬─────────────────────────────┤
│ Unidades apilado (bar)│ Tasa de éxito (bar horiz.)  │
├───────────────────────┴─────────────────────────────┤
│ Tabla: Departamento | Casos | Totales | Éxito | Rep │
└─────────────────────────────────────────────────────┘
```

---

## Módulo: Dashboard Ejecutivo

```
┌────────────────────────────────────────────────────┐
│ Filtros: [Todo] [Este mes] [Esta semana]            │
├─────────────────────────┬──────────────────────────┤
│ Top 5 Clientes          │ Top 3 Trabajadores        │
│ por unidades en lab     │ por eficiencia            │
├─────────────────────────┼──────────────────────────┤
│ Ventas vs Descuentos    │ Top 5 por Garantías       │
│ (gráfico barras/línea)  │ (clientes con más rep.)   │
├─────────────────────────┼──────────────────────────┤
│ Top 3 Productos         │ Facturación por País      │
│ más repetidos           │ COP + descuentos          │
├─────────────────────────┴──────────────────────────┤
│ Top 10 Insumos más utilizados (barra horizontal)   │
└────────────────────────────────────────────────────┘
```

---

## Estados visuales de casos

| Estado | Color | Emoji | Descripción |
|--------|-------|-------|-------------|
| Recibido | `#6366f1` (indigo) | 📋 | Nuevo en el sistema |
| Esp. Referencias | `#8b5cf6` (purple) | 🔍 | Falta información |
| Digital | `#3b82f6` (blue) | 💻 | En diseño digital |
| Impresión | `#06b6d4` (cyan) | 🖨️ | Imprimiendo |
| Inyección | `#f59e0b` (amber) | 💉 | En proceso de inyección |
| Cerámica | `#f97316` (orange) | 🎨 | En cerámica |
| QC | `#10b981` (green) | 🔬 | Control de calidad |
| Despacho | `#84cc16` (lime) | 📦 | Listo para enviar |
| Despachado | `#22c55e` (emerald) | ✅ | Enviado |
| Entregado | `#15803d` (dark green) | 🏁 | Proceso completo |

---

## Alertas y notificaciones

### Bell de notificaciones (header)
- 🔴 Casos vencidos (superaron fecha compromiso)
- 🟡 Casos próximos a vencer (≤2 días)
- 📋 Casos sin asignar responsable

### Alertas en Kanban
- Badge rojo: días de retraso
- Badge amarillo: próximo a vencer
- Sin badge: en tiempo

