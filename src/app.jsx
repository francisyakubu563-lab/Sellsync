import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { LayoutDashboard, TrendingUp, Package, FileBarChart, BrainCircuit, Settings, Search, Bell, Menu, AlertTriangle } from 'lucide-react'

const weeklySales = [
  { day: 'Mon', sales: 185000 },
  { day: 'Tue', sales: 210000 },
  { day: 'Wed', sales: 195000 },
  { day: 'Thu', sales: 250000 },
  { day: 'Fri', sales: 310000 },
  { day: 'Sat', sales: 280000 },
  { day: 'Sun', sales: 150000 },
]

const inventory = [
  { name: 'Indomie Noodles (Carton)', category: 'Groceries', stock: 45, price: '₦8,500', status: 'In Stock' },
  { name: 'Peak Milk 400g', category: 'Dairy', stock: 8, price: '₦1,800', status: 'Low Stock' },
  { name: 'Dettol Antiseptic 500ml', category: 'Health', stock: 32, price: '₦2,200', status: 'In Stock' },
  { name: 'Coca-Cola 50cl (Pack)', category: 'Beverages', stock: 120, price: '₦3,600', status: 'In Stock' },
  { name: 'Golden Penny Spaghetti', category: 'Groceries', stock: 5, price: '₦900', status: 'Low Stock' },
  { name: 'Close Up Toothpaste', category: 'Health', stock: 60, price: '₦1,200', status: 'In Stock' },
  { name: 'Milo Sachet (Box)', category: 'Beverages', stock: 0, price: '₦5,500', status: 'Out of Stock' },
]

const menu = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: TrendingUp, label: 'Sales' },
  { icon: Package, label: 'Inventory' },
  { icon: FileBarChart, label: 'Reports' },
  { icon: BrainCircuit, label: 'AI Insights' },
  { icon: Settings, label: 'Settings' },
]

