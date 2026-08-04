import mongoose from 'mongoose';

const connectDB  = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            dbname: "Ecommerce2026",
        });
        console.log("MongoDB Connected")
    } catch (error) {
        console.log(error)
    }
}


export default connectDB;