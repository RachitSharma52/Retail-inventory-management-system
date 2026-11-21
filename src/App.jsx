import { useMemo, useState } from 'react'
import { NavLink, Routes, Route, useLocation } from 'react-router-dom'
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement,
  ArcElement, Tooltip, Legend, Filler
} from 'chart.js'
import {
  LayoutDashboard, Boxes, Warehouse, ShoppingCart, Truck, ChartNoAxesCombined,
  Settings, Search, Bell, ChevronDown, Menu, X, Plus, ArrowUpRight, ArrowDownRight,
  MoreHorizontal, Download, SlidersHorizontal, Package, AlertTriangle, CircleDollarSign,
  ClipboardList, Clock3, CheckCircle2, XCircle, MapPin, Phone, Mail, CalendarDays,
  ArrowRight, Filter, Eye, Pencil, Trash2, RefreshCw, Tags, ArrowLeftRight, Users, UserRound, Boxes as BoxesIcon
} from 'lucide-react'
import { initialProducts, warehouses, initialOrders, suppliers, activities } from './data'

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Tooltip, Legend, Filler)

const money = n => '₹' + Number(n).toLocaleString('en-IN')
const nav = [
  { label: 'Overview', path: '/', icon: LayoutDashboard },
  { label: 'Inventory', path: '/inventory', icon: Boxes },
  { label: 'Categories', path: '/categories', icon: Tags },
  { label: 'Warehouses', path: '/warehouses', icon: Warehouse },
  { label: 'Stock Transfers', path: '/transfers', icon: ArrowLeftRight },
  { label: 'Purchase Orders', path: '/purchase-orders', icon: Truck },
  { label: 'Sales Orders', path: '/sales-orders', icon: ShoppingCart },
  { label: 'Suppliers', path: '/suppliers', icon: Truck },
  { label: 'Customers', path: '/customers', icon: Users },
  { label: 'Reports', path: '/reports', icon: ChartNoAxesCombined }
]
const titles = { '/': 'Overview', '/inventory': 'Inventory', '/categories': 'Categories', '/warehouses': 'Warehouses', '/transfers': 'Stock Transfers', '/purchase-orders': 'Purchase Orders', '/sales-orders': 'Sales Orders', '/suppliers': 'Suppliers', '/customers': 'Customers', '/reports': 'Reports' }

function Status({ value }) {
  const map = {
    'In stock': 'success', 'Operational': 'success', 'Active': 'success', 'Delivered': 'success', 'Shipped': 'info',
    'Low stock': 'warning', 'Near capacity': 'warning', 'Processing': 'info', 'Pending': 'warning',
    'Out of stock': 'danger', 'Cancelled': 'danger', 'On hold': 'muted'
  }
  return <span className={`status ${map[value] || 'muted'}`}><i />{value}</span>
}

function Sidebar({ open, onClose }) {
  return <>
    {open && <div className="mobile-shade" onClick={onClose} />}
    <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
      <div className="brand">
        <div className="brand-mark"><Boxes size={21} /></div>
        <div><b>RETAIL</b><span>INVENTORY SUITE</span></div>
        <button className="icon-btn sidebar-close" onClick={onClose}><X size={18}/></button>
      </div>
      <div className="workspace"><div className="workspace-avatar">N</div><div><b>Northstar Retail</b><span>Enterprise workspace</span></div><ChevronDown size={15}/></div>
      <div className="nav-label">WORKSPACE</div>
      <nav>{nav.map(item => {
        const Icon = item.icon
        return <NavLink key={item.path} to={item.path} end={item.path === '/'} onClick={onClose} className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}><Icon size={18}/><span>{item.label}</span>{item.label === 'Inventory' && <em>8</em>}</NavLink>
      })}</nav>
      <div className="sidebar-bottom">
        <div className="help-card"><div className="help-icon"><ClipboardList size={17}/></div><b>Need a hand?</b><p>Visit the resource centre for guides and support.</p><button onClick={() => alert('Resource centre opened.')}>Open resource centre <ArrowRight size={14}/></button></div>
        <NavLink to="/settings" className="nav-item" onClick={onClose}><Settings size={18}/><span>Settings</span></NavLink>
        <div className="profile"><div className="avatar">VR</div><div><b>Vishal Raghav</b><span>Administrator</span></div><MoreHorizontal size={19}/></div>
      </div>
    </aside>
  </>
}

function Header({ title, onMenu }) {
  const [search, setSearch] = useState('')
  return <header className="topbar">
    <div className="top-left"><button className="icon-btn mobile-menu" onClick={onMenu}><Menu size={20}/></button><div className="crumb">Workspace <span>/</span> <b>{title}</b></div></div>
    <div className="top-actions">
      <div className="global-search"><Search size={16}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search anything..." /><kbd>⌘ K</kbd></div>
      <button className="icon-btn notification" onClick={()=>alert('You are all caught up.')}><Bell size={19}/><i/></button>
      <div className="top-user"><div className="avatar">VR</div><ChevronDown size={15}/></div>
    </div>
  </header>
}

function PageHeading({ eyebrow, title, description, action, onAction }) {
  return <div className="page-heading"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div>{action && <button className="primary-btn" onClick={onAction}><Plus size={17}/>{action}</button>}</div>
}

function Metric({ label, value, change, direction='up', icon: Icon, tint, foot }) {
  return <div className="metric-card"><div className="metric-top"><span>{label}</span><div className={`metric-icon ${tint}`}><Icon size={18}/></div></div><div className="metric-value">{value}</div><div className="metric-foot"><span className={`trend ${direction}`}>{direction === 'up' ? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>} {change}</span><span>{foot}</span></div></div>
}

