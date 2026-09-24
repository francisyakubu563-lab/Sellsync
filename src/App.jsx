import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const salesData = [
  { name: 'Mon', sales: 180000 }, { name: 'Tue', sales: 220000 },
  { name: 'Wed', sales: 150000 }, { name: 'Thu', sales: 280000 },
  { name: 'Fri', sales: 320000 }, { name: 'Sat', sales: 410000 },
  { name: 'Sun', sales: 290000 },
]
const initialStock = [
  { product: 'Milo 500g', stock: 4, category: 'Beverages' },
  { product: 'Peak Milk', stock: 6, category: 'Dairy' },
  { product: 'Indomie Box', stock: 2, category: 'Noodles' },
  { product: 'Coca-Cola PET', stock: 8, category: 'Drinks' },
]

export default function App() {
  const [active, setActive] = useState('Dashboard')
  const [search, setSearch] = useState('')
  const [showNotif, setShowNotif] = useState(false)
  const [toast, setToast] = useState('')
  const [stock, setStock] = useState(initialStock)

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(''), 2500) }

  const filteredStock = useMemo(() => 
    stock.filter(s => s.product.toLowerCase().includes(search.toLowerCase())), [search, stock]
  )

  const menu = [
    { id: 'Dashboard', icon: '📊' }, { id: 'Sales', icon: '💳' },
    { id: 'Inventory', icon: '📦' }, { id: 'Reports', icon: '📈' },
    { id: 'AI Insights', icon: '✨' }, { id: 'Settings', icon: '⚙️' },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        *{margin:0;padding:0;box-sizing:border-box;font-family:Inter,sans-serif}
        .layout{display:flex;min-height:100vh;background:#f6f7fb}
        .sidebar{width:260px;background:#0f172a;color:white;padding:24px 16px;position:fixed;height:100vh;z-index:20;display:flex;flex-direction:column}
        .main{flex:1;margin-left:260px;min-width:0}
        .topbar{background:white;border-bottom:1px solid #e2e8f0;padding:12px 24px;display:flex;align-items:center;justify-content:space-between;gap:12px;position:sticky;top:0;z-index:10}
        .search{flex:1;max-width:420px;display:flex;align-items:center;background:#f1f5f9;border:1px solid #e2e8f0;border-radius:10px;padding:10px 14px;gap:8px}
        .search input{border:0;background:transparent;outline:none;width:100%;font-size:14px}
        .search:focus-within{border-color:#4f46e5;background:white}
        .cards{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;padding:24px}
        .card{background:white;border:1px solid #e2e8f0;border-radius:16px;padding:20px;cursor:pointer;transition:.2s}
        .card:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.06);border-color:#cbd5e1}
        .card h4{color:#64748b;font-size:11px;font-weight:600;letter-spacing:.5px;text-transform:uppercase}
        .card h2{font-size:22px;margin:10px 0 6px;font-weight:700}
        .grid2{display:grid;grid-template-columns:1.7fr 1fr;gap:16px;padding:0 24px 24px}
        .box{background:white;border:1px solid #e2e8f0;border-radius:16px;padding:20px}
        .btn{width:100%;background:#0f172a;color:white;border:0;padding:11px;border-radius:10px;font-size:13px;cursor:pointer;transition:.2s}
        .btn:hover{background:#1e293b}
        .btn:active{transform:scale(.98)}
        .menuItem{padding:12px 14px;border-radius:10px;cursor:pointer;margin-bottom:6px;display:flex;gap:10px;align-items:center;font-size:14px;font-weight:500;transition:.2s}
        .menuItem:hover{background:#1e293b;color:white}
        .toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#0f172a;color:white;padding:12px 20px;border-radius:10px;font-size:13px;z-index:50;box-shadow:0 10px 30px rgba(0,0,0,.2)}
        @media(max-width:900px){.cards{grid-template-columns:repeat(2,1fr)}.grid2{grid-template-columns:1fr}.sidebar{display:none}.main{margin-left:0}}
      `}</style>

      <div className="layout">
        <aside className="sidebar">
          <h1 style={{fontSize:'22px',fontWeight:'700',marginBottom:'32px'}}>SellSync</h1>
          <div style={{flex:1}}>
            {menu.map(m => (
              <div key={m.id} onClick={()=>{setActive(m.id); showToast(`${m.id} clicked`)}} 
                className="menuItem" style={{background: active===m.id ? '#1e293b' : 'transparent', color: active===m.id ? 'white' : '#94a3b8', border: active===m.id ? '1px solid #334155' : '1px solid transparent'}}>
                <span>{m.icon}</span> {m.id}
              </div>
            ))}
          </div>
          <div style={{background:'#1e293b',padding:'14px',borderRadius:'12px',fontSize:'12px',color:'#94a3b8'}}>AI Insights: Sales will peak Saturday</div>
        </aside>

        <main className="main">
          <div className="topbar">
            <div style={{fontWeight:700, minWidth:'90px'}}>{active}</div>
            <div className="search">
              <span>🔍</span>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products, sales, customers..." />
            </div>
            <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
              <div style={{position:'relative'}}>
                <div onClick={()=>setShowNotif(!showNotif)} style={{fontSize:'20px',cursor:'pointer',position:'relative'}}>🔔<span style={{position:'absolute',top:-2,right:-2,width:'8px',height:'8px',background:'#ef4444',borderRadius:'50%'}}></span></div>
                {showNotif && <div style={{position:'absolute',right:0,top:'36px',width:'280px',background:'white',border:'1px solid #e2e8f0',borderRadius:'12px',padding:'12px',boxShadow:'0 10px 30px rgba(0,0,0,.1)',zIndex:20}}>
                  <div style={{fontWeight:600,fontSize:'13px',marginBottom:'8px'}}>Notifications</div>
                  <div style={{fontSize:'12px',padding:'8px 0',borderBottom:'1px solid #f1f5f9'}}>⚠️ Milo 500g is low (4 left)</div>
                  <div style={{fontSize:'12px',padding:'8px 0'}}>✅ New sale: ₦42,000 - Indomie</div>
                </div>}
              </div>
              <div onClick={()=>showToast('Profile settings coming soon')} style={{display:'flex',alignItems:'center',gap:'10px',borderLeft:'1px solid #e2e8f0',paddingLeft:'16px',cursor:'pointer'}}>
                <img src="https://i.pravatar.cc/100?img=33" style={{width:'32px',height:'32px',borderRadius:'50%'}} />
                <div style={{lineHeight:1.2}}><div style={{fontSize:'13px',fontWeight:600}}>Aisha Bello</div><div style={{fontSize:'11px',color:'#64748b'}}>Admin</div></div>
              </div>
            </div>
          </div>

          {active === 'Dashboard' ? (
            <>
              <div className="cards">
                <div className="card" onClick={()=>showToast('Total sales details opened')}><h4>Total Sales</h4><h2>₦1,245,000</h2><span style={{background:'#dcfce7',color:'#15803d',fontSize:'11px',padding:'4px 8px',borderRadius:'20px'}}>+14.2% this week</span></div>
                <div className="card" onClick={()=>{setActive('Inventory'); showToast('Going to Inventory')}}><h4>Products</h4><h2>328</h2><span style={{background:'#e0e7ff',color:'#4338ca',fontSize:'11px',padding:'4px 8px',borderRadius:'20px'}}>18 categories</span></div>
                <div className="card" onClick={()=>showToast('12 items need restock')}><h4>Low Stock</h4><h2>12</h2><span style={{background:'#fee2e2',color:'#b91c1c',fontSize:'11px',padding:'4px 8px',borderRadius:'20px'}}>Needs restock</span></div>
                <div className="card" onClick={()=>setActive('Sales')}><h4>Today's Transactions</h4><h2>86</h2><span style={{background:'#f1f5f9',color:'#334155',fontSize:'11px',padding:'4px 8px',borderRadius:'20px'}}>₦184k today</span></div>
              </div>

              <div className="grid2">
                <div className="box">
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:'16px'}}><h3 style={{fontWeight:600}}>Sales Overview</h3><select onChange={e=>showToast(`Filter: ${e.target.value}`)} style={{border:'1px solid #e2e8f0',borderRadius:'8px',padding:'6px 10px',fontSize:'12px'}}><option>This Week</option><option>Last Week</option></select></div>
                  <ResponsiveContainer width="100%" height={280}><AreaChart data={salesData}><CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" /><XAxis dataKey="name" tick={{fontSize:12}} axisLine={false} tickLine={false} /><YAxis tick={{fontSize:12}} axisLine={false} tickLine={false} tickFormatter={v=>`₦${v/1000}k`} /><Tooltip formatter={v=>[`₦${v.toLocaleString()}`,'Sales']} /><Area type="monotone" dataKey="sales" stroke="#4f46e5" fill="#e0e7ff" strokeWidth={2} /></AreaChart></ResponsiveContainer>
                </div>

                <div className="box">
                  <h3 style={{fontWeight:600,marginBottom:'16px'}}>Low Stock Alert {search && `(${filteredStock.length})`}</h3>
                  {filteredStock.length === 0 && <div style={{fontSize:'13px',color:'#64748b',padding:'20px 0',textAlign:'center'}}>No products found for "{search}"</div>}
                  {filteredStock.map((item,i)=>(
                    <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 0',borderBottom:'1px solid #f1f5f9'}}>
                      <div><div style={{fontSize:'13px',fontWeight:600}}>{item.product}</div><div style={{fontSize:'11px',color:'#64748b'}}>{item.category} • {item.stock} left</div></div>
                      <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
                        <span style={{background:'#fef3c7',color:'#92400e',fontSize:'11px',padding:'4px 8px',borderRadius:'20px',fontWeight:600}}>{item.stock} left</span>
                        <button onClick={()=>{setStock(stock.map(s=> s.product===item.product ? {...s, stock: s.stock+10} : s)); showToast(`${item.product} restocked +10`)}} style={{border:'1px solid #e2e8f0',background:'white',borderRadius:'6px',padding:'4px 8px',cursor:'pointer',fontSize:'11px'}}>Restock</button>
                      </div>
                    </div>
                  ))}
                  <button className="btn" style={{marginTop:'16px'}} onClick={()=>{setActive('Inventory'); showToast('Opening full inventory')}}>View Inventory →</button>
                </div>
              </div>
            </>
          ) : (
            <div style={{padding:'40px 24px'}}>
              <div className="box" style={{textAlign:'center',padding:'60px 20px'}}>
                <div style={{fontSize:'48px',marginBottom:'12px'}}>{menu.find(m=>m.id===active)?.icon}</div>
                <h2 style={{marginBottom:'8px'}}>{active} Page</h2>
                <p style={{color:'#64748b',fontSize:'14px',marginBottom:'20px'}}>This is the {active} section. Content is interactive and ready for backend integration.</p>
                <button className="btn" style={{width:'auto',padding:'10px 20px'}} onClick={()=>setActive('Dashboard')}>← Back to Dashboard</button>
              </div>
            </div>
          )}
        </main>
      </div>

      {toast && <div className="toast">✅ {toast}</div>}
    </>
  )
}
