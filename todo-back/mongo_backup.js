const dotenv = require("dotenv");
const cron = require("node-cron");
const { spawn } = require("child_process");
const path = require('path');
dotenv.config();

const db = process.env.MONGODB_NAME;
const ARCHIVE_PATH = path.join(__dirname, `${db}.gzip`);

function backUpMongoDb(){
    const child = spawn("mongodump", [`--db=${db}`, `--archive=${ARCHIVE_PATH}`, `--gzip`])

    child.stdout.on("data", (data)=>{
        console.log("stdout:\n",data);
    })

    child.stderr.on("data", (data)=>{
        console.log('stderr:\n', Buffer.from(data).toString())
    })

    child.on("error",(err)=>{
        console.log("err:\n",err);
    })

    child.on("exit",(code, signal)=>{
        if (code) console.log("process exited with code:",code);
        else if (signal) console.log("process killed with signal:", signal);
        else console.log("Backup is successfull✅");
    })
}

cron.schedule("*/2 * * * *", ()=>backUpMongoDb())