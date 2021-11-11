import { Button, Col, DatePicker, Form, Input, Row, Space } from "antd";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useEffect } from "react";

CustomerForm.propTypes = {
    isAddMode: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    initialValues: PropTypes.shape({
        phoneNumber: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        DoB: PropTypes.any,
        houseNumber: PropTypes.string,
        street: PropTypes.string,
        ward: PropTypes.string,
        district: PropTypes.string,
        city: PropTypes.string,
    }),
};

CustomerForm.defaultProps = {
    onOk: null,
    onCancel: null,
};

moment.locale("vie");
const momentFormat = "YYYY-MM-DD";

//https://github.com/react-component/field-form/blob/master/src/utils/messages.ts

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: "${label} không được bỏ trống",
    whitespace: "${label} không được bỏ trống",
    string: {
        len: "${label} phải có đúng ${len} kí tự",
    },
};

function CustomerForm(props) {
    const { isAddMode, onOk, onCancel, initialValues } = props;
    const [form] = Form.useForm();

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

        const isFormValid = form.getFieldsError().every((errField) => errField.errors.length === 0);
        const fieldsValue = form.getFieldsValue();
        const isAllValid = Object.keys(fieldsValue).every((key) => !!fieldsValue[key] === true);

        onOk(isFormValid && isAllValid, form.getFieldsValue());
    };

    useEffect(() => {
        const patchInitialValue = () => {
            if (Object.keys(initialValues) === 0) {
                return;
            }

            form.setFieldsValue(initialValues);
        };

        patchInitialValue();
    }, [initialValues, form]);

    useEffect(() => {
        form.resetFields();
    }, [isAddMode, form]);

    return (
        <Form
            validateMessages={validateMessages}
            form={form}
            validateTrigger="onBlur"
            onFinish={handleOk}
        >
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Form.Item
                        label="Họ"
                        labelCol={{ span: 24 }}
                        name="lastName"
                        rules={[{ required: true }, { whitespace: true }]}
                    >
                        <Input disabled={!isAddMode} placeholder="Ví dụ: Lê Văn" allowClear />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Tên"
                        labelCol={{ span: 24 }}
                        name="firstName"
                        rules={[{ required: true }, { whitespace: true }]}
                    >
                        <Input disabled={!isAddMode} placeholder="Ví dụ: A" allowClear />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Form.Item
                        label="Số điện thoại"
                        labelCol={{ span: 24 }}
                        name="phoneNumber"
                        rules={[
                            {
                                required: true,
                            },
                            {
                                types: "regexp",
                                pattern: new RegExp(/^[\d]{10}$/g),
                                message: "Số điện thoại phải là số và có 10 kí tự.",
                            },
                        ]}
                    >
                        <Input disabled={!isAddMode} placeholder="Ví dụ: 0123456789" allowClear />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        label="Ngày sinh"
                        labelCol={{ span: 24 }}
                        name="dob"
                        rules={[{ required: true }]}
                    >
                        <DatePicker
                            disabled={!isAddMode}
                            format={momentFormat}
                            placeholder="Chọn ngày sinh"
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={[16, 16]}>
                <Col span={6}>
                    <Form.Item
                        label="Số nhà"
                        labelCol={{ span: 24 }}
                        name="houseNumber"
                        rules={[{ required: true }, { whitespace: true }]}
                    >
                        <Input disabled={!isAddMode} placeholder="Ví dụ: 227" allowClear />
                    </Form.Item>
                </Col>
                <Col span={9}>
                    <Form.Item
                        label="Tên đường"
                        labelCol={{ span: 24 }}
                        name="street"
                        rules={[{ required: true }, { whitespace: true }]}
                    >
                        <Input
                            disabled={!isAddMode}
                            placeholder="Ví dụ: Nguyễn Văn Cừ"
                            allowClear
                        />
                    </Form.Item>
                </Col>
                <Col span={9}>
                    <Form.Item
                        label="Phường/Xã"
                        labelCol={{ span: 24 }}
                        name="ward"
                        rules={[{ required: true }, { whitespace: true }]}
                    >
                        <Input disabled={!isAddMode} placeholder="Ví dụ: Phường 4" allowClear />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Form.Item
                        label="Quận/Huyện"
                        labelCol={{ span: 24 }}
                        name="district"
                        rules={[{ required: true }, { whitespace: true }]}
                    >
                        <Input disabled={!isAddMode} placeholder="Ví dụ: Quận 5" allowClear />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Thành phố/Tỉnh"
                        labelCol={{ span: 24 }}
                        name="city"
                        rules={[{ required: true }, { whitespace: true }]}
                    >
                        <Input
                            disabled={!isAddMode}
                            placeholder="Ví dụ: TP Hồ Chí Minh"
                            allowClear
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Space direction="horizontal">
                <Button onClick={handleCancel}>Hủy</Button>

                <Button type="primary" htmlType="submit">
                    Tiếp tục
                </Button>
            </Space>
        </Form>
    );
}

export default CustomerForm;
