import { useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const salesData = [
  { name: 'Mon', sales: 180000, orders: 24 },
  { name: 'Tue', sales: 220000, orders: 32 },
  { name: 'Wed', sales: 150000, orders: 18 },
  { name: 'Thu', sales: 280000, orders: 41 },
  { name: 'Fri', sales: 320000, orders: 52 },
  { name: 'Sat', sales: 410000, orders: 63 },
  { name: 'Sun', sales: 290000, orders: 38 },
]

const lowStock = [
  { product: 'Milo 500g', stock: 4, category: 'Beverages' },
  { product: 'Peak Milk', stock: 6, category: 'Dairy' },
  { product: 'Indomie Box', stock: 2, category: 'Noodles' },
  { product: 'Coca-Cola PET', stock: 8, category: 'Drinks' },
]

export default function App() {
  const [active, setActive] = useState('Dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const menu = [
    { id: 'Dashboard', icon: '📊' },
    { id: 'Sales', icon: '💳' },
    { id: 'Inventory', icon: '📦' },
    { id: 'Reports', icon: '📈' },
    { id: 'AI Insights', icon: '✨' },
    { id: 'Settings', icon: '⚙️' },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        *{margin:0;padding:0;box-sizing:border-box;font-family:Inter,sans-serif}
        .layout{display:flex;min-height:100vh;background:#f6f7fb}
        .sidebar{width:260px;background:#0f172a;color:white;padding:24px 16px;position:fixed;height:100vh;transition:0.3s;z-index:20}
        .sidebar-mobile{transform:translateX(-100%)}
        .sidebar-mobile.open{transform:translateX(0)}
        .main{flex:1;margin-left:260px;padding:0;min-width:0}
        .topbar{background:white;border-bottom:1px solid #e2e8f0;padding:14px 24px;display:flex;align-items:center;justify-content:space-between;gap:12px;position:sticky;top:0;z-index:10}
        .search{flex:1;max-width:420px;display:flex;align-items:center;background:#f1f5f9;border:1px solid #e2e8f0;border-radius:10px;padding:10px 14px;gap:8px}
        .search input{border:0;background:transparent;outline:none;width:100%;font-size:14px}
        .cards{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;padding:24px}
        .card{background:white;border:1px solid #e2e8f0;border-radius:16px;padding:20px}
        .card h4{color:#64748b;font-size:12px;font-weight:600;letter-spacing:.5px;text-transform:uppercase}
        .card h2{font-size:24px;margin:10px 0 6px;font-weight:700}
        .card span{font-size:12px;padding:4px 8px;border-radius:20px;font-weight:500}
        .grid2{display:grid;grid-template-columns:1.7fr 1fr;gap:16px;padding:0 24px 24px}
        .chartBox{background:white;border:1px solid #e2e8f0;border-radius:16px;padding:20px}
        @media(max-width:1000px){.cards{grid-template-columns:repeat(2,1fr)}.grid2{grid-template-columns:1fr}}
        @media(max-width:768px){.sidebar{transform:translateX(-100%)}.sidebar.open{transform:translateX(0)}.main{margin-left:0}.cards{grid-template-columns:1fr}}
      `}</style>

      <div className="layout">
        {/* SIDEBAR */}
        <aside className={`sidebar ${sidebarOpen ? 'open' : ''} sidebar-mobile`} style={{display:'flex',flexDirection:'column'}}>
          <h1 style={{fontSize:'22px',fontWeight:'700',marginBottom:'32px'}}>SellSync</h1>
          <div style={{flex:1}}>
            {menu.map(m => (
              <div key={m.id} onClick={()=>setActive(m.id)}
                style={{
                  padding:'12px 14px',borderRadius:'10px',cursor:'pointer',marginBottom:'6px',
                  display:'flex',gap:'10px',alignItems:'center',
                  background: active===m.id ? '#1e293b' : 'transparent',
                  color: active===m.id ? 'white' : '#94a3b8',
                  border: active===m.id ? '1px solid #334155' : '1px solid transparent',
                  fontSize:'14px',fontWeight:500
                }}>
                <span>{m.icon}</span> {m.id}
              </div>
            ))}
          </div>
          <div style={{background:'#1e293b',padding:'14px',borderRadius:'12px',fontSize:'12px',color:'#94a3b8'}}>
            <div style={{color:'white',fontWeight:600,marginBottom:'4px'}}>Free Trial</div>
            12 days left — Upgrade for AI Insights
          </div>
        </aside>

        {/* MAIN */}
        <main className="main">
          {/* TOP NAV */}
          <div className="topbar">
            <div style={{display:'flex',alignItems:'center',gap:'12px',flex:1}}>
              <button onClick={()=>setSidebarOpen(!sidebarOpen)} style={{display:'none',border:'1px solid #e2e8f0',background:'white',padding:'8px',borderRadius:'8px'}} className="mobile-btn">☰</button>
              <div style={{fontWeight:600}}>{active}</div>
              <div className="search" style={{marginLeft:'16px'}}>
                <span style={{color:'#94a3b8'}}>🔍</span>
                <input placeholder="Search products, sales, customers..." />
              </div>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
              <div style={{position:'relative',cursor:'pointer',fontSize:'18px'}}>🔔<span style={{position:'absolute',top:-2,right:-2,width:'8px',height:'8px',background:'#ef4444',borderRadius:'50%'}}></span></div>
              <div style={{display:'flex',alignItems:'center',gap:'10px',borderLeft:'1px solid #e2e8f0',paddingLeft:'16px'}}>
                <img src="https://i.pravatar.cc/100?img=33" style={{width:'32px',height:'32px',borderRadius:'50%'}} />
                <div style={{lineHeight:1.2}}><div style={{fontSize:'13px',fontWeight:600}}>Aisha Bello</div><div style={{fontSize:'11px',color:'#64748b'}}>Admin</div></div>
              </div>
            </div>
          </div>

          {/* SUMMARY CARDS */}
          <div className="cards">
            <div className="card">
              <h4>Total Sales</h4>
              <h2>₦1,245,000</h2>
              <span style={{background:'#dcfce7',color:'#15803d'}}>+14.2% this week</span>
            </div>
            <div className="card">
              <h4>Products</h4>
              <h2>328</h2>
              <span style={{background:'#e0e7ff',color:'#4338ca'}}>18 categories</span>
            </div>
            <div className="card">
              <h4>Low Stock</h4>
              <h2>12</h2>
              <span style={{background:'#fee2e2',color:'#b91c1c'}}>Needs restock</span>
            </div>
            <div className="card">
              <h4>Today's Transactions</h4>
              <h2>86</h2>
              <span style={{background:'#f1f5f9',color:'#334155'}}>₦184k today</span>
            </div>
          </div>

          {/* SALES OVERVIEW + LOW STOCK */}
          <div className="grid2">
            <div className="chartBox">
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'16px'}}>
                <h3 style={{fontWeight:600}}>Sales Overview</h3>
                <select style={{border:'1px solid #e2e8f0',borderRadius:'8px',padding:'6px 10px',fontSize:'12px'}}><option>This Week</option></select>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{fontSize:12}} axisLine={false} tickLine={false} />
                  <YAxis tick={{fontSize:12}} axisLine={false} tickLine={false} tickFormatter={(v)=>`₦${v/1000}k`} />
                  <Tooltip formatter={(v)=>[`₦${v.toLocaleString()}`,'Sales']} />
                  <Area type="monotone" dataKey="sales" stroke="#4f46e5" fill="#e0e7ff" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="chartBox">
              <h3 style={{fontWeight:600,marginBottom:'16px'}}>Low Stock Alert</h3>
              {lowStock.map((item,i)=>(
                <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 0',borderBottom: i<3 ? '1px solid #f1f5f9' : '0'}}>
                  <div>
                    <div style={{fontSize:'13px',fontWeight:600}}>{item.product}</div>
                    <div style={{fontSize:'11px',color:'#64748b'}}>{item.category} • {item.stock} left</div>
                  </div>
                  <span style={{background:'#fef3c7',color:'#92400e',fontSize:'11px',padding:'4px 8px',borderRadius:'20px',fontWeight:600}}>{item.stock} left</span>
                </div>
              ))}
              <button style={{width:'100%',marginTop:'16px',background:'#0f172a',color:'white',border:0,padding:'10px',borderRadius:'10px',fontSize:'13px',cursor:'pointer'}}>View Inventory →</button>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && <div onClick={()=>setSidebarOpen(false)} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.4)',zIndex:15}}></div>}
    </>
  )
}
