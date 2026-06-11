# Technical Specification — Natural Veneers ERP

## Arquitectura actual (v1 — HTML monolítico)

```
┌─────────────────────────────────────────────┐
│           Browser (Chrome/Edge)             │
│                                             │
│  ┌───────────────────────────────────────┐  │
│  │        index.html (~230KB)            │  │
│  │                                       │  │
│  │  CSS (33KB)  │  HTML (45KB)           │  │
│  │  JS (138KB)  │  Chart.js CDN          │  │
│  │              │  SheetJS CDN           │  │
│  │                                       │  │
│  │  localStorage ──→ JSON persistence    │  │
│  └───────────────────────────────────────┘  │
│                                             │
│  Served by: Vercel (static file /app.html)  │
└─────────────────────────────────────────────┘
```

## Arquitectura Next.js (v1 — actual deployment)

```
GitHub (natural-veneers-erp)
    │
    ▼ Auto-deploy
Vercel Edge Network
    │
    ▼
Next.js 14 App Router
    │
    ├── / (page.tsx) ──→ redirect → /app.html
    ├── /app.html ────→ ERP completo (HTML estático en /public)
    └── /api/health ──→ { status: 'ok' }
```

## Arquitectura Next.js (v2 — React components, roadmap)

```
Next.js 14 App Router
├── app/
│   ├── (auth)/login/       ← Auth page
│   ├── dashboard/          ← App shell
│   │   ├── operativo/      ← Módulo operativo
│   │   ├── finanzas/       ← Módulo finanzas
│   │   ├── productividad/  ← Módulo productividad
│   │   ├── stats/          ← Dashboard ejecutivo
│   │   └── config/         ← Configuración
│   └── api/
│       ├── health/         ← Health check
│       └── export/         ← Excel export endpoint
│
├── Zustand Store (client-side)
│   ├── useOrderStore       ← CRUD de órdenes
│   ├── useAuthStore        ← Auth state
│   └── useUIStore          ← Theme, sidebar state
│
└── localStorage adapter    ← Persistence layer
    (swappable → Supabase)
```

## Decisiones técnicas

### ¿Por qué Next.js + static HTML?
- **Velocidad de deployment**: ERP funciona HOY en Vercel sin reescritura
- **Risk-free**: Zero posibilidad de romper funcionalidad
- **Progressive**: Se puede migrar módulo a módulo a React

### ¿Por qué localStorage?
- No requiere backend ni base de datos
- Los datos son del laboratorio, no necesitan nube
- Backup fácil: exportar JSON
- Migración futura a Supabase es 1 archivo de cambio

### ¿Por qué Zustand?
- Más simple que Redux para este caso de uso
- Compatible con localStorage middleware
- Sin boilerplate excesivo

### Bundling y performance
- Chart.js: importado desde CDN (no bundleado, cache del browser)
- SheetJS: importado desde CDN (solo carga cuando se hace export)
- CSS: custom properties (no clases de Tailwind en el HTML legado)
- Fonts: Google Fonts con `display=swap`

---

## Seguridad

### Actual
- Auth local (localStorage) — apropiado para tool interna
- No hay datos sensibles en la URL
- CORS no relevante (single-origin)

### En producción futura
- NextAuth.js con JWT
- Row-Level Security en Supabase
- HTTPS enforced por Vercel
- Variables de entorno server-side para secrets

---

## Performance targets

| Métrica | Target | Actual |
|---------|--------|--------|
| LCP | < 2.5s | ~0.5s (local HTML) |
| FID | < 100ms | < 50ms |
| CLS | < 0.1 | ~0 |
| Bundle size | < 500KB | ~230KB |
| Time to interactive | < 3s | ~1s |

---

## Testing strategy (roadmap)

```
Unit tests → Jest + React Testing Library
  - Funciones de cálculo (totales, tasas, filtros)
  - Componentes de UI (render + interacciones)

E2E → Playwright
  - Flujo completo: login → crear caso → despacho
  - Módulo de finanzas: cotización → factura → pago
  - Export a Excel

Snapshot tests → Storybook
  - Todos los componentes de UI
  - Variantes dark/light
```

---

## Deployment pipeline

```
Push a main
    ↓
GitHub Actions (lint + type-check)
    ↓
Vercel Build (next build)
    ↓
Preview deployment (PR)
    ↓
Production deployment (merge)
    ↓
URL: https://natural-veneers-erp.vercel.app
```

---

## Variables de entorno

| Variable | Requerida | Descripción |
|---------|-----------|-------------|
| `NEXT_PUBLIC_APP_NAME` | No | Nombre de la app |
| `NEXT_PUBLIC_APP_VERSION` | No | Versión |
| `DATABASE_URL` | Futuro | PostgreSQL/Supabase |
| `NEXTAUTH_SECRET` | Futuro | JWT secret |
| `NEXTAUTH_URL` | Futuro | URL de producción |

