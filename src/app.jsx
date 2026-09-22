import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { LayoutDashboard, ShoppingCart, Package, TrendingUp, Users, Menu, Search, Bell, LogOut, ChevronDown } from 'lucide-react'

const salesData = [
  { name: 'Jan', sales: 4000 }, { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 }, { name: 'Apr', sales: 2780 },
  { name: 'May', sales: 1890 }, { name: 'Jun', sales: 4390 },
]
const pieData = [{ name: 'Electronics', value: 400 }, { name: 'Fashion', value: 300 }, { name: 'Food', value: 200 }]
const COLORS = ['#6366f1', '#22c55e', '#f59e0b']
const orders = [
  { id: '#10234', customer: 'Amara Okafor', amount: '₦45,000', status: 'Completed' },
  { id: '#10233', customer: 'John Musa', amount: '₦12,500', status: 'Pending' },
  { id: '#10232', customer: 'Chioma Eze', amount: '₦89,000', status: 'Failed' },
  { id: '#10231', customer: 'David Smith', amount: '₦23,000', status: 'Completed' },
]

export default function App() {
  const [open, setOpen] = useState(true)
  return (
    <div className="layout">
      <aside style={{width: open ? '260px' : '0', background:'#111827', color:'white', position:'fixed', height:'100vh', overflow:'hidden', transition:'.3s', zIndex:20, borderRight:'1px solid #1f2937'}}>
        <div style={{padding:'22px', display: open ? 'block' : 'none'}}>
          <h2 style={{display:'flex', alignItems:'center', gap:'8px', fontSize:'20px'}}><div style={{width:'32px', height:'32px', background:'#6366f1', borderRadius:'8px', display:'grid', placeItems:'center'}}>S</div> SellSync</h2>
          <div style={{marginTop:'30px', display:'flex', flexDirection:'column', gap:'6px'}}>
            {[
              {icon: LayoutDashboard, label:'Dashboard', active:true},
              {icon: ShoppingCart, label:'Orders'},
              {icon: Package, label:'Products'},
              {icon: Users, label:'Customers'},
              {icon: TrendingUp, label:'Analytics'},
            ].map(item=>(
              <div key={item.label} style={{display:'flex', alignItems:'center', gap:'10px', padding:'10px 12px', borderRadius:'10px', background: item.active ? '#1f2937' : 'transparent', color: item.active ? 'white' : '#9ca3af', cursor:'pointer'}}>
                <item.icon size={18}/> {item.label}
              </div>
            ))}
          </div>
          <div style={{position:'absolute', bottom:'20px', left:'22px', right:'22px', display:'flex', alignItems:'center', gap:'10px', color:'#9ca3af', cursor:'pointer'}}><LogOut size={18}/> Logout</div>
        </div>
      </aside>

      <div className="main">
        <div className="topbar">
          <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
            <Menu style={{cursor:'pointer'}} onClick={()=>setOpen(!open)}/>
            <div className="search"><Search size={16}/><input placeholder="Search orders, products..."/></div>
          </div>
          <div style={{display:'flex', alignItems:'center', gap:'16px'}}>
            <Bell size={20}/>
            <div style={{display:'flex', alignItems:'center', gap:'8px'}}><div style={{width:'32px', height:'32px', background:'#e2e8f0', borderRadius:'50%'}}></div><span style={{fontSize:'14px', fontWeight:600}}>Admin</span><ChevronDown size={14}/></div>
          </div>
        </div>

        <div style={{padding:'24px'}}>
          <div className="summary">
            <div className="card"><p style={{color:'#64748b', fontSize:'13px'}}>Total Revenue</p><h2 style={{margin:'8px 0'}}>₦1,250,000</h2><span style={{color:'#22c55e', fontSize:'12px'}}>↑ 12% vs last month</span></div>
            <div className="card"><p style={{color:'#64748b', fontSize:'13px'}}>Total Orders</p><h2 style={{margin:'8px 0'}}>1,432</h2><span style={{color:'#22c55e', fontSize:'12px'}}>↑ 8% vs last month</span></div>
            <div className="card"><p style={{color:'#64748b', fontSize:'13px'}}>Products</p><h2 style={{margin:'8px 0'}}>326</h2><span style={{color:'#ef4444', fontSize:'12px'}}>↓ 2% vs last month</span></div>
            <div className="card"><p style={{color:'#64748b', fontSize:'13px'}}>Customers</p><h2 style={{margin:'8px 0'}}>892</h2><span style={{color:'#22c55e', fontSize:'12px'}}>↑ 15% vs last month</span></div>
          </div>

          <div className="grid2">
            <div className="card">
              <h3 style={{marginBottom:'16px'}}>Sales Overview</h3>
              <div style={{height:'280px'}}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}><XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12}/><YAxis axisLine={false} tickLine={false} fontSize={12}/><Tooltip/><Bar dataKey="sales" fill="#6366f1" radius={[8,8,0,0]}/></BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="card">
              <h3 style={{marginBottom:'16px'}}>By Category</h3>
              <div style={{height:'280px'}}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart><Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value">{pieData.map((e,i)=><Cell key={i} fill={COLORS[i%COLORS.length]}/>)}</Pie><Tooltip/></PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="card" style={{marginTop:'16px'}}>
            <h3 style={{marginBottom:'12px'}}>Recent Orders</h3>
            <div style={{overflowX:'auto'}}>
              <table><thead><tr><th>Order ID</th><th>Customer</th><th>Amount</th><th>Status</th></tr></thead>
              <tbody>{orders.map(o=><tr key={o.id}><td style={{fontWeight:600}}>{o.id}</td><td>{o.customer}</td><td>{o.amount}</td><td><span className={`badge ${o.status==='Completed'?'ok':o.status==='Pending'?'warn':'bad'}`}>{o.status}</span></td></tr>)}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