function PanelTitle({ title, subtitle, action }) {
  return <div className="panel-title"><div><h3>{title}</h3>{subtitle && <p>{subtitle}</p>}</div>{action}</div>
}

function Overview({ products, orders, onCreateOrder }) {
  const stockValue = products.reduce((s,p)=>s+p.stock*p.price,0)
  const low = products.filter(p=>p.stock>0 && p.stock<=p.reorder).length
  const salesData = { labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], datasets:[{label:'Sales',data:[28,42,35,58,47,72,64],backgroundColor:'#5478f5',borderRadius:6,barThickness:18}] }
  const lineData = { labels:['Jun','Jul','Aug','Sep','Oct','Nov'], datasets:[{label:'Orders',data:[420,510,470,630,590,780],borderColor:'#5478f5',backgroundColor:'rgba(84,120,245,.10)',fill:true,tension:.38,pointRadius:3,pointBackgroundColor:'#fff',pointBorderWidth:2}] }
  const doughnut = { labels:['Electronics','Packaging','Storage','Safety','Equipment'], datasets:[{data:[32,27,18,13,10],backgroundColor:['#5478f5','#29b5a2','#f4b44e','#9b83ed','#e28a9c'],borderWidth:0,hoverOffset:5}] }
  return <div className="page-content">
    <PageHeading eyebrow="SATURDAY, 21 NOVEMBER 2026" title="Good morning, Vishal" description="Here's what's happening across your inventory operations today." action="Create order" onAction={onCreateOrder}/>
    <div className="metrics-grid">
      <Metric label="Total inventory value" value={money(stockValue)} change="12.8%" icon={CircleDollarSign} tint="blue" foot="vs. last month"/>
      <Metric label="Total products" value={products.length.toLocaleString('en-IN')} change="8.2%" icon={Package} tint="purple" foot="vs. last month"/>
      <Metric label="Low stock items" value={low.toString().padStart(2,'0')} change="3 items" direction="down" icon={AlertTriangle} tint="amber" foot="need attention"/>
      <Metric label="Open orders" value={orders.filter(o=>['Processing','Pending'].includes(o.status)).length.toString().padStart(2,'0')} change="6.4%" icon={ClipboardList} tint="green" foot="vs. last week"/>
    </div>
    <div className="dashboard-grid">
      <section className="panel sales-panel"><PanelTitle title="Sales overview" subtitle="Revenue performance for this week" action={<select className="select-sm" defaultValue="This week"><option>This week</option><option>This month</option><option>This year</option></select>}/><div className="chart-summary"><b>₹4,82,650</b><span className="trend up"><ArrowUpRight size={14}/> 14.6%</span><small>vs. previous period</small></div><div className="chart-wrap"><Bar data={salesData} options={{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{backgroundColor:'#101828',padding:10,displayColors:false}},scales:{x:{grid:{display:false},border:{display:false},ticks:{color:'#98a2b3',font:{family:'DM Sans'}}},y:{grid:{color:'#eef1f6'},border:{display:false},ticks:{color:'#98a2b3',font:{family:'DM Sans'},callback:v=>'₹'+v+'k'}}}}}/></div></section>
      <section className="panel inventory-panel"><PanelTitle title="Inventory distribution" subtitle="Product categories by volume"/><div className="donut-wrap"><Doughnut data={doughnut} options={{cutout:'72%',plugins:{legend:{display:false},tooltip:{backgroundColor:'#101828',padding:10}}}}/><div className="donut-center"><b>{products.length}</b><span>Products</span></div></div><div className="legend-list">{doughnut.labels.map((l,i)=><div key={l}><span className="legend-dot" style={{background:doughnut.datasets[0].backgroundColor[i]}}/><span>{l}</span><b>{doughnut.datasets[0].data[i]}%</b></div>)}</div></section>
    </div>
    <div className="dashboard-grid lower-grid">
      <section className="panel trend-panel"><PanelTitle title="Order trends" subtitle="Order volume over the last 6 months" action={<button className="text-btn" onClick={()=>location.href='/reports'}>View report <ArrowRight size={14}/></button>}/><div className="chart-wrap line-chart"><Line data={lineData} options={{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{display:false},border:{display:false},ticks:{color:'#98a2b3'}},y:{grid:{color:'#eef1f6'},border:{display:false},ticks:{color:'#98a2b3'}}}}}/></div></section>
      <section className="panel activity-panel"><PanelTitle title="Recent activity" subtitle="Latest updates from your workspace" action={<button className="icon-btn"><MoreHorizontal size={18}/></button>}/><div className="activity-list">{activities.map((a,i)=><div className="activity-row" key={i}><div className={`activity-dot ${a.tone}`}></div><div className="activity-copy"><b>{a.title}</b><span>{a.detail}</span></div><time>{a.time}</time></div>)}</div></section>
    </div>
    <section className="panel table-panel"><PanelTitle title="Products to watch" subtitle="Items that are running low or need replenishment" action={<a className="text-btn" href="/inventory">View inventory <ArrowRight size={14}/></a>}/><ProductTable products={products.filter(p=>p.stock<=p.reorder).slice(0,4)}/></section>
  </div>
}

