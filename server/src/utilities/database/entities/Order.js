import connectionPool from "../DatabaseConnection.js";

class Order {
    constructor(orderId, customerId, dateCreated, totalMoney) {
        this.orderId = orderId;
        this.customerId = customerId;
        this.dateCreated = dateCreated;
        this.totalMoney = totalMoney;
    }
    
    static getIncomeInAYear = (year) => {
        return new Promise(async (resolve, reject) => {
            const sqlStatement = `
            SELECT 
                HD_Thang.Thang AS 'month',
                SUM(HD_Thang.TongTien) as totalMoney
            FROM (
                    SELECT TongTien, MONTH(NgayLap) AS Thang
                    FROM HoaDon
                    WHERE YEAR(NgayLap) = ${year}
                ) AS HD_Thang
            GROUP BY HD_Thang.Thang`;

            try {
                const pool = await connectionPool;
                const response = await pool.query(sqlStatement);
                resolve(response.recordset);
            } catch (e) {
                reject(e);
            }
        })
    }

    static getAll = () => {
        return new Promise(async (resolve, reject) => {
            const sqlStatement = `
            SELECT
                HD.MaHD as orderId,
                KH.Ten as customerFirstName,
                KH.Ho as customerLastName,
                HD.NgayLap as dateCreated,
                HD.TongTien as totalMoney
            FROM HoaDon HD JOIN KhachHang KH
            ON HD.MaKH = KH.MaKH`;

            try {
                const pool = await connectionPool;
                const response = await pool.query(sqlStatement);
                resolve(response.recordset);
            } catch (e) {
                reject(e);
            }
        })
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
                reject(e);
            }
        })
    }
}

export default Order;
