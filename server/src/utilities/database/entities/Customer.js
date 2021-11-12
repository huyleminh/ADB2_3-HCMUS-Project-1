import connectionPool from "../DatabaseConnection.js";

class Customer {
    constructor(id, lastName, firstName, dob, houseNumber, street, ward, district, city, phoneNumber) {
        this.id = id;
        this.lastName = lastName;
        this.firstName = firstName;
        this.dob = dob;
        this.houseNumber = houseNumber;
        this.street = street;
        this.ward = ward;
        this.district = district;
        this.city = city;
        this.phoneNumber = phoneNumber;
    }

    static insert = (customerInstance) => {
        return new Promise(async (resolve, reject) => {  
            const sqlStatement = `
            INSERT INTO KhachHang (MaKH, Ho, Ten, NgSinh, SoNha, Duong, Phuong, Quan, Tpho, DienThoai)
            VALUES 
            (
                '${customerInstance.id}',
                N'${customerInstance.lastName}',
                N'${customerInstance.firstName}',
                '${customerInstance.dob}',
                N'${customerInstance.houseNumber}',
                N'${customerInstance.street}',
                N'${customerInstance.ward}',
                N'${customerInstance.district}',
                N'${customerInstance.city}',
                '${customerInstance.phoneNumber}'
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

    static getByOneAttribute = (name, value) => {
        return new Promise(async (resolve, reject) => {
            const sqlStatement = `
            SELECT
                MaKH as id,
                Ten as firstName,
                Ho as lastName,
                NgSinh as dob,
                DienThoai as phoneNumber,
                SoNha as houseNumber,
                Duong as street,
                Phuong as ward,
                Quan as district,
                Tpho as city
            FROM KhachHang
            WHERE ${name} = '${value}'`
            
            let pool;
            try {
                pool = await connectionPool;
                const response = await pool.query(sqlStatement);
                resolve(response.recordset);
            } catch (e) {
                console.log(e);
                reject(e);
            } finally {
                // pool.close();
            }
       })
    }
}

export default Customer;
