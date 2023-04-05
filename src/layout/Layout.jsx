import React from "react";
import "../index.css";
import { Input, Layout, Avatar, theme, Space, Button  } from "antd";
import { SearchOutlined,ShoppingCartOutlined  } from '@ant-design/icons';
const { Header, Content, Footer } = Layout;
;
const LayoutComponent = (props) => {
  const {
    token: { colorBgContainer }
  } = theme.useToken();
  return (
    <Layout className="layout min-h-screen">
      <Header className="flex justify-between w-full items-center">

      <Space direction="horizontal" size={1100} >

      <Space direction="horizontal">
        <span className="text-white font-bold text-lg w-[120px] h-8 inline-block px-[20px]">HOPE</span>
          <Input className="w-[350px]"prefix={<SearchOutlined />} placeholder="Tìm đôi giày bạn thích"/>
        </Space>
      <Space direction="horizontal" size={20}>
   
        <Avatar src={<img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLHXF3HZljLg54wXrrfY0Rx3fi5hvDYs4lwFwvXtQQ&s'} alt="avatar" />} />
        <ShoppingCartOutlined style={{fontSize: '25px', color:'white'}}  />
        <Button type="primary">Đăng ký</Button>
        </Space>
     </Space>

      </Header>
      <Content
        style={{
          padding: "0 50px"
        }}
      
      >
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer
          }}
        >
          {props.children}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "right"
        }}
      >
        To Dat ©2023 
      </Footer>
    </Layout>
  );
};
export default LayoutComponent;