function ProductTable({ products, onEdit, onDelete }) {
  return <div className="table-scroll"><table><thead><tr><th>PRODUCT</th><th>SKU</th><th>CATEGORY</th><th>WAREHOUSE</th><th>AVAILABLE</th><th>UNIT PRICE</th><th>STATUS</th><th></th></tr></thead><tbody>{products.map(p=><tr key={p.id}><td><div className="product-cell"><div className="product-thumb"><Package size={17}/></div><b>{p.name}</b></div></td><td className="mono">{p.sku}</td><td>{p.category}</td><td>{p.warehouse}</td><td><b>{p.stock}</b> <span className="subtle">units</span></td><td>{money(p.price)}</td><td><Status value={p.stock===0?'Out of stock':p.stock<=p.reorder?'Low stock':'In stock'}/></td><td><button className="icon-btn tiny" onClick={()=>onEdit?.(p)}><MoreHorizontal size={17}/></button></td></tr>)}</tbody></table>{products.length===0&&<div className="empty-state">No products match your search.</div>}</div>
}

function Inventory({ products, setProducts }) {
  const [query,setQuery]=useState(''), [filter,setFilter]=useState('All'), [modal,setModal]=useState(false), [editing,setEditing]=useState(null)
  const shown=useMemo(()=>products.filter(p=>(`${p.name} ${p.sku} ${p.category}`.toLowerCase().includes(query.toLowerCase()))&&(filter==='All'||(filter==='Low stock'?p.stock>0&&p.stock<=p.reorder:filter==='Out of stock'?p.stock===0:p.stock>p.reorder))),[products,query,filter])
  const openEdit=p=>{setEditing(p);setModal(true)}
  const save=e=>{e.preventDefault();const f=new FormData(e.target);const item={id:editing?.id||`SKU-${Math.floor(1100+Math.random()*800)}`,name:f.get('name'),sku:f.get('sku'),category:f.get('category'),warehouse:f.get('warehouse'),stock:Number(f.get('stock')),reorder:Number(f.get('reorder')),price:Number(f.get('price'))};setProducts(prev=>editing?prev.map(p=>p.id===editing.id?item:p):[item,...prev]);setModal(false)}
  return <div className="page-content"><PageHeading eyebrow="PRODUCT CATALOGUE" title="Inventory" description="Track stock levels, manage products and keep your catalogue up to date." action="Add product" onAction={()=>{setEditing(null);setModal(true)}}/>
    <div className="metrics-grid compact"><Metric label="Total products" value={products.length} change="8.2%" icon={Package} tint="blue" foot="vs. last month"/><Metric label="In stock" value={products.filter(p=>p.stock>p.reorder).length} change="5.1%" icon={CheckCircle2} tint="green" foot="healthy stock"/><Metric label="Low stock" value={products.filter(p=>p.stock>0&&p.stock<=p.reorder).length} change="Needs review" direction="down" icon={AlertTriangle} tint="amber" foot="reorder soon"/><Metric label="Out of stock" value={products.filter(p=>p.stock===0).length} change="Action required" direction="down" icon={XCircle} tint="red" foot="unavailable items"/></div>
    <section className="panel table-panel"><div className="toolbar"><div className="search-field"><Search size={16}/><input placeholder="Search products or SKU..." value={query} onChange={e=>setQuery(e.target.value)}/></div><div className="toolbar-right"><select className="select-sm" value={filter} onChange={e=>setFilter(e.target.value)}><option>All</option><option>In stock</option><option>Low stock</option><option>Out of stock</option></select><button className="outline-btn" onClick={()=>alert('Inventory export is ready.')}><Download size={15}/> Export</button></div></div><ProductTable products={shown} onEdit={openEdit}/><div className="table-footer">Showing <b>{shown.length}</b> of <b>{products.length}</b> products <span>Updated just now</span></div></section>
    {modal&&<div className="modal-backdrop" onClick={()=>setModal(false)}><form className="modal" onClick={e=>e.stopPropagation()} onSubmit={save}><div className="modal-head"><div><h2>{editing?'Edit product':'Add a product'}</h2><p>Enter the product details below.</p></div><button type="button" className="icon-btn" onClick={()=>setModal(false)}><X size={19}/></button></div><div className="form-grid"><label className="wide">Product name<input name="name" required defaultValue={editing?.name}/></label><label>SKU<input name="sku" required defaultValue={editing?.sku||''} placeholder="e.g. SKU-1056"/></label><label>Category<select name="category" defaultValue={editing?.category||'Electronics'}><option>Electronics</option><option>Packaging</option><option>Storage</option><option>Safety</option><option>Equipment</option></select></label><label>Warehouse<select name="warehouse" defaultValue={editing?.warehouse||'North Hub'}>{warehouses.map(w=><option>{w.name}</option>)}</select></label><label>Available units<input name="stock" type="number" min="0" required defaultValue={editing?.stock??0}/></label><label>Reorder level<input name="reorder" type="number" min="0" required defaultValue={editing?.reorder??10}/></label><label>Unit price (₹)<input name="price" type="number" min="0" required defaultValue={editing?.price??0}/></label></div><div className="modal-actions"><button type="button" className="outline-btn" onClick={()=>setModal(false)}>Cancel</button><button className="primary-btn">{editing?'Save changes':'Add product'}</button></div></form></div>}
  </div>
}

