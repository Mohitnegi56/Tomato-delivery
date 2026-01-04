import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://tomatoapp:Mohitnegi%401234@cluster0.sewp2xy.mongodb.net/food-delivery"
        )
        console.log("DB Connected")
    } catch (error) {
        console.error("DB Error:", error.message)
        process.exit(1)
    }
}
