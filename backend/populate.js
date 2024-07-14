var express=require('express')
var app=express()
var data =require('./data')
var connect=require('./connect')
const cors = require('cors')
app.use(express.json())
app.use(cors())



//used  postman to populate data in mongodb
app.post("/Insert",async function(req,resp){
    const collection=await connect("dishes")
    const response=await collection.insertMany(data)
    console.log(response)
    resp.send(response)
    resp.end()
});
app.get("/fetch",async function(req,resp){
    const collection=await connect("dishes")
    const response=await collection.find().toArray()
    
    resp.send(response)
    resp.end()
})

app.put('/update/:dishld', async (req, res) => {
    try {
        const { dishld } = req.params;
        const { isPublished } = req.body;

        console.log(`Updating dish with id: ${dishld} to isPublished: ${isPublished}`);

        const collection = await connect('dishes');
        const response = await collection.updateOne(
            { dishld: dishld }, 
            { $set: { isPublished: isPublished } } 
        );

        if (response.modifiedCount === 0) {
            return res.status(404).json({ message: 'Dish not updated' });
        }

        res.json({ message: `Updated isPublished status to ${isPublished} successfully`, updatedDishId: dishld });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating data', error: err.message });
    }
});




app.listen(3010,console.log("server running"))