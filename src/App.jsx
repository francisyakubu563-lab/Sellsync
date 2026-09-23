import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

const salesData = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 5000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 6890 },
  { name: 'Sat', sales: 4390 },
  { name: 'Sun', sales: 7490 },
]

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">SellSync</h1>
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">Live on Vercel</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <p className="text-gray-500 text-sm">Total Revenue</p>
            <p className="text-2xl font-bold mt-2">$24,780</p>
            <p className="text-green-600 text-sm mt-1">+12% from last week</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <p className="text-gray-500 text-sm">Orders</p>
            <p className="text-2xl font-bold mt-2">1,234</p>
            <p className="text-green-600 text-sm mt-1">+8% from last week</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <p className="text-gray-500 text-sm">Customers</p>
            <p className="text-2xl font-bold mt-2">892</p>
            <p className="text-blue-600 text-sm mt-1">Active now</p>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-lg font-semibold mb-6">Weekly Sales</h2>
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

export default App
