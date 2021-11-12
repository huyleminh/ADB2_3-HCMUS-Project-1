import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import React, { useState } from "react";
import { Redirect, Route, Switch, useLocation, useRouteMatch } from "react-router-dom";
import "../../assets/styles/custom-antd.css";
import InvoiceFeature from "../Invoice";
import StatisticFeature from "../Statistic";
import Sidebar from "./components/Sidebar";

const { Header, Content, Footer, Sider } = Layout;

function DashBoard(props) {
    const match = useRouteMatch();
    const location = useLocation();

    const [collapsed, setCollapsed] = useState(false);

    const toggleSiderbar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Layout className="custom-site-dashboard">
            <Sider trigger={null} collapsible collapsed={collapsed} width="300px" breakpoint="md">
            {collapsed ? (<div className="logo-collapsed"><span>ADB2_3</span></div>) : (<div className="logo"><span>ADB2_3</span></div>)}
                <Sidebar selectedKey={location.pathname} />
            </Sider>

            <Layout className="custom-site-content">
                <Header className="custom-site-content-header">
                    {collapsed ? (
                        <MenuUnfoldOutlined className="trigger" onClick={toggleSiderbar} />
                    ) : (
                        <MenuFoldOutlined className="trigger" onClick={toggleSiderbar} />
                    )}
                </Header>

                <Content className="custom-site-main">
                    <Switch>
                        <Route path={`${match.path}/invoices`} component={InvoiceFeature} />
                        <Route path={`${match.path}/statistic`} component={StatisticFeature} />
                        <Route exact path={`${match.path}`}>
                            <Redirect to={`${match.path}/invoices`} />
                        </Route>

                        <Route>
                            <Redirect to="/404" />
                        </Route>
                    </Switch>
                </Content>

                <Footer
                    style={{
                        textAlign: "center",
                        color: "#000",
                    }}
                >
                    Advanced DB Project 1 ©2021 Created by ADB2_3
                </Footer>
            </Layout>
        </Layout>
    );
}

export default DashBoard;