function Warehouses() {
  return <div className="page-content"><PageHeading eyebrow="LOCATIONS & CAPACITY" title="Warehouses" description="Monitor storage locations, capacity utilisation and warehouse operations." action="Add warehouse" onAction={()=>alert('Warehouse creation form opened.')}/><div className="warehouse-summary"><div className="warehouse-summary-card"><span>Active locations</span><b>03</b><small><span className="green-dot"/> All locations operational</small></div><div className="warehouse-summary-card"><span>Total storage capacity</span><b>12,500 <small>units</small></b><small>Across all locations</small></div><div className="warehouse-summary-card"><span>Average utilisation</span><b>79%</b><small>+4.2% from last month</small></div></div><div className="warehouse-grid">{warehouses.map((w,i)=><div className="panel warehouse-card" key={w.code}><div className="warehouse-card-top"><div className="warehouse-icon"><Warehouse size={20}/></div><button className="icon-btn"><MoreHorizontal size={18}/></button></div><div className="warehouse-code">{w.code}</div><h3>{w.name}</h3><div className="warehouse-location"><MapPin size={14}/>{w.city}, India</div><div className="warehouse-stats"><div><span>Stored items</span><b>{w.items.toLocaleString('en-IN')}</b></div><div><span>Capacity used</span><b>{w.capacity}%</b></div></div><div className="progress-track"><div style={{width:`${w.capacity}%`}} className={w.capacity>85?'progress-warn':''}/></div><div className="warehouse-bottom"><div className="manager"><div className="mini-avatar">{w.manager.split(' ').map(x=>x[0]).join('')}</div><span>{w.manager}</span></div><Status value={w.status}/></div></div>)}</div><section className="panel table-panel"><PanelTitle title="Warehouse activity" subtitle="Recent stock movement across locations"/><div className="table-scroll"><table><thead><tr><th>REFERENCE</th><th>WAREHOUSE</th><th>ACTIVITY</th><th>ITEMS</th><th>DATE</th><th>STATUS</th></tr></thead><tbody><tr><td className="mono">MOV-8204</td><td>North Hub</td><td>Stock received</td><td>120 units</td><td>21 Nov 2026</td><td><Status value="Delivered"/></td></tr><tr><td className="mono">MOV-8203</td><td>Central Depot</td><td>Inter-warehouse transfer</td><td>48 units</td><td>20 Nov 2026</td><td><Status value="Processing"/></td></tr><tr><td className="mono">MOV-8202</td><td>West Warehouse</td><td>Stock dispatched</td><td>32 units</td><td>20 Nov 2026</td><td><Status value="Shipped"/></td></tr></tbody></table></div></section></div>
}

function Orders({orders,setOrders}) {
  const [tab,setTab]=useState('All'),[query,setQuery]=useState('')
  const shown=orders.filter(o=>(tab==='All'||o.type===tab)&&`${o.id} ${o.customer}`.toLowerCase().includes(query.toLowerCase()))
  const cycle=id=>setOrders(prev=>prev.map(o=>o.id===id?{...o,status:o.status==='Processing'?'Shipped':o.status==='Pending'?'Processing':o.status}:o))
  return <div className="page-content"><PageHeading eyebrow="ORDER MANAGEMENT" title="Orders" description="Manage sales and purchase orders from one central workspace." action="Create order" onAction={()=>setOrders(p=>[{id:`ORD-${2482+p.length}`,customer:'New Customer Account',date:'21 Nov 2026',items:2,amount:15400,status:'Processing',type:'Sales'},...p])}/><div className="metrics-grid compact"><Metric label="Total orders" value={orders.length} change="10.4%" icon={ClipboardList} tint="blue" foot="this month"/><Metric label="Processing" value={orders.filter(o=>o.status==='Processing').length} change="In progress" icon={Clock3} tint="amber" foot="sales orders"/><Metric label="Shipped" value={orders.filter(o=>o.status==='Shipped').length} change="6.8%" icon={Truck} tint="green" foot="vs. last month"/><Metric label="Order value" value={money(orders.reduce((s,o)=>s+o.amount,0))} change="9.2%" icon={CircleDollarSign} tint="purple" foot="combined value"/></div><section className="panel table-panel"><div className="toolbar"><div className="tabs">{['All','Sales','Purchase'].map(t=><button className={tab===t?'tab-active':''} onClick={()=>setTab(t)} key={t}>{t}</button>)}</div><div className="toolbar-right"><div className="search-field"><Search size={15}/><input placeholder="Search orders..." value={query} onChange={e=>setQuery(e.target.value)}/></div><button className="outline-btn" onClick={()=>alert('Filters opened.')}><Filter size={15}/> Filter</button></div></div><div className="table-scroll"><table><thead><tr><th>ORDER ID</th><th>CUSTOMER / SUPPLIER</th><th>DATE</th><th>ITEMS</th><th>ORDER VALUE</th><th>TYPE</th><th>STATUS</th><th>ACTION</th></tr></thead><tbody>{shown.map(o=><tr key={o.id}><td className="mono">{o.id}</td><td><b className="normal-weight">{o.customer}</b></td><td>{o.date}</td><td>{o.items}</td><td><b>{money(o.amount)}</b></td><td><span className={`type-pill ${o.type.toLowerCase()}`}>{o.type}</span></td><td><Status value={o.status}/></td><td><button className="text-btn" onClick={()=>cycle(o.id)}>Update <ArrowRight size={13}/></button></td></tr>)}</tbody></table>{shown.length===0&&<div className="empty-state">No orders found.</div>}</div><div className="table-footer">Showing <b>{shown.length}</b> of <b>{orders.length}</b> orders <span>Updated just now</span></div></section></div>
}

