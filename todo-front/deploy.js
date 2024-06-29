const fs = require("fs")

const files = [
    {path:"/src/Todo/state/actions.js",developmentLine:3,productionLine:4},
    {path:"/src/Account/state/actions.js",developmentLine:3,productionLine:4},
    {path:"/src/GenAI/GenAi.jsx",developmentLine:8,productionLine:9}
]


files.map(async (file)=>{
    const env = process.argv[2] || "production"
    await readyFor(env,file.path,file.developmentLine,file.productionLine);
})



async function readyFor(env,file,line1=3,line2=4){
    fs.readFile(__dirname + file,'utf-8',(err, data) => {
        if (err) throw err;
        let d = data.split("\r\n")
        if (d[line2][0] == "/"){ // Already development urls in use
            if(env == "development") return;
            d[line1] = "// " + d[line1];
            d[line2] = d[line2].slice(3)
            fs.writeFile(__dirname + file, d.join("\r\n"), (err) => {
                if (err) throw err;
                else console.log("URLS changed for " + env);
                // console.log(err);
                // console.log(d.join("\r\n"))
            })
        }
        else if (d[line1][0] == "/"){ // Production urls  in use
            if(env == "production") return;
            d[line2] = "// " + d[line2];
            d[line1] = d[line1].slice(3)
            fs.writeFile(__dirname + file, d.join("\r\n"), (err) => {
                if (err) throw err;
                else console.log("URLS changed for " + env);
                // console.log(err);
                // console.log(d.join("\r\n"))
            })
        }
    
    })
    
}

