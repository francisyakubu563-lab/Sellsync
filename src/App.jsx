import { useState, useMemo } from 'react'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const salesData = [
  { name: 'Mon', sales: 180000 }, { name: 'Tue', sales: 220000 },
  { name: 'Wed', sales: 150000 }, { name: 'Thu', sales: 280000 },
  { name: 'Fri', sales: 320000 }, { name: 'Sat', sales: 410000 },
  { name: 'Sun', sales: 290000 },
]
const salesByCat = [{name:'Drinks',value:320},{name:'Noodles',value:280},{name:'Dairy',value:180},{name:'Hygiene',value:120}]

const initialInventory = [
  { id:1, product: 'Indomie Noodles (Box)', category: 'Noodles', stock: 2, price: 4200 },
  { id:2, product: 'Peak Milk 400g', category: 'Dairy', stock: 6, price: 1800 },
  { id:3, product: 'Dettol Antiseptic 500ml', category: 'Hygiene', stock: 4, price: 2500 },
  { id:4, product: 'Coca-Cola PET 50cl', category: 'Drinks', stock: 18, price: 300 },
  { id:5, product: 'Milo 500g', category: 'Beverages', stock: 3, price: 3500 },
]

const getStatus = (s) => s<=0? 'Out of Stock' : s<=5? 'Low Stock' : 'In Stock'
const getColor = (s) => s<=0? {bg:'#fee2e2',c:'#b91c1c'} : s<=5? {bg:'#fef3c7',c:'#92400e'} : {bg:'#dcfce7',c:'#15803d'}

