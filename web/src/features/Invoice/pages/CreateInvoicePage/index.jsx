import { ArrowLeftOutlined, Loading3QuartersOutlined } from "@ant-design/icons";
import { Button, Divider, Result, Space, Steps } from "antd";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ClientAPI from "../../../../services/ClientAPI";
import AddCustomerPage from "./AddCustomerPage";
import AddProductPage from "./AddProductPage";
import "./styles.css";

const { Step } = Steps;

function CreateInvoice(props) {
    const history = useHistory();
    const [currentStep, setCurrentStep] = useState(0);
    const [result, setResult] = useState({
        sending: false,
        ok: "info",
        message: "Đang xử lí thông tin hóa đơn.",
    });

    const handleChangeStep = (current) => {
        setCurrentStep(current);
    };

    const onNextStepCustomer = (formValues) => {
        localStorage.removeItem("customer");
        localStorage.setItem("customer-submit", JSON.stringify(formValues));
    };

    const onNextStepProduct = (formValues) => {
        onSubmitFinalStep(JSON.parse(localStorage.getItem("customer-submit")), formValues);
    };

    const onSubmitFinalStep = async (customer, products) => {
        setResult({ ...result, sending: true });

        const orderDetail = products.map((product) => {
            const { productId, quantity, price, discount } = product;
            return { productId, quantity, price, discount };
        });

        let dataSubmit = {
            customerDetail: customer,
            orderDetail,
        };

        if (dataSubmit.customerDetail.id === undefined) {
            dataSubmit.customerDetail.id = null;
        }

        try {
            const response = await ClientAPI.post("/invoices", dataSubmit);
            if (response.status === 201) {
                setResult({ sending: false, ok: "success", message: "Tạo hóa đơn thành công." });
            }

            if (response.status === 400) {
                setResult({ sending: false, ok: "error", message: "Tạo hóa đơn thất bại." });
            }

            if (response.status === 500) {
                setResult({ sending: false, ok: "error", message: "Đã có lỗi xảy ra." });
            }
        } catch (error) {
            console.log(error);
            setResult({ sending: false, ok: "error", message: "Đã có lỗi xảy ra." });
        }
    };

    return (
        <div className="create-invoice">
            <div className="create-invoice-top">
                <ArrowLeftOutlined onClick={() => history.push("../")}/>
                <h2 onClick={() => history.push("../")}>Trang danh sách hóa đơn</h2>
            </div>
            <div className="create-invoice-body">
                <Divider />
                <Steps
                    current={currentStep}
                    direction="horizontal"
                    responsive
                    type="default"
                    className="create-invoice-steps"
                >
                    <Step title="Thêm khách hàng"></Step>
                    <Step title="Thêm sản phẩm"></Step>
                    <Step title="Tạo hóa đơn"></Step>
                </Steps>

                <Divider />

                <div className="create-invoice-step">
                    {currentStep === 0 && (
                        <AddCustomerPage
                            step={currentStep}
                            changeStep={handleChangeStep}
                            onNext={onNextStepCustomer}
                        />
                    )}
                    {currentStep === 1 && (
                        <AddProductPage
                            step={currentStep}
                            changeStep={handleChangeStep}
                            onNext={onNextStepProduct}
                        />
                    )}
                    {currentStep === 2 && (
                        <>
                            <Result
                                status={result.ok}
                                title={result.message}
                                icon={result.sending && <Loading3QuartersOutlined spin />}
                                extra={
                                    <Space direction="horizontal">
                                        <Button onClick={() => setCurrentStep(0)}>Quay lại</Button>
                                        <Button type="primary" onClick={() => history.push("../")}>
                                            Về trang danh sách
                                        </Button>
                                    </Space>
                                }
                            ></Result>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CreateInvoice;
