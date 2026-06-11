# Component Map — Natural Veneers ERP (React Migration Roadmap)

## Árbol de componentes (v2 — React completo)

```
<AppShell>                          ← Shell principal
  <Header>                          ← Cabecera con logo, fecha, KPIs
    <KPIBadge />                    ← "9 activos · 9 retrasados"
    <NotificationBell />            ← Campana con alertas
    <CurrencyToggle />              ← COP/USD switcher
    <ThemeToggle />                 ← Dark/Light
    <UserMenu />                    ← Logout, perfil
  </Header>
  
  <MainNav>                         ← Tabs principales
    <NavTab id="operativo" />
    <NavTab id="finanzas" />
    <NavTab id="productividad" />
    <NavTab id="dashboard" />
    <NavTab id="config" />
  </MainNav>
  
  <ModuleContainer>
    {activeModule === 'operativo'     && <OperativoModule />}
    {activeModule === 'finanzas'      && <FinanzasModule />}
    {activeModule === 'productividad' && <ProductividadModule />}
    {activeModule === 'dashboard'     && <DashboardModule />}
    {activeModule === 'config'        && <ConfigModule />}
  </ModuleContainer>
</AppShell>
```

---

## Módulo: Operativo

```
<OperativoModule>
  <SubTabs tabs={['flujo','casos','despachos','garantias','historial']} />
  
  {subTab === 'flujo' && (
    <>
      <KPIRow>
        <KPICard label="Activos" value={9} color="blue" />
        <KPICard label="Retrasados" value={9} color="red" />
        <KPICard label="Hoy" value={0} color="green" />
      </KPIRow>
      <AlertBanner alerts={delayedCases} />
      <KanbanBoard>
        {STAGES.map(stage => (
          <KanbanColumn key={stage} stage={stage}>
            {casesByStage[stage].map(order => (
              <CaseCard key={order.id} order={order} onClick={openDetail} />
            ))}
          </KanbanColumn>
        ))}
      </KanbanBoard>
      <ActivityFeed events={recentHistory} />
      <DeptChart data={deptStats} />
    </>
  )}
  
  {subTab === 'casos' && <CasosTable orders={orders} />}
  {subTab === 'despachos' && <DespachosTable orders={termOrders} />}
  {subTab === 'garantias' && <GarantiasTable orders={warrantyOrders} />}
  {subTab === 'historial' && <HistorialTable orders={archivedOrders} />}
  
  <CaseDetailModal order={selectedOrder} onClose={closeModal} />
  <NewCaseModal isOpen={isNewCaseOpen} onClose={closeNewCase} />
</OperativoModule>
```

---

## Módulo: Finanzas

```
<FinanzasModule>
  <SubTabs tabs={['cotizaciones','facturado','pagos']} />
  
  {subTab === 'cotizaciones' && (
    <CotizacionesTable>
      <CotizacionRow order={order}>
        <QuoteButton />
        <InvoiceButton />
      </CotizacionRow>
    </CotizacionesTable>
  )}
  
  {subTab === 'facturado' && (
    <FacturadoTable>
      <FacturaRow order={order}>
        <PaymentButton />
        <AbonoButton />
      </FacturaRow>
    </FacturadoTable>
  )}
  
  {subTab === 'pagos' && <PagosResumen payments={allPayments} />}
  
  <PaymentModal orderId={targetId} />
  <InvoiceModal orderId={targetId} />
</FinanzasModule>
```

---

## Módulo: Productividad

```
<ProductividadModule>
  <SubTabs tabs={['area','emp','prod','times']} />
  <PeriodFilter value={period} onChange={setPeriod} />
  <ExportButton onClick={exportExcel} />
  
  {subTab === 'area' && (
    <>
      <KPIRow>{areaKPIs}</KPIRow>
      <ChartsRow>
        <StackedBarChart data={areaData} />
        <HorizontalBarChart data={rateData} />
      </ChartsRow>
      <DataTable rows={areaStats} columns={areaColumns} />
    </>
  )}
  
  {subTab === 'emp' && <EmpleadosTab stats={empStats} />}
  {subTab === 'prod' && <ProductosTab stats={prodStats} />}
  {subTab === 'times' && <TiemposTab times={caseTimes} />}
</ProductividadModule>
```

---

## Módulo: Dashboard

```
<DashboardModule>
  <PeriodFilter value={daPeriod} onChange={setDaPeriod} />
  
  <KPIGrid>
    <KPICard label="Casos analizados" />
    <KPICard label="Ventas COP" />
    <KPICard label="Ventas USD" />
    <KPICard label="Descuentos" />
    <KPICard label="Finalizados" />
    <KPICard label="Con garantía" />
  </KPIGrid>
  
  <DashboardGrid>
    <Top5Clientes data={topClients} />
    <Top3Trabajadores data={topWorkers} />
    <VentasChart data={monthlySales} />
    <GarantiasClientes data={warrantyClients} />
    <Top3ProductosRepetidos data={topRepeated} />
    <FacturacionPais data={countryBilling} />
    <Top10Insumos data={topSupplies} />
  </DashboardGrid>
</DashboardModule>
```

---

## Componentes UI reutilizables

```
src/components/ui/
├── Button.tsx          ← variants: primary | secondary | danger | ghost
├── Input.tsx           ← text | select | textarea | number
├── Modal.tsx           ← con backdrop, escape to close, focus trap
├── Badge.tsx           ← status badge con color semántico
├── KPICard.tsx         ← kcard con variantes de color
├── DataTable.tsx       ← tabla genérica con sort, filtro
├── Chart/
│   ├── BarChart.tsx    ← wraps Chart.js Bar
│   ├── LineChart.tsx   ← wraps Chart.js Line  
│   └── ChartTheme.ts  ← colores sync dark/light
├── RateBar.tsx         ← barra de progreso con color semántico
├── PeriodFilter.tsx    ← selector de período: día/semana/mes/todo
├── EmptyState.tsx      ← estado vacío con icono y mensaje
└── Spinner.tsx         ← loading indicator
```

---

## Custom Hooks

```
src/hooks/
├── useOrders.ts        ← CRUD completo de órdenes
│   returns: { orders, addOrder, updateOrder, getOrder, deleteOrder }
│
├── useAuth.ts          ← Auth state
│   returns: { user, login, logout, isAdmin }
│
├── useTheme.ts         ← Dark/light toggle
│   returns: { theme, toggleTheme }
│
├── usePeriodFilter.ts  ← Filtro de período reutilizable
│   returns: { period, filtered, setPeriod }
│
└── useExcelExport.ts   ← SheetJS wrapper
    returns: { exportToExcel }
```

---

## Zustand Stores

```typescript
// src/store/orderStore.ts
interface OrderStore {
  orders: Order[]
  counter: number
  load: () => void
  save: () => void
  addOrder: (order: Omit<Order, 'id' | 'createdAt'>) => string
  updateOrder: (id: string, updates: Partial<Order>) => void
  advanceStage: (id: string, nextStage: Stage) => void
}

// src/store/authStore.ts  
interface AuthStore {
  currentUser: User | null
  login: (username: string, password: string) => boolean
  logout: () => void
}

// src/store/uiStore.ts
interface UIStore {
  theme: 'dark' | 'light'
  currency: Currency
  mainSection: MainSection
  toggleTheme: () => void
  toggleCurrency: () => void
  setSection: (section: MainSection) => void
}
```

