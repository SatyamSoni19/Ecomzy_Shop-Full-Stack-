import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardData } from '../routes/slices/adminSlice';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { dashboard, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
        <div className="w-12 h-12 border-4 border-[#10B981] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] text-red-500">
        <p>Error loading dashboard: {error}</p>
      </div>
    );
  }

  if (!dashboard) return null;

  const { metrics, mostAddedToCart, mostFavorited, highestViewed, charts } = dashboard;
  
  // Professional analytics color palette
  const COLORS = ['#10B981', '#3B82F6', '#06B6D4', '#8B5CF6', '#EC4899', '#F59E0B', '#EF4444', '#84CC16', '#F97316'];

  // Sort categories by size descending
  const sortedCategories = [...charts.categoryDistribution].sort((a, b) => b.value - a.value);
  const totalCategoryValue = sortedCategories.reduce((acc, curr) => acc + curr.value, 0);

  // Custom Tooltip for Donut Chart
  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = totalCategoryValue > 0 ? ((data.value / totalCategoryValue) * 100).toFixed(1) : 0;
      return (
        <div className="bg-[#111111]/95 border border-[#262626] p-3 rounded-lg shadow-xl backdrop-blur-md transition-all duration-200">
          <p className="text-sm font-semibold text-white mb-2 capitalize">{data.name}</p>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: payload[0].payload.fill }}></div>
            <p className="text-xs text-[#A1A1AA]">
              Activity: <span className="text-white font-medium">{data.value}</span>
            </p>
            <p className="text-[10px] text-white/70 font-medium ml-1 bg-white/10 px-1.5 py-0.5 rounded">
              {percentage}%
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FFFFFF] p-6 lg:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#FFFFFF]">Admin Dashboard</h1>
          <p className="text-[#A1A1AA] mt-1">Overview of your store's performance and analytics.</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard title="Total Users" value={metrics.totalUsers} subtitle={`${metrics.newUsersThisMonth} new this month`} />
          <MetricCard title="Total Products" value={metrics.totalProducts} subtitle="Active catalog items" />
          <MetricCard title="Total Activity" value={metrics.totalCartAdds + metrics.totalFavouriteAdds} subtitle="Carts & Favorites" />
          <MetricCard title="Top Category" value={metrics.mostPopularCategory} subtitle="By engagement" />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Growth Line Chart */}
          <div className="bg-[#111111] border border-[#262626] rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-6">User Growth</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={charts.userGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                  <XAxis dataKey="name" stroke="#A1A1AA" />
                  <YAxis stroke="#A1A1AA" />
                  <Tooltip contentStyle={{ backgroundColor: '#111111', borderColor: '#262626' }} />
                  <Line type="monotone" dataKey="users" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Distribution Pie Chart */}
          <div className="bg-[#111111] border border-[#262626] rounded-xl p-6 shadow-sm flex flex-col">
            <h3 className="text-lg font-semibold mb-2">Category Distribution</h3>
            <div className="h-80 relative flex-1">
              {/* Center Donut Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{ paddingBottom: '36px' }}>
                <span className="text-3xl font-bold text-white drop-shadow-md">{metrics.totalProducts}</span>
                <span className="text-[10px] font-medium tracking-wider text-[#A1A1AA] uppercase mt-1">Products</span>
              </div>

              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sortedCategories}
                    cx="50%"
                    cy="50%"
                    innerRadius={85}
                    outerRadius={115}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                    animationBegin={0}
                    animationDuration={800}
                  >
                    {sortedCategories.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                        className="hover:opacity-80 hover:scale-[1.02] transition-all duration-300 origin-center cursor-pointer outline-none" 
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomPieTooltip />} />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36} 
                    iconType="circle"
                    wrapperStyle={{ fontSize: '12px', color: '#A1A1AA', paddingTop: '20px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Top Products Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ProductList title="Most Added to Cart" products={mostAddedToCart} statKey="cartCount" statLabel="Carts" />
          <ProductList title="Most Favorited" products={mostFavorited} statKey="likesCount" statLabel="Likes" />
          <ProductList title="Most Viewed" products={highestViewed} statKey="viewCount" statLabel="Views" />
        </div>

      </div>
    </div>
  );
};

// Reusable Metric Card Component
const MetricCard = ({ title, value, subtitle }) => (
  <div className="bg-[#111111] border border-[#262626] rounded-xl p-6 shadow-sm flex flex-col justify-between">
    <h3 className="text-[#A1A1AA] text-sm font-medium">{title}</h3>
    <div className="mt-4">
      <p className="text-3xl font-bold text-[#FFFFFF]">{value}</p>
      {subtitle && <p className="text-xs text-[#10B981] mt-2">{subtitle}</p>}
    </div>
  </div>
);

// Reusable Product List Component
const ProductList = ({ title, products, statKey, statLabel }) => (
  <div className="bg-[#111111] border border-[#262626] rounded-xl p-6 shadow-sm">
    <h3 className="text-lg font-semibold mb-4 border-b border-[#262626] pb-2">{title}</h3>
    <div className="space-y-4">
      {products.length === 0 ? (
        <p className="text-[#A1A1AA] text-sm text-center py-4">No data available</p>
      ) : (
        products.map((product, idx) => (
          <div key={product.productId} className="flex justify-between items-center group">
            <div className="flex items-center gap-3 overflow-hidden">
              <span className="text-[#A1A1AA] text-sm font-mono w-4">{idx + 1}.</span>
              <p className="text-sm font-medium text-[#FFFFFF] truncate max-w-[160px] group-hover:text-[#10B981] transition-colors">{product.title}</p>
            </div>
            <div className="text-xs font-semibold bg-[#262626] px-2 py-1 rounded text-[#6EE7B7]">
              {product[statKey]} {statLabel}
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);

export default AdminDashboard;
