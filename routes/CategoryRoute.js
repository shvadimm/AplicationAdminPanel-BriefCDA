import express from "express";
import {
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory,
    newCategory, postCreateCategory, postUpdateCategory
} from "../src/controllers/CategoryController.js";

const router = express.Router();

router.get("/categories", getCategories);
router.get("/category/:id", getCategory);
router.get("/category-create", newCategory);
router.post("/category-post-create", postCreateCategory);
router.get("/category-update/:id", updateCategory);
router.post("/category-post-update", postUpdateCategory);
router.get("/category-delete/:id", deleteCategory);
export default router;