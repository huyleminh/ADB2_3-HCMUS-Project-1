import { Router } from "express";
import Order from "../utilities/database/entities/Order.js";
import Customer from "../utilities/database/entities/Customer.js";
import { v4 as uuidv4 } from "uuid";
import OrderDetail from "../utilities/database/entities/OrderDetail.js";

class InvoiceController {
    constructor() {
        this.router = Router();
        this.initializeRouters();
    }

    initializeRouters() {
        this.router.get("/invoices/revenue", this.getIncomeInAYear);
        this.router.get("/invoices", this.getAllInvoicesByPage);
        this.router.post("/invoices", this.createNewInvoice);
    }

    async getIncomeInAYear(req, res) {
        const year = parseInt(req.query.year);

        try {
            const incomeList = await Order.getIncomeInAYear(year);
            const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            incomeList.forEach((element) => {
                data[parseInt(element.month) - 1] = element.totalMoney;
            })

            res.json({ status: 200, data });
        } catch (e) {
            res.json({ status: 500, message: "Server error" });
        }
    }

    async getAllInvoicesByPage(req, res) {
        const page = parseInt(req.query.page);
        const offset = parseInt(req.query.offset);
        const startIndex = (page - 1) * offset;

        try {
            const orderList = await Order.getAll();
            res.json({
                status: 200,
                data: {
                    orderList: orderList.slice(startIndex, startIndex + offset),
                    pagination: { page: page, total: orderList.length }
                }
            })
        } catch (e) {
            res.json({ status: 500, message: "Server error" });
        }
    }

    async createNewInvoice(req, res) {
        const { customerDetail, orderDetail } = req.body;

        try {
            if (customerDetail.id === null) {
                customerDetail.id = uuidv4();
                if (customerDetail.dob.length > 10) {
                    customerDetail.dob = customerDetail.dob.substr(0, 10);
                }

                // insert new customer.
                await Customer.insert(customerDetail);
            }

            // 25200000 = 7 * 3600 * 1000
            const orderId = uuidv4();
            const dateCreatedAsMiliseconds = new Date(Date.now() + 25200000);
            const dateCreated = dateCreatedAsMiliseconds.toISOString();

            // insert new order.
            await Order.insert({
                orderId: orderId,
                customerId: customerDetail.id,
                dateCreated: dateCreated.substr(0, 10)
            })

            // insert new order's detail.
            await OrderDetail.insertList(
                orderDetail.map((element) => {
                    return { orderId, ...element };
                })
            )

            res.json({ status: 201 });
        } catch (e) {
            res.json({ status: 500, message: "Server error" });
        }
    }
}

export default InvoiceController;
