import { LoadingOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Form, Input, message, Row, Typography } from "antd";
import PropTypes from "prop-types";
import React, { useState } from "react";
import ClientAPI from "../../../../../services/ClientAPI";
import ProductForm from "../../../components/ProductForm";
import "./styles.css";

AddProductPage.propTypes = {
    step: PropTypes.number,
    changeStep: PropTypes.func,
    onNext: PropTypes.func,
};

AddProductPage.defaultProps = {
    changeStep: null,
    onNext: null,
};

function AddProductPage(props) {
    const { step, changeStep, onNext } = props;
    const [formValue, setFormValue] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const handleOnSearchFinish = async (value) => {
        setIsLoading(true);
        try {
            const response = await ClientAPI.get(`/products?name=${value.productSearchName}`);

            if (response.status === 200) {
                const dataResponse = response.data;

                const cloneInitial = [...formValue];
                cloneInitial.push(dataResponse);
                setFormValue(cloneInitial);

                localStorage.setItem("products", JSON.stringify(cloneInitial));
                message.success("Lấy thông tin sản phẩm thành công.", 1);
            }

            if (response.status === 400) {
                message.error(`${response.message}`, 1);
            }

            if (response.status === 500) {
                message.error(`${response.message}`, 1);
            }

            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
            message.error("Đã có lỗi xảy ra.", 1);
        }
    };

    const onCancelCreateProduct = () => {
        changeStep(step - 1);
    };

    const onOkCreateProduct = (isFormValid, values) => {
        if (!isFormValid) {
            return;
        }

        const mapped = values.map((value, index) => {
            console.log(formValue[index]);
            return {
                ...value,
                productId: formValue[index].id,
            };
        });

        changeStep(step + 1);
        onNext(mapped);
    };

    return (
        <div className="create-invoice-step-product">
            <Form onFinish={handleOnSearchFinish} layout="inline">
                <Form.Item
                    label="Nhập tên sản phẩm"
                    name="productSearchName"
                    rules={[{ required: true, message: "Tên sản phẩm không được bỏ trống." }]}
                >
                    <Row>
                        <Col>
                            <Input placeholder="Ví dụ: Tea" allowClear />
                        </Col>

                        <Col>
                            <Button type="primary" htmlType="submit">
                                {isLoading ? <LoadingOutlined spin /> : null}
                                Tìm
                            </Button>
                        </Col>
                    </Row>
                </Form.Item>
            </Form>

            <Divider />

            <Typography.Title level={4}>Danh sách sản phẩm</Typography.Title>

            {!isLoading ? (
                <ProductForm
                    initialValues={formValue}
                    onCancel={onCancelCreateProduct}
                    onOk={onOkCreateProduct}
                />
            ) : null}
        </div>
    );
}

export default AddProductPage;
