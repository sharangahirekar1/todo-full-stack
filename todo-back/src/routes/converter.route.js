const express = require("express");
const fs = require("fs/promises");

const converterRouter = express.Router();

const read = async (file) =>{
    const data = await fs.readFile(file, {encoding: 'utf-8'})
    
    console.log(data, 'data read');

    return data.split("\r\n");
}

function setKeys(keys, i, obj,value){
    if( i == keys.length-1){
        obj[keys[i]] = value
        return
    }
    obj[keys[i]] = {}
    setKeys(keys,i+1,obj[keys[i]],value)
}

converterRouter.post("/csv2json", async(req,res)=>{
    try {
        const files = req.body.files;
        for(let i = 0; i < 1; i++){
            const {base64} = files[i];
            const d = Buffer.from(base64,"base64").toString("utf-8");
            console.log(d," data of the file");
            const [f,...r] = d.split("\r\n");

            const columns = f.split(",");

            console.log("columns: ",columns)
            const data = [];
        
            for(let i = 0; i < r.length; i++){
                let obj = {};
                let record = r[i].split(",");
                for(let j = 0; j < columns.length; j++){
                    let col = columns[j];
                    let keys = col.split(".");
                    if(keys.length == 1) {
                        obj[columns[j]] = record[j];
                    }else {
                        setKeys(keys,0,obj,record[j]);
                    }
                    
                }
                data.push(obj);
            }
        
            console.log("data in json", data);

            res.send({msg: "Converted successfully", data})
        }

    }catch(err){
        console.log("error while converting csv to json", err);
    }
})

converterRouter.post("/csv2json/from_file",async(req,res)=>{

})

module.exports = converterRouter;