import connectionPool from "../DatabaseConnection.js";

class Product {
    constructor(productId, productName, remainQuantity, description, price) {
        this.productId = productId
        this.productName = productName
        this.remainQuantity = remainQuantity
        this.description = description
        this.price = price
    }

    static getByName = (name) => {
        return new Promise(async (resolve, reject) => {
            const sqlStatement = `
            SELECT
                MaSP as id,
                TenSP as productName,
                SoLuongTon as remainQuantity,
                Mota as description,
                Gia as price
            FROM SanPham
            WHERE TenSP = '${name}'`

            let pool
            try {
                pool = await connectionPool
                const response = await pool.query(sqlStatement)
                resolve(response.recordset)
            } catch (e) {
                console.log(e)
                reject(e)
            } finally {
                // pool.close()
            }
        })
    }
}

export default Product