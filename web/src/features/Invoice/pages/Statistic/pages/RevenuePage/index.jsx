import { DownloadOutlined } from "@ant-design/icons";
import { Button, message, Select, Space, Typography } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import ClientAPI from "../../../../services/ClientAPI";

function RevenuePage(props) {
    const [year, setYear] = useState(2020);
    const [data, setData] = useState([]);

    const ref = useRef();

    const handleExportChart = () => {
        const url = ref.current.toBase64Image();

        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `thong-ke-doanh-thu-${year}`);
        link.click();
    };

    useEffect(() => {
        const fetchStatisticPerYear = async () => {
            try {
                const response = await ClientAPI.get(`/invoices/revenue?year=${year}`);

                if (response.status === 200) {
                    setData(response.data);
                    message.success("Lấy dữ liệu thống kê thành công.", 1);
                } else {
                    message.error("Lấy dữ liệu thống kê thất bại.", 1);
                }
            } catch (error) {
                console.log(error);
                message.error("Đã có lỗi xảy ra.", 1);
            }
        };

        fetchStatisticPerYear();
    }, [year]);

    const CHART_CONFIG = {
        data: {
            labels: [
                "Tháng 1",
                "Tháng 2",
                "Tháng 3",
                "Tháng 4",
                "Tháng 5",
                "Tháng 6",
                "Tháng 7",
                "Tháng 8",
                "Tháng 9",
                "Tháng 10",
                "Tháng 11",
                "Tháng 12",
            ],
            datasets: [
                {
                    label: "Tổng tiền (VNĐ)",
                    backgroundColor: ["#1890ff"],
                    data: data,
                },
            ],
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: `Tổng doanh thu theo từng tháng (năm ${year})`,
                    position: "bottom",
                },
                legend: {
                    display: true,
                    position: "top",
                },
            },
        },
    };

    return (
        <div className="create-invoice">
            <Typography.Title level={3}>Thống kê doanh thu</Typography.Title>

            <Space direction="horizontal" align="baseline">
                <Typography.Title level={5}>Chọn năm cần xem thống kê</Typography.Title>

                <Select value={year} onChange={(value) => setYear(value)}>
                    <Select.Option key="2020">2020</Select.Option>
                    <Select.Option key="2021">2021</Select.Option>
                </Select>

                <Button type="primary" onClick={handleExportChart} icon={<DownloadOutlined />}>
                    Xuất hình ảnh
                </Button>
            </Space>
            <Bar
                data={{
                    ...CHART_CONFIG.data,
                }}
                options={{
                    ...CHART_CONFIG.options,
                }}
                ref={ref}
            />
        </div>
    );
}

export default RevenuePage;