function Suppliers() {
  return <div className="page-content"><PageHeading eyebrow="PARTNER DIRECTORY" title="Suppliers" description="Manage supplier relationships, contact details and product coverage." action="Add supplier" onAction={()=>alert('Supplier form opened.')}/><div className="metrics-grid compact"><Metric label="Total suppliers" value="24" change="2 new" icon={Truck} tint="blue" foot="this quarter"/><Metric label="Active suppliers" value="21" change="87.5%" icon={CheckCircle2} tint="green" foot="of total suppliers"/><Metric label="Products sourced" value="186" change="12.3%" icon={Package} tint="purple" foot="across suppliers"/><Metric label="Pending deliveries" value="06" change="2 due today" direction="down" icon={Clock3} tint="amber" foot="awaiting receipt"/></div><div className="supplier-grid">{suppliers.map((s,i)=><div className="panel supplier-card" key={s.name}><div className="supplier-top"><div className={`supplier-logo logo-${i}`}>{s.name.split(' ').map(x=>x[0]).join('').slice(0,2)}</div><Status value={s.status}/><button className="icon-btn"><MoreHorizontal size={17}/></button></div><h3>{s.name}</h3><p className="contact-name">Primary contact: {s.contact}</p><div className="supplier-details"><div><Mail size={14}/>{s.email}</div><div><Phone size={14}/>{s.phone}</div></div><div className="supplier-bottom"><span><b>{s.products}</b> products supplied</span><span className="rating">★ {s.rating}</span></div></div>)}</div></div>
}

function Reports() {
  const data={labels:['Jun','Jul','Aug','Sep','Oct','Nov'],datasets:[{label:'Revenue',data:[310,390,360,490,530,610],borderColor:'#5478f5',backgroundColor:'rgba(84,120,245,.10)',fill:true,tension:.35,pointRadius:3}]}
  return <div className="page-content"><PageHeading eyebrow="BUSINESS INTELLIGENCE" title="Reports & analytics" description="Understand business performance and make informed operational decisions." action="Export report" onAction={()=>alert('Your report is being prepared.')}/><div className="metrics-grid compact"><Metric label="Gross revenue" value="₹26.8L" change="18.2%" icon={CircleDollarSign} tint="green" foot="year to date"/><Metric label="Orders fulfilled" value="1,284" change="11.6%" icon={CheckCircle2} tint="blue" foot="year to date"/><Metric label="Average order value" value="₹3,420" change="4.8%" icon={ShoppingCart} tint="purple" foot="vs. last year"/><Metric label="Stock turnover" value="6.4x" change="0.8x" icon={RefreshCw} tint="amber" foot="vs. last quarter"/></div><section className="panel report-panel"><PanelTitle title="Revenue performance" subtitle="Monthly revenue · June to November 2026" action={<select className="select-sm"><option>Last 6 months</option><option>This year</option></select>}/><div className="chart-wrap report-chart"><Line data={data} options={{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{display:false},border:{display:false}},y:{grid:{color:'#eef1f6'},border:{display:false},ticks:{callback:v=>'₹'+v+'k'}}}}}/></div></section><div className="dashboard-grid"><section className="panel report-stat"><PanelTitle title="Top selling categories" subtitle="By revenue contribution"/>{[['Electronics',34],['Packaging',26],['Storage',19],['Equipment',13],['Safety',8]].map(([n,v])=><div className="category-row" key={n}><div><span>{n}</span><b>{v}%</b></div><div className="progress-track"><div style={{width:`${v}%`}}/></div></div>)}</section><section className="panel report-stat"><PanelTitle title="Operational snapshot" subtitle="Current inventory health"/><div className="snapshot-row"><span>Stock availability</span><b>92.4%</b></div><div className="snapshot-row"><span>Order fulfilment rate</span><b>96.8%</b></div><div className="snapshot-row"><span>On-time dispatch</span><b>94.1%</b></div><div className="snapshot-row"><span>Warehouse utilisation</span><b>79.0%</b></div></section></div></div>
}


const categorySeed = [
  { name: 'Electronics', code: 'CAT-001', products: 42, units: 1280, value: 842500, status: 'Active', color: 'blue' },
  { name: 'Packaging', code: 'CAT-002', products: 36, units: 2460, value: 386400, status: 'Active', color: 'green' },
  { name: 'Storage', code: 'CAT-003', products: 24, units: 940, value: 512800, status: 'Active', color: 'purple' },
  { name: 'Safety', code: 'CAT-004', products: 18, units: 610, value: 184200, status: 'Active', color: 'amber' },
  { name: 'Equipment', code: 'CAT-005', products: 15, units: 325, value: 729500, status: 'Active', color: 'rose' },
  { name: 'Office Supplies', code: 'CAT-006', products: 22, units: 870, value: 96500, status: 'Active', color: 'blue' }
]
const transferSeed = [
  { id: 'TRF-3208', from: 'North Hub', to: 'Central Depot', items: 4, units: 120, date: '21 Nov 2026', status: 'In transit' },
  { id: 'TRF-3207', from: 'West Warehouse', to: 'North Hub', items: 2, units: 48, date: '21 Nov 2026', status: 'Pending' },
  { id: 'TRF-3206', from: 'Central Depot', to: 'West Warehouse', items: 6, units: 210, date: '20 Nov 2026', status: 'Completed' },
  { id: 'TRF-3205', from: 'North Hub', to: 'West Warehouse', items: 3, units: 75, date: '19 Nov 2026', status: 'Completed' },
  { id: 'TRF-3204', from: 'West Warehouse', to: 'Central Depot', items: 1, units: 30, date: '18 Nov 2026', status: 'Cancelled' }
]
const customerSeed = [
  { name: 'Apex Retail Pvt. Ltd.', code: 'CUS-1001', contact: 'Ritika Malhotra', email: 'ritika@apexretail.in', city: 'New Delhi', orders: 28, spend: 486500, status: 'Active' },
  { name: 'Metro Supplies', code: 'CUS-1002', contact: 'Sahil Khanna', email: 'sahil@metrosupplies.in', city: 'Noida', orders: 19, spend: 324800, status: 'Active' },
  { name: 'Northstar Components', code: 'CUS-1003', contact: 'Meera Nair', email: 'meera@northstar.in', city: 'Gurugram', orders: 16, spend: 291400, status: 'Active' },
  { name: 'Urban Home Store', code: 'CUS-1004', contact: 'Dev Arora', email: 'dev@urbanhome.in', city: 'Faridabad', orders: 11, spend: 168200, status: 'Active' },
  { name: 'Brightline Traders', code: 'CUS-1005', contact: 'Ananya Jain', email: 'ananya@brightline.in', city: 'Ghaziabad', orders: 7, spend: 98400, status: 'On hold' },
  { name: 'Evergreen Mart', code: 'CUS-1006', contact: 'Kabir Sood', email: 'kabir@evergreen.in', city: 'Delhi', orders: 5, spend: 76300, status: 'Active' }
]

