# Deployment Guide — Natural Veneers ERP

## Deploy en Vercel (< 5 minutos)

### Paso 1: Conectar repositorio

1. Ir a [vercel.com/new](https://vercel.com/new)
2. Seleccionar **"Import Git Repository"**
3. Seleccionar `natural-veneers-erp`
4. Framework: **Next.js** (se detecta automáticamente)

### Paso 2: Configurar build

Vercel detecta automáticamente la configuración de `vercel.json`:
```json
{
  "framework": "nextjs",
  "buildCommand": "next build",
  "outputDirectory": ".next",
  "regions": ["gru1"]
}
```

> **Nota:** `gru1` = São Paulo (más cercano a Colombia)

### Paso 3: Variables de entorno (opcionales)

En Vercel Dashboard → Settings → Environment Variables:
```
NEXT_PUBLIC_APP_NAME = "Natural Veneers ERP"
NEXT_PUBLIC_APP_VERSION = "1.0.0"
```

### Paso 4: Deploy

Click **"Deploy"** → Esperar ~60 segundos → ¡Listo!

URL de producción: `https://natural-veneers-erp.vercel.app`

---

## Actualizaciones automáticas

Cada `git push` a `main` dispara un deploy automático en Vercel:

```bash
# Hacer cambios locales
git add .
git commit -m "feat: descripción del cambio"
git push origin main

# Vercel detecta el push y despliega en ~60 segundos
```

---

## Deployment local

```bash
# Clonar el repositorio
git clone https://github.com/anuartalaigua0403-gif/natural-veneers-erp.git
cd natural-veneers-erp

# Instalar dependencias
npm install

# Desarrollo local
npm run dev
# → http://localhost:3000

# Build de producción (verificar antes de push)
npm run build
npm start
```

---

## Estructura de archivos para Vercel

```
natural-veneers-erp/
├── .next/              ← Generado por `next build` (NO commitear)
├── public/
│   └── app.html        ← ERP completo (HTML estático)
├── src/
│   └── app/
│       ├── layout.tsx  ← Root layout
│       ├── page.tsx    ← Redirect → /app.html
│       └── ...
├── next.config.js      ← Configuración de Next.js
├── vercel.json         ← Configuración de Vercel
├── package.json        ← Dependencias y scripts
└── tsconfig.json       ← TypeScript config
```

---

## Dominio personalizado (opcional)

En Vercel Dashboard → Settings → Domains:
1. Agregar `erp.naturalveneers.com` (o el dominio que tengas)
2. Configurar DNS en tu registrador:
   ```
   CNAME  erp  cname.vercel-dns.com
   ```
3. Vercel provisiona SSL automáticamente

---

## Monitoreo

### Health check endpoint
```
GET https://natural-veneers-erp.vercel.app/api/health
→ { "status": "ok", "timestamp": "2024-...", "version": "1.0.0" }
```

### Vercel Analytics (opcional)
1. Vercel Dashboard → Analytics → Enable
2. Agregar al `layout.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react'
// En el body: <Analytics />
```

---

## Backup de datos

Los datos están en localStorage del browser. Para hacer backup:

**Exportar (manual):**
```javascript
// En la consola del browser (F12)
const data = JSON.parse(localStorage.getItem('nv_orders') || '[]')
const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'})
const url = URL.createObjectURL(blob)
const a = document.createElement('a')
a.href = url
a.download = `nv_backup_${new Date().toISOString().slice(0,10)}.json`
a.click()
```

**Importar:**
```javascript
// Pegar el JSON y ejecutar:
const data = /* pegar JSON aquí */
localStorage.setItem('nv_orders', JSON.stringify(data))
location.reload()
```

---

## Troubleshooting

| Problema | Causa | Solución |
|---------|-------|---------|
| Página en blanco | JS error en app.html | F12 → Console → ver error |
| Datos perdidos | localStorage borrado | Restaurar desde backup JSON |
| Build falla | Error TypeScript | `npm run type-check` local |
| 404 en Vercel | Deploy no completado | Esperar 2-3 min y refrescar |

