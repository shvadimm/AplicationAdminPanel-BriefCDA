import express from "express";
import {getHomePage} from "../src/controllers/HomeController.js";

const router = express.Router();

router.get("/", getHomePage);

export default router;