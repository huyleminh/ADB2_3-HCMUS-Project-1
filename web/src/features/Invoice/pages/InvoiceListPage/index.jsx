import { message, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import ClientAPI from "../../../../services/ClientAPI";
import "./styles.css";

InvoiceListPage.propTypes = {};

const MAX_ITEM_PER_PAGE = 15;

function InvoiceListPage(props) {
    const history = useHistory();
    const location = useLocation();
    const [orderData, setData] = useState([]);
    const [totalPage, setTotal] = useState(0);
    const [pagination, setPagination] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const handleViewDetais = (row) => {
        history.push(`${location.pathname}/${row.orderId}`);
    };

    const handleCreateNewOrder = () => {
        history.push(`${location.pathname}/create`);
    };

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                setIsLoading(true);
                const response = await ClientAPI.get(
                    `/invoices?page=${pagination}&offset=${MAX_ITEM_PER_PAGE}`
                );
                setIsLoading(false);
                if (response.status === 200) {
                    setData(response.data.orderList);
                    setTotal(response.data.pagination.total);
                    message.success("Tải dữ liệu đơn hàng thành công", 1.5);
                } else {
                    message.error("Lỗi tải dữ liệu đơn hàng", 1.5);
                }
            } catch (err) {
                console.log(err);
                setIsLoading(false);
                message.error("Đã xảy ra lỗi", 1.5);
            }
        };
        fetchOrder();
    }, [pagination]);

    const columns = [
        {
            title: "STT",
            width: 20,
            dataIndex: "key",
            key: "STT",
            fixed: "left",
        },
        {
            title: "Tên",
            width: 50,
            dataIndex: "customerFirstName",
            key: "customerFirstName",
            fixed: "left",
        },
        {
            title: "Họ",
            width: 60,
            dataIndex: "customerLastName",
            key: "customerLastName",
            fixed: "left",
        },
        {
            title: "Ngày tạo",
            width: 50,
            dataIndex: "dateCreated",
            key: "dateCreated",
        },
        {
            title: "Tổng tiền",
            width: 50,
            dataIndex: "totalMoney",
            key: "totalMoney",
        },
        {
            title: "Hành động",
            key: "operation",
            fixed: "right",
            width: 30,
            render: (row) => (
                <button className="detail_button" onClick={() => handleViewDetais(row)}>
                    Chi tiết
                </button>
            ),
        },
    ];

    const displayData = orderData.map(function (x, index) {
        return {
            key: (pagination - 1) * MAX_ITEM_PER_PAGE + index + 1,
            orderId: x.orderId,
            customerFirstName: x.customerFirstName,
            customerLastName: x.customerLastName,
            totalMoney: x.totalMoney.toFixed(0),
            dateCreated: new Date(x.dateCreated).toLocaleDateString(),
        };
    });

    return (
        <div>
            <div className="command-bar">
                <div className="button-wrapper">
                    <button className="create-button" onClick={handleCreateNewOrder}>
                        Tạo mới hóa đơn
                    </button>
                </div>
            </div>
            <div className="content-wrapper">
                <div className="table-wrapper">
                    <Table
                        columns={columns}
                        dataSource={displayData}
                        scroll={{ x: 800, y: 600 }}
                        loading={isLoading}
                        bordered
                        sticky
                        pagination={{
                            position: ["bottomCenter"],
                            pageSize: MAX_ITEM_PER_PAGE,
                            current: pagination,
                            total: totalPage,
                            onChange: (page) => setPagination(page),
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default InvoiceListPage;
