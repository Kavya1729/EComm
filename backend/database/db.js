import { blue, red, bold } from "colorette";
import mongoose from "mongoose"

const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(bold(blue("Database connected successfully")));
    } catch (error) {
        console.log(red("Database connection failed", error));
    }
}
export default connectdb;