import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const salesData = [
  { name: 'Mon', sales: 180000 }, { name: 'Tue', sales: 220000 },
  { name: 'Wed', sales: 150000 }, { name: 'Thu', sales: 280000 },
  { name: 'Fri', sales: 320000 }, { name: 'Sat', sales: 410000 },
  { name: 'Sun', sales: 290000 },
]

const initialInventory = [
  { id:1, product: 'Indomie Noodles (Box)', category: 'Noodles', stock: 2, price: 4200 },
  { id:2, product: 'Peak Milk 400g', category: 'Dairy', stock: 6, price: 1800 },
  { id:3, product: 'Dettol Antiseptic 500ml', category: 'Hygiene', stock: 4, price: 2500 },
  { id:4, product: 'Coca-Cola PET 50cl', category: 'Drinks', stock: 18, price: 300 },
  { id:5, product: 'Milo 500g', category: 'Beverages', stock: 3, price: 3500 },
  { id:6, product: 'Golden Morn 500g', category: 'Cereals', stock: 15, price: 1900 },
]

const getStatus = (stock) => stock <= 0 ? 'Out of Stock' : stock <= 5 ? 'Low Stock' : 'In Stock'
const getStatusColor = (stock) => stock <= 0 ? {bg:'#fee2e2',c:'#b91c1c'} : stock <=5 ? {bg:'#fef3c7',c:'#92400e'} : {bg:'#dcfce7',c:'#15803d'}

function Sidebar({active,setActive}) {
  const menu=[{id:'Dashboard',icon:'📊'},{id:'Sales',icon:'💳'},{id:'Inventory',icon:'📦'},{id:'Reports',icon:'📈'},{id:'AI Insights',icon:'✨'},{id:'Settings',icon:'⚙️'}]
  return <aside className="sidebar">{menu.map(m=><div key={m.id} onClick={()=>setActive(m.id)} className="menuItem" style={{background:active===m.id?'#1e293b':'',color:active===m.id?'white':'#94a3b8'}}><span>{m.icon}</span>{m.id}</div>)}
    <div style={{marginTop:'auto',background:'#1e293b',padding:12,borderRadius:10,fontSize:11,color:'#94a3b8'}}>SellSync v1.0 • Retail OS</div>
  </aside>
}