export default function App() {
  const [open, setOpen] = useState(true)
  return (
    <div className="layout">
      {/* SIDEBAR */}
      <aside style={{width: open ? '260px' : '0', background:'#0f172a', color:'white', position:'fixed', height:'100vh', overflow:'hidden', transition:'.3s', zIndex:20}}>
        <div style={{padding:'22px', display: open ? 'block' : 'none'}}>
          <h2 style={{display:'flex', alignItems:'center', gap:'10px', fontSize:'20px', fontWeight:700}}><div style={{width:'36px', height:'36px', background:'#6366f1', borderRadius:'10px', display:'grid', placeItems:'center'}}>S</div> SellSync</h2>
          <div style={{marginTop:'32px', display:'flex', flexDirection:'column', gap:'4px'}}>
            {menu.map(m=>(
              <div key={m.label} style={{display:'flex', alignItems:'center', gap:'12px', padding:'12px 14px', borderRadius:'10px', background: m.active ? '#1e293b' : 'transparent', color: m.active ? 'white' : '#94a3b8', cursor:'pointer', fontSize:'14px', fontWeight: m.active ? 600 : 400}}>
                <m.icon size={19}/> {m.label}
              </div>
            ))}
          </div>
        </div>
      </aside>

      <div className="main">
        {/* TOP NAV */}
        <div className="topbar">
          <div style={{display:'flex', alignItems:'center', gap:'14px'}}>
            <Menu style={{cursor:'pointer'}} onClick={()=>setOpen(!open)}/>
            <div className="search"><Search size={16}/><input placeholder="Search products, sales..."/></div>
          </div>
          <div style={{display:'flex', alignItems:'center', gap:'18px'}}>
            <div style={{position:'relative'}}><Bell size={20}/><span style={{position:'absolute', top:'-4px', right:'-4px', width:'8px', height:'8px', background:'#ef4444', borderRadius:'50%'}}></span></div>
            <div style={{display:'flex', alignItems:'center', gap:'10px'}}><div style={{width:'34px', height:'34px', background:'#e2e8f0', borderRadius:'50%', display:'grid', placeItems:'center', fontWeight:700}}>AD</div><div style={{lineHeight:1.1}}><p style={{fontSize:'13px', fontWeight:600}}>Admin</p><p style={{fontSize:'11px', color:'#64748b'}}>Owner</p></div></div>
          </div>
        </div>

        <div style={{padding:'24px'}}>
          {/* SUMMARY CARDS */}
          <div className="summary">
            <div className="card"><p className="muted">Total Sales</p><h2>₦1,245,000</h2><span className="up">↑ 12.5% from last week</span></div>
            <div className="card"><p className="muted">Products</p><h2>328</h2><span className="up">↑ 4 new added</span></div>
            <div className="card"><p className="muted">Low Stock</p><h2 style={{color:'#f59e0b'}}>12</h2><span className="down">Needs attention</span></div>
            <div className="card"><p className="muted">Today's Transactions</p><h2>86</h2><span className="up">↑ 18% today</span></div>
          </div>

          <div className="grid2">
            {/* SALES OVERVIEW */}
            <div className="card">
              <h3>Sales Overview (This Week)</h3>
              <p style={{fontSize:'12px', color:'#64748b', margin:'4px 0 16px'}}>Mon - Sun</p>
              <div style={{height:'300px'}}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklySales}><XAxis dataKey="day" axisLine={false} tickLine={false} fontSize={12}/><YAxis axisLine={false} tickLine={false} fontSize={12} tickFormatter={v=>`₦${v/1000}k`}/><Tooltip formatter={(v)=>[`₦${v.toLocaleString()}`, 'Sales']}/><Bar dataKey="sales" fill="#6366f1" radius={[8,8,0,0]}/></BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* AI INSIGHT */}
            <div style={{display:'flex', flexDirection:'column', gap:'16px'}}>
              <div className="card" style={{background:'linear-gradient(135deg,#6366f1,#8b5cf6)', color:'white', border:'none'}}>
                <div style={{display:'flex', gap:'10px', alignItems:'center', marginBottom:'12px'}}><BrainCircuit/><h3>AI Insight</h3><span style={{marginLeft:'auto', background:'rgba(255,255,255,0.2)', padding:'4px 10px', borderRadius:'20px', fontSize:'11px'}}>Live</span></div>
                <p style={{fontSize:'14px', lineHeight:1.6, opacity:0.95}}>"Peak Milk is selling faster than usual this week. Consider restocking within the next 2 days to avoid running out of stock."</p>
                <div style={{marginTop:'14px', display:'flex', gap:'8px'}}>
                  <button style={{background:'white', color:'#6366f1', border:0, padding:'8px 14px', borderRadius:'8px', fontSize:'13px', fontWeight:600, cursor:'pointer'}}>Restock Now</button>
                  <button style={{background:'rgba(255,255,255,0.15)', color:'white', border:0, padding:'8px 14px', borderRadius:'8px', fontSize:'13px', cursor:'pointer'}}>Dismiss</button>
                </div>
              </div>
              <div className="card" style={{borderLeft:'4px solid #f59e0b'}}>
                <div style={{display:'flex', gap:'8px', alignItems:'center'}}><AlertTriangle size={18} color="#f59e0b"/><h4 style={{fontSize:'14px'}}>Low Stock Alert</h4></div>
                <p style={{fontSize:'13px', color:'#64748b', marginTop:'8px'}}>2 products are below 10 units. Peak Milk and Golden Penny Spaghetti need restocking.</p>
              </div>
            </div>
          </div>

          {/* INVENTORY TABLE */}
          <div className="card" style={{marginTop:'16px'}}>
            <h3 style={{marginBottom:'14px'}}>Inventory Overview</h3>
            <div style={{overflowX:'auto'}}>
              <table><thead><tr><th>Product Name</th><th>Category</th><th>Stock Qty</th><th>Price</th><th>Status</th></tr></thead>
              <tbody>{inventory.map(i=>(
                <tr key={i.name}><td style={{fontWeight:600}}>{i.name}</td><td>{i.category}</td><td>{i.stock}</td><td>{i.price}</td><td><span className={`badge ${i.status==='In Stock'?'ok':i.status==='Low Stock'?'warn':'bad'}`}>{i.status}</span></td></tr>
              ))}</tbody></table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
