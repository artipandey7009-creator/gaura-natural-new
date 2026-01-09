import { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, ShoppingCart, Users, DollarSign } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const AdminDashboard = () => {
  const { token } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API}/admin/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-bold text-foreground mb-8" data-testid="admin-dashboard-title">Admin Dashboard</h1>

        {/* Quick Links */}
        <div className="flex gap-4 mb-8">
          <Link to="/admin/products">
            <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90" data-testid="manage-products-link">
              Manage Products
            </button>
          </Link>
          <Link to="/admin/orders">
            <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90" data-testid="manage-orders-link">
              Manage Orders
            </button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Products</p>
                <p className="text-3xl font-bold" data-testid="total-products">{stats?.total_products || 0}</p>
              </div>
              <Package className="h-12 w-12 text-primary" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
                <p className="text-3xl font-bold" data-testid="total-orders">{stats?.total_orders || 0}</p>
              </div>
              <ShoppingCart className="h-12 w-12 text-primary" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Users</p>
                <p className="text-3xl font-bold" data-testid="total-users">{stats?.total_users || 0}</p>
              </div>
              <Users className="h-12 w-12 text-primary" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
                <p className="text-3xl font-bold" data-testid="total-revenue">${stats?.total_revenue?.toFixed(2) || '0.00'}</p>
              </div>
              <DollarSign className="h-12 w-12 text-primary" />
            </div>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card className="p-6">
          <h2 className="text-2xl font-serif font-bold mb-6">Recent Orders</h2>
          <div className="space-y-4">
            {stats?.recent_orders?.length === 0 ? (
              <p className="text-muted-foreground">No orders yet</p>
            ) : (
              stats?.recent_orders?.map((order) => (
                <div key={order.id} className="flex items-center justify-between border-b border-border pb-4">
                  <div>
                    <p className="font-semibold">Order #{order.id.slice(0, 8)}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className={order.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                      {order.payment_status}
                    </Badge>
                    <p className="font-bold text-primary">${order.total.toFixed(2)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;