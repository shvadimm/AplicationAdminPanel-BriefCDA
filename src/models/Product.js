import mongoose from "mongoose";
import Category from "./Category.js";
const {Schema} = mongoose;

const productSchema = new Schema({
    productName: {
        type: String,
        required: true,
        unique: true,
    },
    productPrice: {
        type: Number,
        required: true,
    },
    productDescription: {
        type: String,
        required: true,
    },
    productCategory: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Category",
    }
});

const Product = mongoose.model("product", productSchema);

export default Product;