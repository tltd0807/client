import React from "react";
import "../index.css";
import { Input, Layout, theme, Space,  Menu  } from "antd";
import { SearchOutlined,ShoppingCartOutlined ,UserOutlined  } from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";
const { Search } = Input;
const { Header, Content, Footer } = Layout;
;
const LayoutComponent = (props) => {
  // const navigate = useNavigate();
  const navItem = [
    {
      label: "Sản phẩm",
      to: "/",
    },
    {
      label: "Nam",
      to: "/",
    },
    {
      label: "Nữ",
      to: "/",
    },
    {
      label: "Ưu đãi",
      to: "/",
    }
  ];
  const getItem = (label, key) => {
    return {
      key,
      label,
    };
  };
  const items = navItem.map((item, index) =>
  getItem(item.label, index.toString())
);
  const {
    token: { colorBgContainer }
  } = theme.useToken();
  return (
    <Layout className="layout min-h-screen">
      <Header className="flex justify-between w-full items-center">

      <Space direction="horizontal" size={390} wrap={true} >

        <Link to={'/'}>
        <span className="text-white font-bold text-lg w-[120px] h-8 inline-block px-[20px] cursor-pointer hover:text-[#48cae4]">HOPE</span></Link>
         
        <Menu
            style={{ minWidth: 300, flex: "auto", justifyContent: "center" }}
            theme="dark"
            mode="horizontal"
            // onClick={(e) => {
            //   navigate(navItem[e.key].to, { state: { position: e.key } });
            // }}
            items={navItem}
          />
      <Space direction="horizontal" size={20}>
      <Search placeholder="Tìm đôi giày bạn thích" onSearch={(val)=>console.log(val)} enterButton={<SearchOutlined />}  style={{
        width: 350,
        marginTop:"15px",
      }}/>
      <UserOutlined className='text-white text-[25px]'/>
        <ShoppingCartOutlined style={{fontSize: '25px', color:'white'}}  />
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
