const app = require('./src/app')
const connectDB = require("./src/DB/db");

async function StartServer() {
    await connectDB();
    app.listen(3000,()=>{
        console.log("Running on port 3000")
    });

}
StartServer().catch((error)=>{

    console.error("Failed")
    process.exitCode = 1
});
