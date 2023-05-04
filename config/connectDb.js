import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.CONNECTIONDB_URL);
        console.log("DB Connection established");
    } catch(error) {
        console.error("Db connection error");
    }
}

export default connectDB;