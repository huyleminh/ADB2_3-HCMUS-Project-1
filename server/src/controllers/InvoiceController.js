import { Router } from "express";
import connectionPool from "../utilities/database/DatabaseConnection.js";

class InvoiceController {
    constructor() {
        this.router = Router();
        this.initializeRouters();
    }

    initializeRouters() {
        this.router.get("/example", this.handleExample);
    }

    async handleExample(req, res) {
        // You must be put all your await into try catch or use Promise.then().catch() to handle the flow.
        // This is an example.
        try {
            const pool = await connectionPool;
            const resp = await pool.query(`select * from BOMON`);
            console.log(resp);
            res.json({ status: 200, data: resp });
        } catch (e) {
            console.log(e);
            res.json({ status: 500, message: "Internal error." });
        }
    }
}

export default InvoiceController;
