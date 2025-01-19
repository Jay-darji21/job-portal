import mongoose from "mongoose"

const connectDb = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Db connect successfully");
    }
    catch(error){
        console.log(error);
    }
}

export default connectDb;