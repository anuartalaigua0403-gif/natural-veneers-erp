# 🦷 Natural Veneers ERP

> Sistema de gestión premium para laboratorio dental — construido con Next.js 14

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://vercel.com)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)

## 🚀 Deploy rápido

```bash
git clone https://github.com/anuartalaigua0403-gif/natural-veneers-erp.git
cd natural-veneers-erp
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## 📦 Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 14 (App Router) |
| Lenguaje | TypeScript 5 |
| Estilos | Tailwind CSS + CSS Custom Properties |
| Estado | Zustand + localStorage |
| Gráficos | Chart.js 4 |
| Excel | SheetJS (xlsx) |
| UI Components | Radix UI + custom |
| Deploy | Vercel |

## 🏗️ Módulos del ERP

| Módulo | Descripción |
|--------|-------------|
| 🔄 **Operativo** | Flujo Kanban de casos, despachos, garantías, historial |
| 💰 **Finanzas** | Cotizaciones, facturación COP/USD, pagos, abonos |
| 📊 **Productividad** | Análisis por área, empleado, producto y tiempos |
| 🗂️ **Dashboard** | KPIs, top clientes, insumos, facturación por país |
| ⚙️ **Configuración** | Catálogo de precios, usuarios, roles |

## 📁 Estructura del proyecto

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Layout raíz con metadata
│   ├── page.tsx            # Redirect → ERP app
│   ├── not-found.tsx       # Página 404
│   └── api/health/         # Health check endpoint
├── components/
│   ├── ui/                 # Componentes base (Button, Input, etc.)
│   ├── layout/             # Header, Sidebar, Shell
│   └── modules/            # Módulos del ERP por feature
│       ├── operativo/
│       ├── finanzas/
│       ├── productividad/
│       ├── dashboard/
│       └── config/
├── hooks/                  # Custom React hooks
├── lib/                    # Utilidades, helpers
├── store/                  # Zustand stores
└── types/                  # TypeScript types
public/
└── app.html               # ERP completo (HTML monolítico)
docs/                       # Documentación técnica
```

## 🔐 Usuarios por defecto

| Usuario | Contraseña | Rol |
|---------|-----------|-----|
| Sheyla | nv2024 | Admin |
| Mabridis | nv2024 | Admin |
| Yeiner | nv2024 | Asistente |
| Cesar | nv2024 | Asistente |

## 🌐 Vercel Deployment

1. Conectar repositorio en [vercel.com/new](https://vercel.com/new)
2. Framework: **Next.js** (auto-detectado)
3. Build command: `next build` (por defecto)
4. Variables de entorno: copiar `.env.example` → `.env.local`
5. Deploy → ¡listo!

## 📄 Documentación

- [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) — Tokens, colores, tipografía
- [`docs/UX_UI_SPEC.md`](docs/UX_UI_SPEC.md) — Wireframes y flujos de usuario
- [`docs/TECH_SPEC.md`](docs/TECH_SPEC.md) — Arquitectura y decisiones técnicas
- [`docs/DATA_MODEL.md`](docs/DATA_MODEL.md) — Modelo de datos y tipos
- [`docs/COMPONENT_MAP.md`](docs/COMPONENT_MAP.md) — Mapa de componentes React
- [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) — Guía de deployment a Vercel