export default function App() {
  const [active,setActive]=useState('Dashboard')
  const [search,setSearch]=useState('')
  const [showNotif,setShowNotif]=useState(false)
  const [toast,setToast]=useState('')
  const [inventory,setInventory]=useState(initialInventory)
  const showToast=(m)=>{setToast(m); setTimeout(()=>setToast(''),2500)}
  const filtered=useMemo(()=>inventory.filter(i=>i.product.toLowerCase().includes(search.toLowerCase())),[search,inventory])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        *{margin:0;padding:0;box-sizing:border-box;font-family:Inter,sans-serif}
        .layout{display:flex;min-height:100vh;background:#f6f7fb}
        .sidebar{width:260px;background:#0f172a;color:white;padding:24px 16px;position:fixed;height:100vh;z-index:20;display:flex;flex-direction:column;gap:4px}
        .main{flex:1;margin-left:260px;min-width:0}
        .topbar{background:white;border-bottom:1px solid #e2e8f0;padding:12px 24px;display:flex;align-items:center;justify-content:space-between;gap:12px;position:sticky;top:0;z-index:10}
        .search{flex:1;max-width:420px;display:flex;align-items:center;background:#f1f5f9;border:1px solid #e2e8f0;border-radius:10px;padding:10px 14px;gap:8px}
        .search input{border:0;background:transparent;outline:none;width:100%;font-size:14px}
        .cards{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;padding:24px}
        .card{background:white;border:1px solid #e2e8f0;border-radius:16px;padding:20px;cursor:pointer;transition:.2s}
        .card:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.06)}
        .box{background:white;border:1px solid #e2e8f0;border-radius:16px;padding:20px}
        .grid2{display:grid;grid-template-columns:1.7fr 1fr;gap:16px;padding:0 24px 24px}
        .menuItem{padding:12px 14px;border-radius:10px;cursor:pointer;display:flex;gap:10px;align-items:center;font-size:14px;font-weight:500}
        .menuItem:hover{background:#1e293b;color:white}
        table{width:100%;border-collapse:collapse;font-size:13px}
        th{color:#64748b;font-weight:600;text-align:left;padding:12px;border-bottom:1px solid #e2e8f0;font-size:11px;text-transform:uppercase}
        td{padding:12px;border-bottom:1px solid #f1f5f9}
        .toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#0f172a;color:white;padding:12px 20px;border-radius:10px;font-size:13px;z-index:50}
        @media(max-width:900px){.cards{grid-template-columns:1fr 1fr}.grid2{grid-template-columns:1fr}.sidebar{display:none}.main{margin-left:0}}
      `}</style>

      <div className="layout">
        <Sidebar active={active} setActive={setActive} />
        <main className="main">
          <div className="topbar">
            <div style={{fontWeight:700}}>{active}</div>
            <div className="search"><span>🔍</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products, sales, customers..." /></div>
            <div style={{display:'flex',gap:16,alignItems:'center'}}>
              <div style={{position:'relative'}}><div onClick={()=>setShowNotif(!showNotif)} style={{cursor:'pointer'}}>🔔</div>{showNotif && <div style={{position:'absolute',right:0,top:36,width:280,background:'white',border:'1px solid #e2e8f0',borderRadius:12,padding:12,boxShadow:'0 10px 30px rgba(0,0,0,.1)',fontSize:12}}><b>Notifications</b><div style={{marginTop:8}}>⚠️ Milo 500g low (3 left)</div><div>✅ New sale ₦42k - Indomie</div></div>}</div>
              <div style={{display:'flex',gap:10,alignItems:'center',borderLeft:'1px solid #e2e8f0',paddingLeft:16}}><img src="https://i.pravatar.cc/100?img=33" style={{width:32,height:32,borderRadius:'50%'}}/><div><div style={{fontSize:13,fontWeight:600}}>Aisha Bello</div><div style={{fontSize:11,color:'#64748b'}}>Admin</div></div></div>
            </div>
          </div>

          {active==='Dashboard' && (
            <>
              <div className="cards">
                <div className="card"><div style={{fontSize:11,color:'#64748b',fontWeight:600}}>TOTAL SALES</div><div style={{fontSize:22,fontWeight:700,margin:'8px 0'}}>₦1,245,000</div><span style={{background:'#dcfce7',color:'#15803d',padding:'4px 8px',borderRadius:20,fontSize:11}}>+14.2% this week</span></div>
                <div className="card"><div style={{fontSize:11,color:'#64748b',fontWeight:600}}>PRODUCTS</div><div style={{fontSize:22,fontWeight:700,margin:'8px 0'}}>328</div><span style={{background:'#e0e7ff',color:'#4338ca',padding:'4px 8px',borderRadius:20,fontSize:11}}>18 categories</span></div>
                <div className="card"><div style={{fontSize:11,color:'#64748b',fontWeight:600}}>LOW STOCK</div><div style={{fontSize:22,fontWeight:700,margin:'8px 0'}}>12</div><span style={{background:'#fee2e2',color:'#b91c1c',padding:'4px 8px',borderRadius:20,fontSize:11}}>Needs restock</span></div>
                <div className="card"><div style={{fontSize:11,color:'#64748b',fontWeight:600}}>TODAY'S TRANSACTIONS</div><div style={{fontSize:22,fontWeight:700,margin:'8px 0'}}>86</div><span style={{background:'#f1f5f9',padding:'4px 8px',borderRadius:20,fontSize:11}}>₦184k today</span></div>
              </div>

              <div className="grid2">
                <div className="box"><h3 style={{marginBottom:16}}>Sales Overview</h3><ResponsiveContainer width="100%" height={260}><AreaChart data={salesData}><CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/><XAxis dataKey="name" tick={{fontSize:12}}/><YAxis tickFormatter={v=>`₦${v/1000}k`} tick={{fontSize:11}}/><Tooltip/><Area dataKey="sales" stroke="#4f46e5" fill="#e0e7ff" strokeWidth={2}/></AreaChart></ResponsiveContainer></div>
                
                <div className="box" style={{background:'#0f172a',color:'white',borderColor:'#0f172a'}}>
                  <h3 style={{marginBottom:8}}>✨ AI Insight</h3>
                  <p style={{fontSize:13,lineHeight:1.6,color:'#cbd5e1'}}>Peak Milk is selling faster than usual this week. Consider restocking within the next 2 days to avoid running out of stock. Demand up 28% vs last week.</p>
                  <button onClick={()=>showToast('AI restock order created')} style={{marginTop:16,background:'white',color:'#0f172a',border:0,padding:'8px 14px',borderRadius:8,fontSize:12,cursor:'pointer',fontWeight:600}}>Create Restock Order</button>
                </div>
              </div>

              <div style={{padding:'0 24px 24px'}}>
                <div className="box">
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:12}}><h3>Inventory Table</h3><span style={{fontSize:12,color:'#64748b'}}>{filtered.length} products</span></div>
                  <table>
                    <thead><tr><th>Product Name</th><th>Category</th><th>Stock Qty</th><th>Price</th><th>Stock Status</th><th>Action</th></tr></thead>
                    <tbody>{filtered.map(item=>{const s=getStatusColor(item.stock); return <tr key={item.id}><td style={{fontWeight:600}}>{item.product}</td><td>{item.category}</td><td>{item.stock}</td><td>₦{item.price.toLocaleString()}</td><td><span style={{background:s.bg,color:s.c,padding:'4px 10px',borderRadius:20,fontSize:11,fontWeight:600}}>{getStatus(item.stock)}</span></td><td><button onClick={()=>setInventory(inventory.map(x=>x.id===item.id?{...x,stock:x.stock+10}:x))} style={{border:'1px solid #e2e8f0',padding:'4px 8px',borderRadius:6,cursor:'pointer',fontSize:11}}>Restock +10</button></td></tr>})}</tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {active!=='Dashboard' && (
            <div style={{padding:24}}><div className="box" style={{textAlign:'center',padding:60}}><h2>{active}</h2><p style={{color:'#64748b',fontSize:13,marginTop:8}}>{active} module ready for backend integration.</p><button onClick={()=>setActive('Dashboard')} style={{marginTop:16,background:'#0f172a',color:'white',border:0,padding:'10px 16px',borderRadius:10,cursor:'pointer'}}>← Back to Dashboard</button></div></div>
          )}
        </main>
      </div>
      {toast && <div className="toast">✅ {toast}</div>}
    </>
  )
}