function Categories() {
  const [items, setItems] = useState(categorySeed)
  const [query, setQuery] = useState('')
  const [show, setShow] = useState(false)
  const filtered = items.filter(x => `${x.name} ${x.code}`.toLowerCase().includes(query.toLowerCase()))
  const add = e => {
    e.preventDefault()
    const f = new FormData(e.target)
    setItems(prev => [...prev, { name: f.get('name'), code: `CAT-${String(prev.length+1).padStart(3,'0')}`, products: 0, units: 0, value: 0, status: 'Active', color: 'blue' }])
    setShow(false)
  }
  return <div className="page-content">
    <PageHeading eyebrow="PRODUCT CLASSIFICATION" title="Categories" description="Organise your catalogue into clear product groups and track category-level stock." action="Add category" onAction={()=>setShow(true)}/>
    <div className="metrics-grid compact">
      <Metric label="Total categories" value={items.length} change="2 added" icon={Tags} tint="blue" foot="this quarter"/>
      <Metric label="Products classified" value={items.reduce((s,x)=>s+x.products,0)} change="100%" icon={Package} tint="green" foot="catalogue coverage"/>
      <Metric label="Units in categories" value={items.reduce((s,x)=>s+x.units,0).toLocaleString('en-IN')} change="7.4%" icon={BoxesIcon} tint="purple" foot="vs. last month"/>
      <Metric label="Category valuation" value={money(items.reduce((s,x)=>s+x.value,0))} change="9.1%" icon={CircleDollarSign} tint="amber" foot="current stock value"/>
    </div>
    <section className="panel table-panel">
      <div className="toolbar"><div className="search-field"><Search size={16}/><input placeholder="Search categories..." value={query} onChange={e=>setQuery(e.target.value)}/></div><button className="outline-btn" onClick={()=>alert('Category list exported.')}><Download size={15}/> Export</button></div>
      <div className="category-card-grid">{filtered.map((x,i)=><div className="category-tile" key={x.code}><div className={`category-symbol ${x.color}`}><Tags size={19}/></div><div className="category-tile-head"><b>{x.name}</b><button className="icon-btn" onClick={()=>setItems(p=>p.map(v=>v.code===x.code?{...v,status:v.status==='Active'?'On hold':'Active'}:v))}><MoreHorizontal size={17}/></button></div><span className="mono">{x.code}</span><div className="category-tile-stats"><div><b>{x.products}</b><span>Products</span></div><div><b>{x.units.toLocaleString('en-IN')}</b><span>Units</span></div></div><div className="category-tile-bottom"><span>{money(x.value)}</span><Status value={x.status}/></div></div>)}</div>
    </section>
    {show&&<div className="modal-backdrop" onClick={()=>setShow(false)}><form className="modal" onClick={e=>e.stopPropagation()} onSubmit={add}><div className="modal-head"><div><h2>Add category</h2><p>Create a new product category.</p></div><button type="button" className="icon-btn" onClick={()=>setShow(false)}><X size={19}/></button></div><div className="form-grid"><label className="wide">Category name<input name="name" required placeholder="e.g. Home Appliances"/></label></div><div className="modal-actions"><button type="button" className="outline-btn" onClick={()=>setShow(false)}>Cancel</button><button className="primary-btn">Save category</button></div></form></div>}
  </div>
}

