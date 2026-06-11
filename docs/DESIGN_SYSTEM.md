# Design System — Natural Veneers ERP

## Principios de Diseño

1. **Premium Dark-First** — interfaz oscura por defecto, reducción de fatiga visual
2. **Densidad informacional alta** — lab de producción necesita ver mucho sin scrollear
3. **Semántica de color** — verde éxito, rojo error, amarillo advertencia, consistente en todo
4. **Micro-interacciones** — transiciones sutiles (150ms), sin animaciones que distraigan

---

## Color Tokens

### Dark Theme (por defecto)
| Token | Hex | Uso |
|-------|-----|-----|
| `--bg` | `#080a10` | Fondo principal |
| `--sur` | `#0d1117` | Superficie de cards/panels |
| `--sur2` | `#111620` | Superficie secundaria, inputs |
| `--sur3` | `#161c28` | Hover states |
| `--sur4` | `#1c2334` | Bordes activos, selección |
| `--bdr` | `#1e2a3a` | Bordes |
| `--tx` | `#e4e8f0` | Texto principal |
| `--tx2` | `#8892a4` | Texto secundario, labels |
| `--tx3` | `#4a5568` | Texto terciario, placeholders |
| `--accent` | `#6366f1` | Color de marca (Indigo) |

### Light Theme
| Token | Hex | Uso |
|-------|-----|-----|
| `--bg` | `#f0f2f7` | Fondo principal |
| `--sur` | `#ffffff` | Cards |
| `--sur2` | `#f8f9fc` | Superficie secundaria |
| `--bdr` | `#d1dae8` | Bordes |
| `--tx` | `#0f172a` | Texto principal |

### Semánticos
| Token | Hex | Uso |
|-------|-----|-----|
| `--success` | `#10b981` | Unidades exitosas, estados OK |
| `--warning` | `#f59e0b` | Advertencias, garantías |
| `--error` | `#ef4444` | Errores, repeticiones |
| `--info` | `#3b82f6` | Información, Admin dept |

### Departamentos
| Dept | Color | Uso |
|------|-------|-----|
| Admin | `#3b82f6` | Azul |
| Digital | `#8b5cf6` | Violeta |
| Inyección | `#f59e0b` | Ámbar |
| Cerámica | `#f97316` | Naranja |
| QC | `#10b981` | Verde |

---

## Tipografía

**Fuente principal:** Inter (Google Fonts)
**Fuente monospace:** JetBrains Mono (IDs de casos, código)

| Scale | Size | Weight | Uso |
|-------|------|--------|-----|
| xs | 10px | 600 | Labels de tabla, badges |
| sm | 11px | 400/600 | Body tabla, UI labels |
| base | 13px | 400 | Body principal |
| md | 14px | 600 | Sub-títulos, nav items |
| lg | 16px | 700 | Valores de KPI pequeños |
| xl | 20–28px | 800 | KPI values principales |
| 2xl | 32–40px | 800 | Números grandes de estadísticas |

---

## Espaciado

Sistema base 4px:
- `4px` — gap interno mínimo
- `8px` — padding icon buttons
- `12px` — padding cards compactos
- `14px` — padding panels
- `16px` — padding standard
- `20px` — padding secciones
- `24px` — separación entre bloques

---

## Componentes base

### Panel / Card
```css
background: var(--sur);
border: 1px solid var(--bdr);
border-radius: 12px;
box-shadow: 0 2px 12px rgba(0,0,0,0.3);
```

### KPI Card (`.kcard`)
- Variantes de color izquierdo: `.bl` (blue), `.gn` (green), `.rd` (red), `.pu` (purple), `.go` (gold)
- Estructura: label → valor grande → sub-texto

### Botones
| Clase | Estilo | Uso |
|-------|--------|-----|
| `.btn-g` | Gradient indigo-purple | Acción principal |
| `.btn` | Surface + border | Acción secundaria |
| `.btn-sm` | font-size 11px | Acciones compactas |

### Badge / Estado
```css
.sbadge { padding: 2px 8px; border-radius: 20px; font-size: 10px; font-weight: 700; }
```

### Tablas
- Header: `var(--sur2)`, uppercase, 10px, tracking-wider
- Rows: hover → `var(--sur2)`, border-bottom `var(--bdr)`
- Monospace para IDs de casos

---

## Gráficos (Chart.js)

### Configuración global
```js
Chart.defaults.color = '#8b92a5'        // dark
Chart.defaults.color = '#4a5068'        // light
Chart.defaults.font.family = 'Inter'
Chart.defaults.plugins.legend.labels.font.size = 11
```

### Paleta de gráficos
- Exitosas: `#10b981bb` (verde semi-transparente)
- Repetidas: `#ef4444bb` (rojo)
- Accent: `#6366f1bb` (indigo)
- Grids: `#1e2a3a` (dark) / `#e2e8f0` (light)

---

## Responsive

El ERP está diseñado para **desktop (≥1280px)**. En producción futura:
- Breakpoint crítico: `min-width: 1024px`
- Kanban scrollable horizontal en móvil
- Header colapsable en tablet

---

## Iconografía

Sistema de emojis Unicode para iconos funcionales (sin dependencia de icon library):
- Estados de casos: 📋 🔄 🖨️ 💉 🎨 🔍 📦
- Módulos: 🔄 💰 📊 🗂️ ⚙️
- KPIs: ✅ ❌ ⚠️ 🏆 📈

