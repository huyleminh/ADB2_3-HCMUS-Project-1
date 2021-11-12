import { ArrowLeftOutlined } from "@ant-design/icons";
import { Card, Divider, message, Skeleton, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ClientAPI from "../../../../../services/ClientAPI";
import ProductForm from "../../../components/ProductForm";
import "./styles.css";

function ViewInvoiceDetails(props) {
    const { id } = useParams();
    const history = useHistory();
    const [details, setDetails] = useState({ customerDetail: {}, orderDetail: [] });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            setIsLoading(true);
            try {
                const response = await ClientAPI.get(`/invoices/${id}`);

                if (response.status === 200) {
                    setDetails(response.data);
                    setIsLoading(false);
                    message.success("Tải dữ liệu đơn hàng thành công", 1.5);
                } else {
                    message.error("Lỗi tải chi tiết đơn hàng", 1.5);
                }
            } catch (err) {
                console.log(err);
                message.error("Đã xảy ra lỗi", 1.5);
            }
        };
        fetchDetails();
    }, [id]);

    const data = details.orderDetail.map((element) => {
        return {
            productName: element.productName,
            quantity: element.quantity,
            price: element.price.toFixed(0),
            discount: element.discount.toFixed(0),
            totalAmount: element.totalAmount.toFixed(0),
        };
    });

    const generalInfo = {
        customerInfo: details.customerDetail,
        orderInfo: {
            createdDate: new Date(details.dateCreated).toLocaleDateString(),
            total: details.totalMoney,
        },
    };

    generalInfo.orderInfo.total = generalInfo.orderInfo.total !== undefined ? generalInfo.orderInfo.total.toFixed(0) : generalInfo.orderInfo.total;

    return (
        <div className="content-wrapper">
            <div className="create-invoice-top">
                <ArrowLeftOutlined onClick={() => history.push("../")}/>
                <h2 onClick={() => history.push("../")}>Trang danh sách hóa đơn</h2>
            </div>

            <div className="customer-info">
                <Card style={{ width: 500 }} loading={isLoading} className="info">
                    <Typography.Title level={3}>Thông tin khách hàng</Typography.Title>
                    <ul>
                        <li>
                            <b>Tên</b>: {generalInfo.customerInfo.firstName}
                        </li>
                        <li>
                            <b>Họ</b>: {generalInfo.customerInfo.lastName}
                        </li>
                        <li>
                            <b>Số điện thoại</b>: {generalInfo.customerInfo.phoneNumber}
                        </li>
                    </ul>
                </Card>

                <Card style={{ width: 500 }} loading={isLoading} className="info">
                    <Typography.Title level={3}>Thông tin hóa đơn</Typography.Title>
                    <ul>
                        <li>
                            <b>Ngày tạo</b>: {generalInfo.orderInfo.createdDate}
                        </li>
                        <li>
                            <b>Tổng tiền</b>: {generalInfo.orderInfo.total}
                        </li>
                    </ul>
                </Card>
            </div>

            <Divider orientation="left">Chi tiết hóa đơn</Divider>

            {!isLoading ? <ProductForm initialValues={data} readonly /> : <Skeleton active />}
        </div>
    );
}

export default ViewInvoiceDetails;
