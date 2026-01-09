import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const AdminOrders = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updateData, setUpdateData] = useState({ status: '', tracking_number: '' });
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API}/admin/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOrder = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${API}/admin/orders/${selectedOrder.id}/status`,
        null,
        {
          params: {
            status: updateData.status,
            tracking_number: updateData.tracking_number || undefined
          },
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      toast.success('Order updated!');
      setDialogOpen(false);
      fetchOrders();
    } catch (error) {
      toast.error('Failed to update order');
    }
  };

  const openUpdateDialog = (order) => {
    setSelectedOrder(order);
    setUpdateData({
      status: order.status,
      tracking_number: order.tracking_number || ''
    });
    setDialogOpen(true);
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
        <h1 className="text-4xl font-serif font-bold text-foreground mb-8" data-testid="admin-orders-title">Manage Orders</h1>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : orders.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">No orders yet</p>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id} className="p-6" data-testid={`order-card-${order.id}`}>
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-xl font-serif font-semibold">Order #{order.id.slice(0, 8)}</h3>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                      {order.payment_status === 'paid' && (
                        <Badge className="bg-green-100 text-green-800">Paid</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Placed on {new Date(order.created_at).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      User ID: {order.user_id}
                    </p>
                  </div>
                  <div className="text-left lg:text-right">
                    <p className="text-2xl font-bold text-primary">${order.total.toFixed(2)}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openUpdateDialog(order)}
                      className="mt-2"
                      data-testid={`update-order-${order.id}`}
                    >
                      Update Status
                    </Button>
                  </div>
                </div>

                <div className="border-t border-border pt-4 space-y-3 mb-4">
                  <h4 className="font-semibold">Items:</h4>
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span>{item.product_name} x {item.quantity}</span>
                      <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {order.tracking_number && (
                  <p className="text-sm text-muted-foreground mb-2">
                    Tracking: {order.tracking_number}
                  </p>
                )}

                <div className="border-t border-border pt-4">
                  <p className="text-sm font-semibold mb-2">Shipping Address:</p>
                  <p className="text-sm text-muted-foreground">
                    {order.shipping_address.address}, {order.shipping_address.city},<br />
                    {order.shipping_address.state} {order.shipping_address.zip}, {order.shipping_address.country}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Update Order Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Order Status</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleUpdateOrder} className="space-y-4" data-testid="update-order-form">
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={updateData.status}
                  onValueChange={(value) => setUpdateData({ ...updateData, status: value })}
                >
                  <SelectTrigger data-testid="status-select">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="tracking_number">Tracking Number (Optional)</Label>
                <Input
                  id="tracking_number"
                  value={updateData.tracking_number}
                  onChange={(e) => setUpdateData({ ...updateData, tracking_number: e.target.value })}
                  placeholder="Enter tracking number"
                  data-testid="tracking-number-input"
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" data-testid="submit-update-button">
                Update Order
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminOrders;