export default function App() {
  const [active,setActive]=useState('Dashboard')
  const [search,setSearch]=useState('')
  const [showNotif,setShowNotif]=useState(false)
  const [toast,setToast]=useState('')
  const [inventory,setInventory]=useState(initialInventory)
  const [transactions]=useState([
    { id:'#TRX-8821', customer:'Tunde Ola', amount:42000, status:'Completed' },
    { id:'#TRX-8820', customer:'Blessing J.', amount:15500, status:'Completed' },
    { id:'#TRX-8819', customer:'Musa Ibrahim', amount:8300, status:'Pending' },
  ])

  const showToast=(m)=>{setToast(m); setTimeout(()=>setToast(''),2500)}
  const filtered=useMemo(()=>inventory.filter(i=>i.product.toLowerCase().includes(search.toLowerCase())),[search,inventory])
  const menu=[{id:'Dashboard',icon:'📊'},{id:'Sales',icon:'💳'},{id:'Inventory',icon:'📦'},{id:'Reports',icon:'📈'},{id:'AI Insights',icon:'✨'},{id:'Settings',icon:'⚙️'}]

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
       .search:focus-within{border-color:#4f46e5;background:white}
       .cards{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;padding:24px}
       .card{background:white;border:1px solid #e2e8f0;border-radius:16px;padding:20px;cursor:pointer;transition:.2s}
       .card:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.06)}
       .box{background:white;border:1px solid #e2e8f0;border-radius:16px;padding:20px}
       .grid2{display:grid;grid-template-columns:1.7fr 1fr;gap:16px;padding:0 24px 24px}
       .menuItem{padding:12px 14px;border-radius:10px;cursor:pointer;display:flex;gap:10px;align-items:center;font-size:14px;font-weight:500;transition:.2s}
       .menuItem:hover{background:#1e293b;color:white}
        table{width:100%;border-collapse:collapse;font-size:13px}
        th{color:#64748b;font-weight:600;text-align:left;padding:12px;border-bottom:1px solid #e2e8f0;font-size:11px;text-transform:uppercase}
        td{padding:12px;border-bottom:1px solid #f1f5f9}
       .btn{background:#0f172a;color:white;border:0;padding:10px 16px;border-radius:10px;font-size:13px;cursor:pointer}
       .btn:hover{background:#1e293b}
       .toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#0f172a;color:white;padding:12px 20px;border-radius:10px;font-size:13px;z-index:50}
        @media(max-width:900px){.cards{grid-template-columns:1fr 1fr}.grid2{grid-template-columns:1fr}.sidebar{display:none}.main{margin-left:0}}
      `}</style>

      <div className="layout">
        <aside className="sidebar">
          <h1 style={{fontSize:22,fontWeight:700,marginBottom:28}}>SellSync</h1>
          {menu.map(m=><div key={m.id} onClick={()=>setActive(m.id)} className="menuItem" style={{background:active===m.id?'#1e293b':'transparent',color:active===m.id?'white':'#94a3b8',border:active===m.id?'1px solid #334155':'1px solid transparent'}}><span>{m.icon}</span>{m.id}</div>)}
          <div style={{marginTop:'auto',background:'#1e293b',padding:12,borderRadius:10,fontSize:11,color:'#94a3b8'}}>AI: Saturday will be peak sales</div>
        </aside>

        <main className="main">
          <div className="topbar">
            <div style={{fontWeight:700}}>{active}</div>
            <div className="search"><span>🔍</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products, sales, customers..." /></div>
            <div style={{display:'flex',gap:16,alignItems:'center'}}>
              <div style={{position:'relative'}}><div onClick={()=>setShowNotif(!showNotif)} style={{cursor:'pointer'}}>🔔</div>{showNotif && <div style={{position:'absolute',right:0,top:36,width:280,background:'white',border:'1px solid #e2e8f0',borderRadius:12,padding:12,boxShadow:'0 10px 30px rgba(0,0,0,.1)',fontSize:12}}><b>Notifications</b><div style={{marginTop:8}}>⚠️ Dettol low (4 left)</div><div>✅ ₦42k sale - Indomie</div></div>}</div>
              <div style={{display:'flex',gap:10,alignItems:'center',borderLeft:'1px solid #e2e8f0',paddingLeft:16}}><img src="https://i.pravatar.cc/100?img=33" style={{width:32,height:32,borderRadius:'50%'}}/><div><div style={{fontSize:13,fontWeight:600}}>Aisha Bello</div><div style={{fontSize:11,color:'#64748b'}}>Admin</div></div></div>
            </div>
          </div>

          {active==='Dashboard' && (
            <>
              <div className="cards">
                <div className="card" onClick={()=>setActive('Sales')}><div style={{fontSize:11,color:'#64748b',fontWeight:600}}>TOTAL SALES</div><div style={{fontSize:22,fontWeight:700,margin:'8px 0'}}>₦1,245,000</div><span style={{background:'#dcfce7',color:'#15803d',padding:'4px 8px',borderRadius:20,fontSize:11}}>+14.2% this week</span></div>
                <div className="card" onClick={()=>setActive('Inventory')}><div style={{fontSize:11,color:'#64748b',fontWeight:600}}>PRODUCTS</div><div style={{fontSize:22,fontWeight:700,margin:'8px 0'}}>328</div><span style={{background:'#e0e7ff',color:'#4338ca',padding:'4px 8px',borderRadius:20,fontSize:11}}>18 categories</span></div>
                <div className="card" onClick={()=>setActive('Inventory')}><div style={{fontSize:11,color:'#64748b',fontWeight:600}}>LOW STOCK</div><div style={{fontSize:22,fontWeight:700,margin:'8px 0'}}>12</div><span style={{background:'#fee2e2',color:'#b91c1c',padding:'4px 8px',borderRadius:20,fontSize:11}}>Needs restock</span></div>
                <div className="card" onClick={()=>setActive('Sales')}><div style={{fontSize:11,color:'#64748b',fontWeight:600}}>TODAY'S TRANSACTIONS</div><div style={{fontSize:22,fontWeight:700,margin:'8px 0'}}>86</div><span style={{background:'#f1f5f9',padding:'4px 8px',borderRadius:20,fontSize:11}}>₦184k today</span></div>
              </div>
              <div className="grid2">
                <div className="box"><h3 style={{marginBottom:16}}>Sales Overview</h3><ResponsiveContainer width="100%" height={260}><AreaChart data={salesData}><CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/><XAxis dataKey="name" tick={{fontSize:12}}/><YAxis tickFormatter={v=>`₦${v/1000}k`} tick={{fontSize:11}}/><Tooltip/><Area dataKey="sales" stroke="#4f46e5" fill="#e0e7ff" strokeWidth={2}/></AreaChart></ResponsiveContainer></div>
                <div className="box" style={{background:'#0f172a',color:'white'}}><h3 style={{marginBottom:8}}>✨ AI Insight</h3><p style={{fontSize:13,lineHeight:1.6,color:'#cbd5e1'}}>Peak Milk is selling faster than usual this week. Consider restocking within the next 2 days to avoid running out of stock.</p><button onClick={()=>showToast('Restock order created for Peak Milk')} style={{marginTop:16,background:'white',color:'#0f172a',border:0,padding:'8px 14px',borderRadius:8,fontSize:12,cursor:'pointer',fontWeight:600}}>Create Restock Order</button></div>
              </div>
              <div style={{padding:'0 24px 24px'}}><div className="box"><h3 style={{marginBottom:12}}>Inventory Table</h3><table><thead><tr><th>Product Name</th><th>Category</th><th>Stock Qty</th><th>Price</th><th>Stock Status</th><th>Action</th></tr></thead><tbody>{filtered.map(item=>{const c=getColor(item.stock); return <tr key={item.id}><td style={{fontWeight:600}}>{item.product}</td><td>{item.category}</td><td>{item.stock}</td><td>₦{item.price.toLocaleString()}</td><td><span style={{background:c.bg,color:c.c,padding:'4px 10px',borderRadius:20,fontSize:11,fontWeight:600}}>{getStatus(item.stock)}</span></td><td><button onClick={()=>{setInventory(inventory.map(x=>x.id===item.id?{...x,stock:x.stock+10}:x)); showToast(`${item.product} +10`);}} style={{border:'1px solid #e2e8f0',padding:'4px 8px',borderRadius:6,cursor:'pointer',fontSize:11}}>Restock</button></td></tr>})}</tbody></table></div></div>
            </>
          )}

          {active==='Sales' && <div style={{padding:24}}><div className="box"><h3 style={{marginBottom:16}}>Sales - Recent Transactions</h3><table><thead><tr><th>ID</th><th>Customer</th><th>Amount</th><th>Status</th><th>Action</th></tr></thead><tbody>{transactions.map(t=><tr key={t.id}><td>{t.id}</td><td>{t.customer}</td><td>₦{t.amount.toLocaleString()}</td><td><span style={{background:t.status==='Completed'?'#dcfce7':'#fef3c7',padding:'4px 8px',borderRadius:20,fontSize:11}}>{t.status}</span></td><td><button onClick={()=>showToast(`Viewing ${t.id}`)} style={{border:0,background:'#f1f5f9',padding:'6px 10px',borderRadius:6,cursor:'pointer'}}>View</button></td></tr>)}</tbody></table></div></div>}

          {active==='Inventory' && <div style={{padding:24}}><div className="box"><div style={{display:'flex',justifyContent:'space-between',marginBottom:16}}><h3>Full Inventory ({filtered.length})</h3><button className="btn" onClick={()=>{const n=prompt('Product name?'); if(n) setInventory([...inventory,{id:Date.now(),product:n,category:'New',stock:10,price:1000}])}}>+ Add Product</button></div><table><thead><tr><th>Product Name</th><th>Category</th><th>Stock Qty</th><th>Price</th><th>Stock Status</th><th>Actions</th></tr></thead><tbody>{filtered.map(i=>{const c=getColor(i.stock); return <tr key={i.id}><td style={{fontWeight:600}}>{i.product}</td><td>{i.category}</td><td>{i.stock}</td><td>₦{i.price.toLocaleString()}</td><td><span style={{background:c.bg,color:c.c,padding:'4px 10px',borderRadius:20,fontSize:11}}>{getStatus(i.stock)}</span></td><td><button onClick={()=>setInventory(inventory.map(x=>x.id===i.id?{...x,stock:x.stock+1}:x))} style={{marginRight:6,padding:'4px 8px',borderRadius:6,cursor:'pointer'}}> +1 </button><button onClick={()=>setInventory(inventory.filter(x=>x.id!==i.id))} style={{padding:'4px 8px',borderRadius:6,cursor:'pointer',border:'1px solid #fee2e2',color:'#b91c1c'}}>Delete</button></td></tr>})}</tbody></table></div></div>}

          {active==='Reports' && <div style={{padding:24}}><div className="box"><h3 style={{marginBottom:16}}>Sales by Category</h3><ResponsiveContainer width="100%" height={300}><BarChart data={salesByCat}><CartesianGrid stroke="#f1f5f9"/><XAxis dataKey="name"/><YAxis/><Tooltip/><Bar dataKey="value" fill="#4f46e5" radius={[8,8,0,0]}/></BarChart></ResponsiveContainer><button className="btn" style={{marginTop:16}} onClick={()=>showToast('Report downloaded')}>Download Report</button></div></div>}

          {active==='AI Insights' && <div style={{padding:24}}><div className="box"><h3>✨ AI Predictions</h3><div style={{marginTop:16,display:'grid',gap:12}}><div style={{background:'#f0fdf4',padding:16,borderRadius:12,border:'1px solid #bbf7d0'}}><b>High Demand:</b> Indomie & Coke will spike this weekend (+32%)</div><div style={{background:'#eff6ff',padding:16,borderRadius:12,border:'1px solid #bfdbfe'}}><b>Restock:</b> Order 50 units of Dettol before Friday</div><div style={{background:'#fefce8',padding:16,borderRadius:12,border:'1px solid #fde68a'}}><b>Trend:</b> Evening sales up 18%</div></div></div></div>}

          {active==='Settings' && <div style={{padding:24}}><div className="box" style={{maxWidth:500}}><h3 style={{marginBottom:16}}>Store Settings</h3><label style={{fontSize:12,fontWeight:600}}>Store Name</label><input defaultValue="SellSync Retail" style={{width:'100%',padding:10,border:'1px solid #e2e8f0',borderRadius:8,margin:'6px 0 12px'}}/><button className="btn" style={{width:'100%'}} onClick={()=>showToast('Settings saved')}>Save Changes</button></div></div>}
        </main>
      </div>
      {toast && <div className="toast">✅ {toast}</div>}
    </>
  )
}
