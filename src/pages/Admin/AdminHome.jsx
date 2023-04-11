import React, { useState } from 'react'
import LayoutComponent from '../../layout/Layout'
import { PieChartOutlined,DesktopOutlined,ContainerOutlined,UnorderedListOutlined } from '@ant-design/icons';
import {  Layout, Menu  } from 'antd';
import StatisticApp from './StatisticApp';
import AccountManagement from './AccountManagement';
import OrderManagement from './OrderManagement';
import ProductManagement from './ProductManagement';

const {  Sider } = Layout;
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}const items = [
  getItem('Thống kê', '1', <PieChartOutlined />),
  getItem('Người dùng', '2', <DesktopOutlined />),
  getItem('Sản phẩm', '3', <ContainerOutlined />),
  getItem('Đơn hàng', '4', <UnorderedListOutlined />),
  
];


 const  AdminHome = () => {
const [currentKey, setCurrentKey] = useState("2")
  function onClickItem({  key }){
    setCurrentKey(key)
  }
  return (
    <LayoutComponent>
     <Layout>
       <Sider
         width={200}
         theme={'light'}       >
      <Menu
        defaultSelectedKeys={[currentKey]}
        mode="inline"
        items={items}
        onSelect={onClickItem}
      />
       </Sider>
       <section className='min-h-[775px] w-full px-1'>
       {currentKey==='1'&&<StatisticApp/>}
       {currentKey==='2'&&<AccountManagement/>}
       {currentKey==='3'&&<ProductManagement/>}
       {currentKey==='4'&&<OrderManagement/>}
       </section>
   

     </Layout>
    </LayoutComponent>
  )
}
export default AdminHome