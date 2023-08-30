// saving db 
let db;

// indexedDB initialization
function create_indexedDB (dbname,v){
    // Generating IDBOpenDBRequest Object
    const request = window.indexedDB.open(dbname,v);

    // adding event handlers
    request.onupgradeneeded = (event)=>{
        const db1 = event.target.result;
        db = event.target.result;
        // creating objectStore for todos
        const objectStore = db1.createObjectStore('todos',{ keyPath: 'id' });

    }

    request.onerror = (event)=>{
        console.log(event.target.errorCode);
    }

}

// adding data in indexedDB
function addIn ( data){
    let ack ;
    if(db){
        db.transaction('todos','readwrite').objectStore('todos').add(data).onsuccess = (event)=>{
            ack = true;
        }
    }
    return ack; 
}

// deleting data in indexedDB
function deleteThe (id) {
    let ack;
    if(db){
        db.transaction('todos','readwrite').objectStore('todos').delete(id).onsuccess = event =>{
            ack = true;
        }
    }
    return ack;
}

// get the data 
function get(id) {
    let res ;
    if(db){
        db.transaction('todos').objectStore('todos').get(id).onsuccess = event => {
            res = event.target.result;
        }
    }
    return res;
}

// update the data
function put(data) {
    let ack;
    if(db){
        db.transaction('todos').objectStore('todos').put(data).onsuccess = event => {
            ack = true;
        }
    }
    return ack;
}

// get all todos
function getAll () {
    let res;
    if(db){
        db.transaction('todos').objectStore('todos').getAll().onsuccess = event => {
            res = event.target.result;
        }
    }
    return res;
}

export {
    create_indexedDB,
    addIn,
    deleteThe,
    get,
    put,
    getAll,
}