import {
    DollarCircleOutlined,
    FileTextOutlined,
    LineChartOutlined,
    PlusSquareOutlined,
    UnorderedListOutlined
} from "@ant-design/icons";
import { Menu } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

Sidebar.propTypes = {
    selectedKey: PropTypes.string,
};

const { SubMenu } = Menu;

function Sidebar(props) {
    const { selectedKey } = props;

    return (
        <Menu
            defaultSelectedKeys={["/manage/invoices"]}
            defaultOpenKeys={["manage-invoices", "manage-statistic"]}
            selectedKeys={[selectedKey]}
            theme="dark"
            mode="inline"
        >
            <SubMenu key="manage-invoices" icon={<FileTextOutlined />} title="Quản lý hóa đơn">
                <Menu.Item key="/manage/invoices" icon={<UnorderedListOutlined />}>
                    <Link to="/manage/invoices">Danh sách hóa đơn</Link>
                </Menu.Item>
                <Menu.Item key="/manage/invoices/create" icon={<PlusSquareOutlined />}>
                    <Link to="/manage/invoices/create">Tạo mới hóa đơn</Link>
                </Menu.Item>
            </SubMenu>

            <SubMenu key="manage-statistic" icon={<LineChartOutlined />} title="Quản lý thống kê">
                <Menu.Item key="/manage/statistic/revenue" icon={<DollarCircleOutlined />}>
                    <Link to="/manage/statistic/revenue">Thống kê doanh thu</Link>
                </Menu.Item>
            </SubMenu>
        </Menu>
    );
}

export default Sidebar;
