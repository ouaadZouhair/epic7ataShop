import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllOrders, editOrderStatus } from '../../../redux/slice/CheckoutSlice.js';
import { Select, Table, Tag, Space, Spin, message } from 'antd';
import moment from 'moment';

const { Column } = Table;
const { Option } = Select;

const DashOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { order: orders, error, loading } = useSelector((state) => state.order);
  const [statusFilter, setStatusFilter] = useState('all');
  const [updatingOrder, setUpdatingOrder] = useState(null);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setUpdatingOrder(orderId);
      await dispatch(editOrderStatus({ status: newStatus, orderId })).unwrap();
      message.success('Order status updated successfully');
      dispatch(fetchAllOrders());
    } catch (error) {
      message.error('Failed to update order status');
    } finally {
      setUpdatingOrder(null);
    }
  };

  const filteredOrders = statusFilter === 'all'
    ? orders
    : orders.filter(order => order.status === statusFilter);

  const statusColors = {
    Pending: 'blue',
    Processing: 'yellow',
    Printing: 'cyan',
    Delivering: 'orange',
    Completed: 'green',
    Canceled: 'red'
  };

  const isStatusDisabled = (status) => {
    return ['Completed', 'Canceled'].includes(status);
  };

  return (
    <div className="py-4 w-full h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 bg-white p-3  rounded-lg shadow-sm">
        <h1 className="text-xl font-semibold mb-2 sm:mb-0">Orders Management</h1>
        <Select
          defaultValue="all"
          style={{ width: 180 }}
          onChange={(value) => setStatusFilter(value)}
        >
          <Option value="all">All Orders</Option>
          <Option value="Pending">Pending</Option>
          <Option value="Processing">Processing</Option>
          <Option value="Printing">Printing</Option>
          <Option value="Delivering">Delivering</Option>
          <Option value="Completed">Completed</Option>
          <Option value="Canceled">Canceled</Option>
        </Select>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <Spin size="medium" />
        </div>
      ) : (
        <Table
          dataSource={filteredOrders}
          rowKey="_id"
          size="medium"
          scroll={{ x: 1000 }}
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
            size: 'medium'
          }}
          className="compact-table bg-white text-lg"
          onRow={(record) => {
            return {
              onClick: (event) => {
                // Check if click was on the select dropdown
                const isSelectClick = event.target.closest('.ant-select');
                if (!isSelectClick) {
                  navigate(`/dashboard/orders/${record._id}`);
                }
              },
              style: { cursor: 'pointer' }
            };
          }}
        >
          <Column
            title="Order ID"
            dataIndex="_id"
            key="_id"
            width={120}
            render={(id) => <span className="font-mono">{id.slice(-8)}</span>}
          />
          <Column
            title="Customer"
            key="user"
            width={150}
            render={(_, record) => (
              <div className="text-sm">
                <div className="font-medium truncate text-base">{record.user?.fullName || 'N/A'}</div>
                <div className="text-gray-500 truncate">{record.user?.email || ''}</div>
              </div>
            )}
          />

          <Column
            title="Phone"
            dataIndex="phone"
            key="phone"
            width={100}
            render={(phone) => <span className="text-base">{phone}</span>}
          />

          <Column
            title="Date"
            dataIndex="createdAt"
            key="date"
            width={140}
            render={(date) => <span className="text-base">{moment(date).format('MMM D, YYYY')}</span>}
          />

          <Column
            title="Total"
            dataIndex="totalPrice"
            key="total"
            width={100}
            render={(total) => <span className="text-base font-medium">{total.toFixed(2)} Dhs</span>}
          />

          <Column
            title="Status"
            dataIndex="status"
            key="status"
            width={120}
            render={(status) => (
              <Tag
                color={statusColors[status]}
                className="text-sm py-0.5"
              >
                {status}
              </Tag>
            )}
          />

          <Column
            title="Actions"
            key="actions"
            width={150}
            fixed="right"
            render={(_, record) => (
              <Space size="medium" onClick={(e) => e.stopPropagation()}>
                <Select
                  value={record.status}
                  style={{ width: 150 }}
                  size="medium"
                  onChange={(value) => handleStatusChange(record._id, value)}
                  disabled={isStatusDisabled(record.status) || updatingOrder === record._id}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Option value="Pending">Pending</Option>
                  <Option value="Processing">Processing</Option>
                  <Option value="Printing">Printing</Option>
                  <Option value="Delivering">Delivering</Option>
                  <Option value="Completed">Completed</Option>
                  <Option value="Canceled">Canceled</Option>
                </Select>
                {updatingOrder === record._id && <Spin size="medium" />}
              </Space>
            )}
          />
        </Table>
      )}
    </div>
  );
};

export default DashOrders;