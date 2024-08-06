import React from 'react';
import axios from "axios";

const ConverterCSVJSON = () => {
    const [payload, setPayload] = React.useState({});
    const [response, setResponse] = React.useState("");
    const user = JSON.parse(localStorage.getItem("user"));
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });
    const handleConvert = async ()=>{
        let res = await axios({
            method: "POST",
            url:"http://localhost:8111/converter/csv2json",
            data: payload,
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer "+user.token
            }
        })

        console.log("response from converter api", res.data);
        if (res && res.data && res.data.data) setResponse(JSON.stringify(res.data.data));
    }
  return (
    <div>
      <h2>Convert CSV to JSON</h2>
      <div style={{
        display: "flex",
        gap: "10px"
      }}>
        <div>
            <input type='file' multiple='multiple' onChange={async (ev)=>{
                const files = ev.target.files;
                const base64Arr = [];
                for(let i = 0; i < files.length; i++){
                    const file = files[i];
                    const base64 = await toBase64(file);
                    console.log(base64.slice(21), 'base64 format')
                    base64Arr.push({base64: base64.slice(21), mimeType: file.type})
                }
                setPayload({ files: base64Arr});
            }}/>
            <button onClick={handleConvert}>Convert</button>
        </div>
        <div>
            <textarea rows={25} cols={33} value={response}/>
        </div>
      </div>
    </div>
  )
}

export default ConverterCSVJSON
