import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const salesData = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 5000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 6890 },
  { name: 'Sat', sales: 4390 },
  { name: 'Sun', sales: 7490 },
]

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '24px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>SellSync</h1>
          <span style={{ background: '#dcfce7', color: '#15803d', padding: '6px 12px', borderRadius: '20px', fontSize: '13px' }}>● Live on Vercel</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <p style={{ color: '#64748b', fontSize: '13px' }}>Total Revenue</p>
            <p style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '8px' }}>$24,780</p>
            <p style={{ color: '#16a34a', fontSize: '12px', marginTop: '4px' }}>↑ 12% from last week</p>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <p style={{ color: '#64748b', fontSize: '13px' }}>Orders</p>
            <p style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '8px' }}>1,234</p>
            <p style={{ color: '#16a34a', fontSize: '12px', marginTop: '4px' }}>↑ 8% from last week</p>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <p style={{ color: '#64748b', fontSize: '13px' }}>Customers</p>
            <p style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '8px' }}>892</p>
            <p style={{ color: '#2563eb', fontSize: '12px', marginTop: '4px' }}>Active now</p>
          </div>
        </div>

        <div style={{ background: 'white', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Weekly Sales</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#4F46E5" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  )
}