function Transfers() {
  const [rows, setRows] = useState(transferSeed)
  const [query, setQuery] = useState('')
  const [show, setShow] = useState(false)
  const shown = rows.filter(x=>`${x.id} ${x.from} ${x.to}`.toLowerCase().includes(query.toLowerCase()))
  const add = e => {
    e.preventDefault()
    const f = new FormData(e.target)
    setRows(p=>[{id:`TRF-${3209+p.length}`,from:f.get('from'),to:f.get('to'),items:Number(f.get('items')),units:Number(f.get('units')),date:'21 Nov 2026',status:'Pending'},...p])
    setShow(false)
  }
  const advance = id => setRows(p=>p.map(x=>x.id===id?{...x,status:x.status==='Pending'?'In transit':x.status==='In transit'?'Completed':x.status}:x))
  return <div className="page-content">
    <PageHeading eyebrow="INTERNAL STOCK MOVEMENT" title="Stock transfers" description="Move inventory between locations and monitor transfer progress." action="New transfer" onAction={()=>setShow(true)}/>
    <div className="metrics-grid compact">
      <Metric label="Total transfers" value={rows.length} change="12.5%" icon={ArrowLeftRight} tint="blue" foot="this month"/>
      <Metric label="Pending" value={rows.filter(x=>x.status==='Pending').length} change="Awaiting dispatch" icon={Clock3} tint="amber" foot="to be processed"/>
      <Metric label="In transit" value={rows.filter(x=>x.status==='In transit').length} change="On the move" icon={Truck} tint="purple" foot="active transfers"/>
      <Metric label="Completed units" value={rows.filter(x=>x.status==='Completed').reduce((s,x)=>s+x.units,0)} change="This month" icon={CheckCircle2} tint="green" foot="units transferred"/>
    </div>
    <section className="panel table-panel"><div className="toolbar"><div className="search-field"><Search size={16}/><input placeholder="Search transfer ID or warehouse..." value={query} onChange={e=>setQuery(e.target.value)}/></div><button className="outline-btn" onClick={()=>alert('Transfer report exported.')}><Download size={15}/> Export</button></div>
      <div className="table-scroll"><table><thead><tr><th>TRANSFER ID</th><th>FROM LOCATION</th><th>TO LOCATION</th><th>PRODUCT LINES</th><th>UNITS</th><th>DATE</th><th>STATUS</th><th>ACTION</th></tr></thead><tbody>{shown.map(x=><tr key={x.id}><td className="mono">{x.id}</td><td>{x.from}</td><td>{x.to}</td><td>{x.items}</td><td><b>{x.units}</b></td><td>{x.date}</td><td><Status value={x.status==='In transit'?'Shipped':x.status==='Pending'?'Pending':x.status}/></td><td><button className="text-btn" onClick={()=>advance(x.id)} disabled={['Completed','Cancelled'].includes(x.status)}>Advance <ArrowRight size={13}/></button></td></tr>)}</tbody></table>{shown.length===0&&<div className="empty-state">No transfers found.</div>}</div><div className="table-footer">Showing <b>{shown.length}</b> of <b>{rows.length}</b> transfers <span>Updated just now</span></div>
    </section>
    {show&&<div className="modal-backdrop" onClick={()=>setShow(false)}><form className="modal" onClick={e=>e.stopPropagation()} onSubmit={add}><div className="modal-head"><div><h2>Create stock transfer</h2><p>Select the source and destination locations.</p></div><button type="button" className="icon-btn" onClick={()=>setShow(false)}><X size={19}/></button></div><div className="form-grid"><label>From warehouse<select name="from">{warehouses.map(w=><option>{w.name}</option>)}</select></label><label>To warehouse<select name="to">{warehouses.map(w=><option>{w.name}</option>)}</select></label><label>Product lines<input name="items" type="number" min="1" defaultValue="1"/></label><label>Total units<input name="units" type="number" min="1" defaultValue="20"/></label></div><div className="modal-actions"><button type="button" className="outline-btn" onClick={()=>setShow(false)}>Cancel</button><button className="primary-btn">Create transfer</button></div></form></div>}
  </div>
}

function Customers() {
  const [rows, setRows] = useState(customerSeed)
  const [query, setQuery] = useState('')
  const [show, setShow] = useState(false)
  const shown=rows.filter(x=>`${x.name} ${x.code} ${x.city}`.toLowerCase().includes(query.toLowerCase()))
  const add=e=>{e.preventDefault();const f=new FormData(e.target);setRows(p=>[{name:f.get('name'),code:`CUS-${1001+p.length}`,contact:f.get('contact'),email:f.get('email'),city:f.get('city'),orders:0,spend:0,status:'Active'},...p]);setShow(false)}
  return <div className="page-content">
    <PageHeading eyebrow="CUSTOMER RELATIONSHIPS" title="Customers" description="View customer accounts, purchase history and account activity." action="Add customer" onAction={()=>setShow(true)}/>
    <div className="metrics-grid compact">
      <Metric label="Customer accounts" value={rows.length+138} change="8 new" icon={Users} tint="blue" foot="this month"/>
      <Metric label="Active customers" value={rows.filter(x=>x.status==='Active').length+131} change="94.2%" icon={CheckCircle2} tint="green" foot="account activity"/>
      <Metric label="Orders placed" value="1,842" change="16.8%" icon={ShoppingCart} tint="purple" foot="year to date"/>
      <Metric label="Customer revenue" value="₹48.6L" change="12.4%" icon={CircleDollarSign} tint="amber" foot="year to date"/>
    </div>
    <section className="panel table-panel"><div className="toolbar"><div className="search-field"><Search size={16}/><input placeholder="Search customers..." value={query} onChange={e=>setQuery(e.target.value)}/></div><button className="outline-btn" onClick={()=>alert('Customer list exported.')}><Download size={15}/> Export</button></div>
      <div className="table-scroll"><table><thead><tr><th>CUSTOMER</th><th>ACCOUNT ID</th><th>CONTACT PERSON</th><th>EMAIL</th><th>CITY</th><th>ORDERS</th><th>LIFETIME VALUE</th><th>STATUS</th></tr></thead><tbody>{shown.map(x=><tr key={x.code}><td><div className="product-cell"><div className="customer-avatar">{x.name.split(' ').map(v=>v[0]).join('').slice(0,2)}</div><b>{x.name}</b></div></td><td className="mono">{x.code}</td><td>{x.contact}</td><td>{x.email}</td><td>{x.city}</td><td>{x.orders}</td><td><b>{money(x.spend)}</b></td><td><Status value={x.status}/></td></tr>)}</tbody></table>{shown.length===0&&<div className="empty-state">No customers found.</div>}</div><div className="table-footer">Showing <b>{shown.length}</b> of <b>{rows.length}</b> customer records <span>Updated just now</span></div>
    </section>
    {show&&<div className="modal-backdrop" onClick={()=>setShow(false)}><form className="modal" onClick={e=>e.stopPropagation()} onSubmit={add}><div className="modal-head"><div><h2>Add customer</h2><p>Create a customer account.</p></div><button type="button" className="icon-btn" onClick={()=>setShow(false)}><X size={19}/></button></div><div className="form-grid"><label className="wide">Business / customer name<input name="name" required/></label><label>Contact person<input name="contact" required/></label><label>Email address<input name="email" type="email" required/></label><label className="wide">City<input name="city" required/></label></div><div className="modal-actions"><button type="button" className="outline-btn" onClick={()=>setShow(false)}>Cancel</button><button className="primary-btn">Save customer</button></div></form></div>}
  </div>
}

