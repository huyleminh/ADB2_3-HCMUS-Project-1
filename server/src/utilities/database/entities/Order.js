import connectionPool from "../DatabaseConnection.js";

class Order {
    constructor(orderId, customerId, dateCreated, totalMoney) {
        this.orderId = orderId;
        this.customerId = customerId;
        this.dateCreated = dateCreated;
        this.totalMoney = totalMoney;
    }
    
    static insert = (orderInstance) => {
        return new Promise(async (resolve, reject) => {
            const sqlStatement = `
            INSERT INTO HoaDon (MaHD, MaKH, NgayLap)
            VALUES 
            (
                '${orderInstance.orderId}',
                '${orderInstance.customerId}',
                '${orderInstance.dateCreated}'
            )`;

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

export default Order;
