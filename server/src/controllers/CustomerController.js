import { Router } from "express"
import Customer from "../utilities/database/entities/Customer.js"

class CustomerController {
    constructor() {
        this.router = Router()
        this.initializeRouters()
    }

    initializeRouters() {
        this.router.get("/users", this.getCustomerByPhoneNumber)
    }

    async getCustomerByPhoneNumber(req, res) {
        const phoneNumber = req.query.phoneNumber

        try {
            const [user] = await Customer.getByOneAttribute('DienThoai', phoneNumber);
            if (user === undefined) {
                res.json({ status: 400, message: "Không tìm thấy khách hàng" });
            }

            res.json({ status: 200, data: user });
        } catch (e) {
            res.json({ status: 500, message: "Server error" })
        }
    }
}

export default CustomerController;