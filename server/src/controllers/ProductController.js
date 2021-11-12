import { Router } from "express";
import Product from "../utilities/database/entities/Product.js";

class ProductController {
    constructor() {
        this.router = Router();
        this.initializeRouters();
    }

    initializeRouters() {
        this.router.get("/products", this.getProductByName);
    }

    async getProductByName(req, res) {
        const productName = req.query.name;
        try {
            const [product] = await Product.getByName(productName);
            if (product === undefined) {
                res.json({ status: 400, message: "Không tìm thấy sản phẩm" });
            }

            res.json({ status: 200, data: product });
        } catch (e) {
            res.json({ status: 500, message: "Server error" });
        }
    }
}

export default ProductController;
