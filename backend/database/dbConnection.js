import mongoose from "mongoose"; //just mongoose import!
import dotenv from "dotenv"
dotenv.config()

//Database connection here!
 const dbConnection  = ()=>{
    mongoose.connect(process.env.DB_URL,{
       dbName: "Job_Portal"

    }).then(()=>{ //connect aipothe
       console.log("MongoDB Connected Sucessfully !")
    }).catch((error)=>{ // connect avvakapothe
        console.log(`Failed to connect ${error}`)
    })
    
}
export default dbConnection;