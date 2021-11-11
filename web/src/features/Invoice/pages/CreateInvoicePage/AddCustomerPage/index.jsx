import { ExclamationCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Form, Input, message, Modal, Row, Switch } from "antd";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ClientAPI from "../../../../../services/ClientAPI";
import CustomerForm from "../../../components/CustomerForm";
import "./styles.css";

const { confirm } = Modal;

moment.locale("vie");
const momentFormat = "YYYY-MM-DD";

AddCustomerPage.propTypes = {
    step: PropTypes.number,
    changeStep: PropTypes.func,
    onNext: PropTypes.func,
};

AddCustomerPage.defaultProps = {
    changeStep: null,
    onNext: null,
};

function AddCustomerPage(props) {
    const { step, changeStep, onNext } = props;
    const history = useHistory();

    const [isAddMode, setIsAddMode] = useState(false);
    const [formValue, setFormValue] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleOnSearchFinish = async (value) => {
        setIsLoading(true);
        try {
            const response = await ClientAPI.get(`/users?phoneNumber=${value.phoneSearchNumber}`);

            setIsLoading(false);

            if (response.status === 200) {
                const dataResponse = response.data;
                localStorage.setItem("customer", JSON.stringify(dataResponse));

                const cloneInitial = { ...dataResponse };
                cloneInitial.dob = moment(dataResponse.dob, momentFormat);
                delete cloneInitial.id;

                setFormValue(cloneInitial);

                message.success("Lấy thông tin khách hàng thành công.", 1);
            }

            if (response.status === 400) {
                message.error(`${response.message}`, 1);
            }

            if (response.status === 500) {
                message.error(`${response.message}`, 1);
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
            message.error("Đã có lỗi xảy ra.", 1);
        }
    };

    const handleChangeMode = () => {
        localStorage.removeItem("customer");
        setIsAddMode(!isAddMode);
    };

    const onCancelCreateCustomer = () => {
        confirm({
            icon: <ExclamationCircleOutlined />,
            content: <span>Nếu tiếp tục, bạn sẽ quay lại trang danh sách.</span>,
            cancelText: "Hủy",
            onOk() {
                history.push("../");
            },
            onCancel() {
                return;
            },
        });
    };

    const onOkCreateCustomer = (isFormValid, values) => {
        if (!isFormValid || !changeStep || !onNext) {
            return;
        }

        const customer = JSON.parse(localStorage.getItem("customer"));
        if (!customer) {
            const formModified = { ...values };
            formModified.dob = values.dob.toJSON();
            onNext(formModified);
        } else {
            onNext(customer);
        }
        changeStep(step + 1);
    };

    return (
        <div className="create-invoice-step-customer">
            <Form onFinish={handleOnSearchFinish} layout="inline">
                <Form.Item
                    label="Tìm theo số điện thoại"
                    name="phoneSearchNumber"
                    validateTrigger="onBlur"
                    rules={[
                        { required: true, message: "Số điện thoại không được bỏ trống." },
                        { whitespace: true, message: "Số điện thoại không được bỏ trống." },
                        {
                            types: "regexp",
                            pattern: new RegExp(/^[\d]{10}$/g),
                            message: "Số điện thoại phải là số và có 10 kí tự.",
                        },
                    ]}
                >
                    <Row>
                        <Col>
                            <Input placeholder="Ví dụ: 0123456789" disabled={isAddMode} />
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

            <span>
                Hoặc tạo mới khách hàng <Switch onChange={handleChangeMode}></Switch>
            </span>

            <Divider />

            <CustomerForm
                isAddMode={isAddMode}
                initialValues={formValue}
                onCancel={onCancelCreateCustomer}
                onOk={onOkCreateCustomer}
            />
        </div>
    );
}

export default AddCustomerPage;
