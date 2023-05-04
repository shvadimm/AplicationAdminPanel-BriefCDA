import express from "express";
import connectDb from "./config/connectDb.js";
import bodyParser from "body-parser";
import session from 'express-session';
import flash from "connect-flash";
import productRouter from "./routes/ProductRoute.js";
import path from "path";
import dotenv from "dotenv";
import homeRouter from "./routes/HomeRoute.js";
import auth from "./routes/authRoute.js"
import categoryRouter from "./routes/CategoryRoute.js";


dotenv.config();

connectDb();
const __dirname = path.resolve();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'key',
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use(homeRouter);
app.use(categoryRouter);
app.use(productRouter);
app.use(auth)

app.set("view engine", "ejs");
app.set("views", "src/views");
app.use('/js', express.static(__dirname + '/public/assets/js'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap'));




app.listen(8082, () => {
    console.log('Server listening on port 8082');
});