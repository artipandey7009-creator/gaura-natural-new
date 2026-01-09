import { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const DashboardPage = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API}/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || colors.pending;
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-bold text-foreground mb-8" data-testid="dashboard-title">My Orders</h1>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : orders.length === 0 ? (
          <Card className="p-12 text-center">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">You haven't placed any orders yet.</p>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id} className="p-6" data-testid={`order-${order.id}`}>
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-xl font-serif font-semibold">Order #{order.id.slice(0, 8)}</h3>
                      <Badge className={getStatusColor(order.status)} data-testid={`order-status-${order.id}`}>
                        {order.status}
                      </Badge>
                      {order.payment_status === 'paid' && (
                        <Badge className="bg-green-100 text-green-800">Paid</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Placed on {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-left lg:text-right">
                    <p className="text-2xl font-bold text-primary" data-testid={`order-total-${order.id}`}>
                      ${order.total.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="border-t border-border pt-4 space-y-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span>
                        {item.product_name} x {item.quantity}
                      </span>
                      <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {order.tracking_number && (
                  <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>Tracking: {order.tracking_number}</span>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-2">Shipping Address:</p>
                  <p className="text-sm">
                    {order.shipping_address.address}, {order.shipping_address.city},<br />
                    {order.shipping_address.state} {order.shipping_address.zip}, {order.shipping_address.country}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;