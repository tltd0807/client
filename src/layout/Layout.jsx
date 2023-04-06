import React from "react";
import "../index.css";
import {Layout, theme } from "antd";
import HeaderComponent from "./HeaderComponent";
const {  Content, Footer } = Layout;
;
const LayoutComponent = (props) => {
  // const navigate = useNavigate();
  const {
    token: { colorBgContainer }
  } = theme.useToken();
  return (
    <Layout className="layout min-h-screen">
      <HeaderComponent></HeaderComponent>
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
