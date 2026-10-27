
const connectDB = require("./src/DB/db");

async function StartServer() {
    try{
        const app = require('./src/app')
        await connectDB();
        app.listen(3000,()=>{
            console.log("Running on port 3000")
        });
    }
    catch(e){
        console.log("error",e);
    }
}
StartServer().catch((error)=>{

    console.error("Failed")
    process.exitCode = 1
});
