const fs = require("fs")

fs.readFile(__dirname + '/src/Account/state/actions.js','utf-8',(err, data) => {
    if (err) throw err;
    let d = data.split("\r\n")
    console.log(d);
    if (d[4][0] == "/"){
        d[3] = "// " + d[3];
        d[4] = d[4].slice(3)
    
        fs.writeFile(__dirname + '/src/Account/state/actions.js',d.join("\r\n"), (err) => {
            if (err) throw err;
            else console.log("Production urls");
        })
    }
    else if (d[3][0] == "/"){
        d[4] = "// " + d[4];
        d[3] = d[3].slice(3)
    
        fs.writeFile(__dirname + '/src/Account/state/actions.js',d.join("\r\n"), (err) => {
            if (err) throw err;
            else console.log("Local urls");
        })
    }

})

fs.readFile(__dirname + '/src/Todo/state/actions.js','utf-8',(err, data) => {
    if (err) throw err;
    let d = data.split("\r\n")
    console.log(d);
    if (d[4][0] == "/"){
        d[3] = "// " + d[3];
        d[4] = d[4].slice(3)
        fs.writeFile(__dirname + '/src/Todo/state/actions.js', d.join("\r\n"), (err) => {
            if (err) throw err;
            else console.log("Production urls");
            // console.log(d.join("\r\n"))
        })
    }
    else if (d[3][0] == "/"){
        d[4] = "// " + d[4];
        d[3] = d[3].slice(3)
        fs.writeFile(__dirname + '/src/Todo/state/actions.js', d.join("\r\n"), (err) => {
            if (err) throw err;
            else console.log("Local urls");
            // console.log(d.join("\r\n"))
        })
    }

})

