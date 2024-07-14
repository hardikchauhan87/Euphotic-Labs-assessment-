var {MongoClient}=require('mongodb')
url= `mongodb://127.0.0.1:27017/`
var client= new MongoClient(url);
      
async function connection(cname){
    let result=await client.connect();
    var db= result.db("Assesment")
    return db.collection(cname)
 
 }
 module.exports=connection
 