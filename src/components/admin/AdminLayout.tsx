import React from 'react';
import { Layout, Menu } from 'antd';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Users, Settings } from 'lucide-react';

const { Header, Sider, Content } = Layout;

const AdminLayout: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    {
      key: '/admin',
      icon: <LayoutDashboard className="w-4 h-4" />,
      label: <Link to="/admin">Dashboard</Link>,
    },
    {
      key: '/admin/products',
      icon: <ShoppingBag className="w-4 h-4" />,
      label: <Link to="/admin/products">Products</Link>,
    },
    {
      key: '/admin/users',
      icon: <Users className="w-4 h-4" />,
      label: <Link to="/admin/users">Users</Link>,
    },
    {
      key: '/admin/settings',
      icon: <Settings className="w-4 h-4" />,
      label: <Link to="/admin/settings">Settings</Link>,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="light" className="border-r border-gray-200">
        <div className="h-16 flex items-center justify-center border-b border-gray-200">
          <Link to="/" className="text-xl font-bold">Vogue Admin</Link>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          className="border-r-0"
        />
      </Sider>
      <Layout>
        <Header className="bg-white px-6 border-b border-gray-200">
          <div className="flex justify-between items-center h-full">
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          </div>
        </Header>
        <Content className="bg-gray-50 p-6">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;