function OrderTypePage({ orders, setOrders, type }) {
  const isPurchase=type==='Purchase'
  const rows=orders.filter(o=>o.type===type)
  const [query,setQuery]=useState('')
  const shown=rows.filter(o=>`${o.id} ${o.customer}`.toLowerCase().includes(query.toLowerCase()))
  const create=()=>setOrders(p=>[{id:`${isPurchase?'PO':'ORD'}-${920+p.length}`,customer:isPurchase?'New Supplier Account':'New Customer Account',date:'21 Nov 2026',items:3,amount:28500,status:'Pending',type},...p])
  const advance=id=>setOrders(p=>p.map(o=>o.id===id?{...o,status:o.status==='Pending'?'Processing':o.status==='Processing'?'Shipped':o.status}:o))
  return <div className="page-content"><PageHeading eyebrow={isPurchase?'PROCUREMENT':'CUSTOMER FULFILMENT'} title={`${type} orders`} description={isPurchase?'Track supplier purchases, incoming stock and procurement status.':'Manage customer orders, fulfilment and dispatch status.'} action={`Create ${type.toLowerCase()} order`} onAction={create}/><div className="metrics-grid compact"><Metric label={`Total ${type.toLowerCase()} orders`} value={rows.length} change="10.4%" icon={ClipboardList} tint="blue" foot="this month"/><Metric label="Pending" value={rows.filter(x=>x.status==='Pending').length} change="Awaiting action" icon={Clock3} tint="amber" foot="orders"/><Metric label="Processing" value={rows.filter(x=>x.status==='Processing').length} change="In progress" icon={RefreshCw} tint="purple" foot="orders"/><Metric label="Total order value" value={money(rows.reduce((s,x)=>s+x.amount,0))} change="9.2%" icon={CircleDollarSign} tint="green" foot="combined value"/></div><section className="panel table-panel"><div className="toolbar"><div className="search-field"><Search size={16}/><input placeholder={`Search ${type.toLowerCase()} orders...`} value={query} onChange={e=>setQuery(e.target.value)}/></div><button className="outline-btn" onClick={()=>alert(`${type} orders exported.`)}><Download size={15}/> Export</button></div><div className="table-scroll"><table><thead><tr><th>ORDER ID</th><th>{isPurchase?'SUPPLIER':'CUSTOMER'}</th><th>DATE</th><th>ITEMS</th><th>ORDER VALUE</th><th>STATUS</th><th>ACTION</th></tr></thead><tbody>{shown.map(o=><tr key={o.id}><td className="mono">{o.id}</td><td><b className="normal-weight">{o.customer}</b></td><td>{o.date}</td><td>{o.items}</td><td><b>{money(o.amount)}</b></td><td><Status value={o.status}/></td><td><button className="text-btn" onClick={()=>advance(o.id)} disabled={['Shipped','Delivered','Cancelled'].includes(o.status)}>Update <ArrowRight size={13}/></button></td></tr>)}</tbody></table>{shown.length===0&&<div className="empty-state">No {type.toLowerCase()} orders found.</div>}</div><div className="table-footer">Showing <b>{shown.length}</b> of <b>{rows.length}</b> orders <span>Updated just now</span></div></section></div>
}


function SettingsPage(){return <div className="page-content"><PageHeading eyebrow="PREFERENCES" title="Settings" description="Manage your workspace preferences and account details."/></div>}

export default function App() {
  const [products,setProducts]=useState(initialProducts),[orders,setOrders]=useState(initialOrders),[menu,setMenu]=useState(false)
  const location=useLocation()
  const title=titles[location.pathname]||'Settings'
  return <div className="app-shell"><Sidebar open={menu} onClose={()=>setMenu(false)}/><main className="main-area"><Header title={title} onMenu={()=>setMenu(true)}/><Routes><Route path="/" element={<Overview products={products} orders={orders} onCreateOrder={()=>setOrders(p=>[{id:`ORD-${2482+p.length}`,customer:"New Customer Account",date:"21 Nov 2026",items:2,amount:15400,status:"Processing",type:"Sales"},...p])}/>}/><Route path="/inventory" element={<Inventory products={products} setProducts={setProducts}/>}/><Route path="/categories" element={<Categories/>}/><Route path="/warehouses" element={<Warehouses/>}/><Route path="/transfers" element={<Transfers/>}/><Route path="/purchase-orders" element={<OrderTypePage orders={orders} setOrders={setOrders} type="Purchase"/>}/><Route path="/sales-orders" element={<OrderTypePage orders={orders} setOrders={setOrders} type="Sales"/>}/><Route path="/suppliers" element={<Suppliers/>}/><Route path="/customers" element={<Customers/>}/><Route path="/reports" element={<Reports/>}/><Route path="/settings" element={<SettingsPage/>}/></Routes><footer className="app-footer"><span>© 2026 Retail Inventory. All rights reserved.</span><span>Inventory operations, made clear.</span></footer></main></div>
}