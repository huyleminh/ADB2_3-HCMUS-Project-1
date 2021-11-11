import connectionPool from "../DatabaseConnection.js";

class OrderDetail {
    constructor(orderId, productId, quantity, price, discount, totalAmount) {
        this.orderId = orderId;
        this.productId = productId;
        this.quantity = quantity;
        this.price = price;
        this.discount = discount;
        this.totalAmount = totalAmount;
    }

    static insertList = (orderDetailList) => {
        return new Promise(async (resolve, reject) => {
            const valueStatements = orderDetailList.map((orderDetail) => {
                return `
                (
                    '${orderDetail.orderId}',
                    '${orderDetail.productId}',
                    '${orderDetail.quantity}',
                    '${orderDetail.price}',
                    '${orderDetail.discount}'
                )`
            });
            
            const sqlStatement = `
            INSERT INTO CT_HoaDon (MaHD, MaSP, SoLuong, GiaBan, GiaGiam)
            VALUES` + valueStatements.join(',') + ";";

            try {
                const pool = await connectionPool;
                const response = await pool.query(sqlStatement);
                resolve();
            } catch (e) {
                console.log(e);
                reject(e);
            }
        })
    }
}

export default OrderDetail;
