import cookieParser from "cookie-parser"
import express from "express"
import cors from 'cors'
import dotenv from 'dotenv'
import connectDb from "./Utils/db.js"
import userRouter from "./Routes/user.route.js"
import companyRouter from "./Routes/company.route.js"
import jobRouter from "./Routes/jobs.route.js"
import applicatonRouter from "./Routes/application.route.js"

dotenv.config({});

const app = express();



// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOption = {
    origin : 'http://localhost:5173',
    credentials : true
}

app.use(cors(corsOption));

// API's

app.use("/api/v1/user",userRouter);
app.use("/api/v1/company",companyRouter);
app.use("/api/v1/job",jobRouter);
app.use("/api/v1/applicants",applicatonRouter)


const PORT = process.env.PORT || 3002;
app.listen(PORT,()=>{
    connectDb();
    console.log(`Server is running on port ${PORT}`);
})

