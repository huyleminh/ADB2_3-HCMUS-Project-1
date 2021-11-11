import { MinusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, InputNumber, Row, Space } from "antd";
import { useForm } from "antd/lib/form/Form";
import PropTypes from "prop-types";
import React from "react";

ProductForm.propTypes = {
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    initialValues: PropTypes.arrayOf(
        PropTypes.shape({
            productId: PropTypes.string,
            productName: PropTypes.string,
            remainQuantity: PropTypes.number,
            quantity: PropTypes.number,
            price: PropTypes.number,
            discount: PropTypes.number,
            totalAmount: PropTypes.number,
            description: PropTypes.string,
        })
    ),
    readonly: PropTypes.bool,
};

ProductForm.defaultProps = {
    onOk: null,
    onCancel: null,
    readonly: false,
    quantity: null,
};

function ProductForm(props) {
    const { onOk, onCancel, initialValues, readonly } = props;
    const [form] = useForm();

    const handleCancel = () => {
        if (!onCancel) {
            return;
        }
        onCancel();
    };

    const handleOk = () => {
        if (!onOk) {
            return;
        }

        const isFormValid = form.getFieldsValue().products && form.getFieldsValue().products.length;
        onOk(isFormValid, form.getFieldsValue().products);
    };

    const mappedData = initialValues.map((value) => {
        return {
            productName: value.productName,
            remainQuantity: value.remainQuantity,
            quantity: value.quantity,
            price: value.price,
            discount: value.discount,
            totalAmount: value.totalAmount,
        };
    });

    const widthAdapt = readonly ? 4 : 5;

    return (
        <Form form={form} onFinish={handleOk} validateTrigger="onBlur">
            <Form.List name="products" initialValue={mappedData}>
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                            <Space
                                key={key}
                                direction="horizontal"
                                style={{ display: "flex", alignItems: "center" }}
                            >
                                <Row gutter={[16, 16]} align="middle">
                                    <Col span={8}>
                                        <Form.Item
                                            {...restField}
                                            name={[name, "productName"]}
                                            fieldKey={[fieldKey, "productName"]}
                                            label="Tên sản phẩm"
                                            labelCol={{ span: 24 }}
                                        >
                                            <Input placeholder="Tên sản phẩm" disabled />
                                        </Form.Item>
                                    </Col>

                                    <Col span={widthAdapt}>
                                        <Form.Item
                                            {...restField}
                                            name={[name, "price"]}
                                            fieldKey={[fieldKey, "price"]}
                                            label="Giá bán"
                                            labelCol={{ span: 24 }}
                                        >
                                            <InputNumber
                                                placeholder="Ví dụ: 10.000"
                                                disabled
                                                style={{ width: "100%" }}
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col span={widthAdapt}>
                                        <Form.Item
                                            {...restField}
                                            name={[name, "quantity"]}
                                            fieldKey={[fieldKey, "quantity"]}
                                            rules={[
                                                {
                                                    required: !readonly,
                                                    message: "Số lượng không được bỏ trống",
                                                },
                                            ]}
                                            label="Số lượng"
                                            labelCol={{ span: 24 }}
                                        >
                                            <InputNumber
                                                placeholder="Ví dụ: 2"
                                                min={0}
                                                max={initialValues[index].remainQuantity}
                                                disabled={readonly}
                                                style={{ width: "100%" }}
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col span={widthAdapt}>
                                        <Form.Item
                                            {...restField}
                                            name={[name, "discount"]}
                                            fieldKey={[fieldKey, "discount"]}
                                            rules={[
                                                {
                                                    required: !readonly,
                                                    message: "Giá giảm không được bỏ trống",
                                                },
                                            ]}
                                            label="Giá giảm"
                                            labelCol={{ span: 24 }}
                                        >
                                            <InputNumber
                                                placeholder="Ví dụ: 5.000"
                                                min={0}
                                                disabled={readonly}
                                                style={{ width: "100%" }}
                                            />
                                        </Form.Item>
                                    </Col>

                                    {readonly ? (
                                        <Col span={widthAdapt}>
                                        <Form.Item
                                            {...restField}
                                            name={[name, "totalAmount"]}
                                            fieldKey={[fieldKey, "totalAmount"]}
                                            label="Thành tiền"
                                            labelCol={{ span: 24 }}
                                        >
                                            <InputNumber
                                                placeholder="Thành tiền"
                                                min={0}
                                                disabled
                                                style={{ width: "100%" }}
                                            />
                                        </Form.Item>
                                    </Col>
                                    ) : null}

                                    {!readonly ? (
                                        <Col span={1}>
                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                        </Col>
                                    ) : null}
                                </Row>
                            </Space>
                        ))}
                    </>
                )}
            </Form.List>

            {!readonly ? (
                <Space direction="horizontal">
                    <Button onClick={handleCancel}>Hủy</Button>

                    <Button type="primary" htmlType="submit">
                        Tiếp tục
                    </Button>
                </Space>
            ) : null}
        </Form>
    );
}

export default ProductForm;
