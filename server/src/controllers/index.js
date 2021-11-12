import InvoiceController from "./InvoiceController.js";
import CustomerController from "./CustomerController.js";
import ProductController from "./ProductController.js";

//New controllers will be added to this object.
const AppControllers = [
    new InvoiceController(),
    new CustomerController(),
    new ProductController(),
];
export default AppControllers;
