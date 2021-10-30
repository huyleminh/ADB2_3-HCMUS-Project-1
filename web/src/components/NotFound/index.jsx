import { Button, Result } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";
import "./styles.css";

function NotFound() {
    const history = useHistory();

    const handleGoHome = () => {
        history.push("/");
    };

    return (
        <div className="notfound">
            <Result
                status="404"
                title="404"
                subTitle="Không tìm thấy trang, vui lòng quay lại."
                extra={
                    <Button type="primary" onClick={handleGoHome}>
                        Trang chủ
                    </Button>
                }
            />
        </div>
    );
}

export default NotFound;
