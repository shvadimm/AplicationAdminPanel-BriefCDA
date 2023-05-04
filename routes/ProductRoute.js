import express from "express";
import {
    newProduct,
    deleteProduct,
    getProduct,
    getProducts, getProductsByCategory,
    updateProduct, postCreateProduct, postUpdateProduct
} from "../src/controllers/ProductController.js";

const router = express.Router();

router.get("/products", getProducts);
router.get("/product/:id", getProduct);
router.get("/products/:id", getProductsByCategory);
router.get("/product-create", newProduct);
router.post("/product-post-create", postCreateProduct);
router.get("/product-update/:id", updateProduct);
router.post("/product-post-update", postUpdateProduct);
router.get("/product-delete/:id", deleteProduct);
export default router;