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
  const [showMenu,setShowMenu]=useState(false)
  const [toast,setToast]=useState('')
  const [inventory,setInventory]=useState(initialInventory)
  const transactions = [
    { id:'#TRX-8821', customer:'Tunde Ola', amount:42000, status:'Completed' },
    { id:'#TRX-8820', customer:'Blessing J.', amount:15500, status:'Completed' },
    { id:'#TRX-8819', customer:'Musa Ibrahim', amount:8300, status:'Pending' },
  ]

  const showToast=(m)=>{setToast(m); setTimeout(()=>setToast(''),2000)}

  // FIXED SEARCH LOGIC
  const filteredInventory = useMemo(()=>{
    if(!search.trim()) return inventory
    return inventory.filter(i=>
      i.product.toLowerCase().includes(search.toLowerCase()) ||
      i.category.toLowerCase().includes(search.toLowerCase())
    )
  },[search, inventory])

  const filteredTransactions = useMemo(()=>{
    if(!search.trim()) return transactions
    return transactions.filter(t=>
      t.customer.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase())
    )
  },[search])

  const menu=[{id:'Dashboard',icon:'📊'},{id:'Sales',icon:'💳'},{id:'Inventory',icon:'📦'},{id:'Reports',icon:'📈'},{id:'AI Insights',icon:'✨'},{id:'Settings',icon:'⚙️'}]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        *{margin:0;padding:0;box-sizing:border-box;font-family:Inter,sans-serif}
       .layout{display:flex;min-height:100vh;background:#f6f7fb}
       .sidebar{width:260px;background:#0f172a;color:white;padding:24px 16px;position:fixed;height:100vh;z-index:30;display:flex;flex-direction:column;gap:4px;transition:.3s}
       .overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:25;display:none}
       .overlay.open{display:block}
       .main{flex:1;margin-left:260px;min-width:0}
       .topbar{background:white;border-bottom:1px solid #e2e8f0;padding:12px 16px;display:flex;align-items:center;justify-content:space-between;gap:10px;position:sticky;top:0;z-index:20}
       .searchBox{flex:1;max-width:420px;display:flex;align-items:center;background:#f1f5f9;border:1px solid #e2e8f0;border-radius:10px;padding:10px 14px;gap:8px}
       .searchBox input{border:0;background:transparent;outline:none;width:100%;font-size:14px}
       .searchBox:focus-within{border-color:#4f46e5;background:white}
       .cards{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;padding:16px}
       .card{background:white;border:1px solid #e2e8f0;border-radius:16px;padding:20px;cursor:pointer}
       .box{background:white;border:1px solid #e2e8f0;border-radius:16px;padding:16px;overflow-x:auto}
       .grid2{display:grid;grid-template-columns:1.7fr 1fr;gap:16px;padding:0 16px 16px}
       .menuItem{padding:12px 14px;border-radius:10px;cursor:pointer;display:flex;gap:10px;align-items:center;font-size:14px}
       .hamburger{display:none;font-size:22px;cursor:pointer;padding:6px 10px;border-radius:8px;background:#f1f5f9}
        table{width:100%;border-collapse:collapse;font-size:13px;min-width:500px}
        th{color:#64748b;font-weight:600;text-align:left;padding:12px;border-bottom:1px solid #e2e8f0;font-size:11px;text-transform:uppercase}
        td{padding:12px;border-bottom:1px solid #f1f5f9}
       .btn{background:#0f172a;color:white;border:0;padding:10px 16px;border-radius:10px;font-size:13px;cursor:pointer}
       .toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#0f172a;color:white;padding:12px 20px;border-radius:10px;font-size:13px;z-index:50}
       .noResult{padding:24px;text-align:center;color:#64748b;font-size:13px}
        @media(max-width:900px){
         .cards{grid-template-columns:1fr 1fr}
         .grid2{grid-template-columns:1fr}
         .sidebar{transform:translateX(-100%)}
         .sidebar.open{transform:translateX(0)}
         .main{margin-left:0}
         .hamburger{display:block}
         .hideOnMobile{display:none}
        }
        @media(min-width:901px){.showOnMobile{display:none} }
      `}</style>

      <div className="layout">
        <div className={`overlay ${showMenu?'open':''}`} onClick={()=>setShowMenu(false)}></div>
        <aside className={`sidebar ${showMenu?'open':''}`}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:28}}><h1 style={{fontSize:22,fontWeight:700}}>SellSync</h1><span onClick={()=>setShowMenu(false)} style={{cursor:'pointer',fontSize:20}}>✕</span></div>
          {menu.map(m=><div key={m.id} onClick={()=>{setActive(m.id); setSearch(''); setShowMenu(false)}} className="menuItem" style={{background:active===m.id?'#1e293b':'transparent',color:active===m.id?'white':'#94a3b8'}}><span>{m.icon}</span>{m.id}</div>)}
          <div style={{marginTop:'auto',background:'#1e293b',padding:12,borderRadius:10,fontSize:11,color:'#94a3b8'}}>🔍 Try search: "Dettol", "Milk", "Coke"</div>
        </aside>

        <main className="main">
          <div className="topbar">
            <div style={{display:'flex',alignItems:'center',gap:10}}><span className="hamburger" onClick={()=>setShowMenu(true)}>☰</span><b>{active}</b></div>
            <div className="searchBox hideOnMobile"><span>🔍</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products, categories, customers..." /></div>
            <img src="https://i.pravatar.cc/100?img=33" style={{width:32,height:32,borderRadius:'50%'}}/>
          </div>

          <div className="showOnMobile" style={{padding:'12px 16px',background:'white',borderBottom:'1px solid #e2e8f0'}}>
            <div className="searchBox" style={{maxWidth:'100%'}}><span>🔍</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..." /></div>
            {search && <div style={{fontSize:11,marginTop:8,color:'#4f46e5'}}>{active==='Sales'? `${filteredTransactions.length} results` : `${filteredInventory.length} results`} for "{search}" • <span onClick={()=>setSearch('')} style={{textDecoration:'underline',cursor:'pointer'}}>clear</span></div>}
          </div>

          {active==='Dashboard' && (
            <>
              <div className="cards">
                <div className="card"><div style={{fontSize:11,color:'#64748b'}}>TOTAL SALES</div><div style={{fontSize:22,fontWeight:700,margin:'8px 0'}}>₦1,245,000</div><span style={{background:'#dcfce7',color:'#15803d',padding:'4px 8px',borderRadius:20,fontSize:11}}>+14.2% this week</span></div>
                <div className="card"><div style={{fontSize:11,color:'#64748b'}}>PRODUCTS</div><div style={{fontSize:22,fontWeight:700,margin:'8px 0'}}>328</div><span style={{background:'#e0e7ff',color:'#4338ca',padding:'4px 8px',borderRadius:20,fontSize:11}}>18 categories</span></div>
                <div className="card"><div style={{fontSize:11,color:'#64748b'}}>LOW STOCK</div><div style={{fontSize:22,fontWeight:700,margin:'8px 0'}}>12</div><span style={{background:'#fee2e2',color:'#b91c1c',padding:'4px 8px',borderRadius:20,fontSize:11}}>Needs restock</span></div>
                <div className="card"><div style={{fontSize:11,color:'#64748b'}}>TODAY'S TRANSACTIONS</div><div style={{fontSize:22,fontWeight:700,margin:'8px 0'}}>86</div><span style={{background:'#f1f5f9',padding:'4px 8px',borderRadius:20,fontSize:11}}>₦184k today</span></div>
              </div>
              <div className="grid2">
                <div className="box"><h3 style={{marginBottom:16}}>Sales Overview</h3><ResponsiveContainer width="100%" height={260}><AreaChart data={salesData}><CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/><XAxis dataKey="name" tick={{fontSize:12}}/><YAxis tickFormatter={v=>`₦${v/1000}k`} tick={{fontSize:11}}/><Tooltip/><Area dataKey="sales" stroke="#4f46e5" fill="#e0e7ff" strokeWidth={2}/></AreaChart></ResponsiveContainer></div>
                <div className="box" style={{background:'#0f172a',color:'white'}}><h3 style={{marginBottom:8}}>✨ AI Insight</h3><p style={{fontSize:13,lineHeight:1.6,color:'#cbd5e1'}}>Peak Milk is selling faster than usual this week. Consider restocking within the next 2 days to avoid running out of stock.</p></div>
              </div>
              <div style={{padding:'0 16px 16px'}}>
                <div className="box">
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}><h3>Inventory Table</h3>{search && <span style={{fontSize:12,color:'#4f46e5'}}>{filteredInventory.length} found • <span onClick={()=>setSearch('')} style={{cursor:'pointer',textDecoration:'underline'}}>clear</span></span>}</div>
                  {filteredInventory.length===0? <div className="noResult">No product found for "{search}" — try "Dettol", "Milk", "Indomie", "Coke"</div> :
                  <table><thead><tr><th>Product Name</th><th>Category</th><th>Stock Qty</th><th>Price</th><th>Stock Status</th><th>Action</th></tr></thead><tbody>{filteredInventory.map(item=>{const c=getColor(item.stock); return <tr key={item.id}><td style={{fontWeight:600}}>{item.product}</td><td>{item.category}</td><td>{item.stock}</td><td>₦{item.price.toLocaleString()}</td><td><span style={{background:c.bg,color:c.c,padding:'4px 10px',borderRadius:20,fontSize:11,fontWeight:600}}>{getStatus(item.stock)}</span></td><td><button onClick={()=>{setInventory(inventory.map(x=>x.id===item.id?{...x,stock:x.stock+10}:x)); showToast(`${item.product} restocked`)}} style={{border:'1px solid #e2e8f0',padding:'4px 8px',borderRadius:6,cursor:'pointer',fontSize:11}}>Restock</button></td></tr>})}</tbody></table>}
                </div>
              </div>
            </>
          )}

          {active==='Sales' && <div style={{padding:16}}><div className="box"><h3 style={{marginBottom:12}}>Sales {search && `- ${filteredTransactions.length} results for "${search}"`}</h3>{filteredTransactions.length===0? <div className="noResult">No customer found for "{search}"</div> : <table><thead><tr><th>ID</th><th>Customer</th><th>Amount</th><th>Status</th></tr></thead><tbody>{filteredTransactions.map(t=><tr key={t.id}><td>{t.id}</td><td>{t.customer}</td><td>₦{t.amount.toLocaleString()}</td><td>{t.status}</td></tr>)}</tbody></table>}</div></div>}

          {active==='Inventory' && <div style={{padding:16}}><div className="box"><h3>Inventory ({filteredInventory.length})</h3>{filteredInventory.length===0? <div className="noResult">No results for "{search}"</div> : <table><thead><tr><th>Product Name</th><th>Category</th><th>Stock Qty</th><th>Price</th><th>Stock Status</th></tr></thead><tbody>{filteredInventory.map(i=>{const c=getColor(i.stock); return <tr key={i.id}><td>{i.product}</td><td>{i.category}</td><td>{i.stock}</td><td>₦{i.price.toLocaleString()}</td><td><span style={{background:c.bg,color:c.c,padding:'4px 10px',borderRadius:20,fontSize:11}}>{getStatus(i.stock)}</span></td></tr>})}</tbody></table>}</div></div>}

          {active==='Reports' && <div style={{padding:16}}><div className="box"><h3>Sales by Category</h3><ResponsiveContainer width="100%" height={300}><BarChart data={salesByCat}><CartesianGrid stroke="#f1f5f9"/><XAxis dataKey="name"/><YAxis/><Tooltip/><Bar dataKey="value" fill="#4f46e5" radius={[8,8,0,0]}/></BarChart></ResponsiveContainer></div></div>}
          {active==='AI Insights' && <div style={{padding:16}}><div className="box" style={{background:'#f0fdf4'}}>AI: Indomie & Coke will spike this weekend +32%</div></div>}
          {active==='Settings' && <div style={{padding:16}}><div className="box"><h3>Settings</h3><button className="btn" onClick={()=>showToast('Saved')}>Save</button></div></div>}
        </main>
      </div>
      {toast && <div className="toast">✅ {toast}</div>}
    </>
  )
}
