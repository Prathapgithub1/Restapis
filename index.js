const express=require('express');
const mongoose=require('mongoose');
const BrandName=require('./model')
const app=express();
app.use(express.json())//middleware
const port=3000;

mongoose.connect("mongodb+srv://Prathap:Prathap123@cluster0.v4jza7t.mongodb.net/",
{useUnifiedTopology:true,useNewUrlParser:true})
.then(()=>console.log('DB connected'))
.catch(err => console.log(err))

//post method 
app.post('/addbrands',async(req,res)=>{
    const {brandName}=req.body;
    try {
        const newData=new BrandName({brandName});
        await newData.save();
        return res.json( await BrandName.find())
        
    } catch (error) {
        console.log(error.message)
    }
});
//get the data from server

app.get('/getallbrands', async(req,res)=>{
    try {
        const getAllData= await BrandName.find();
        return res.json(getAllData);
    } catch (error) {
        console.log(error.message)
    }
    
});

//get method like if you want id base url 
app.get('/getallbrands/:id', async (req,res)=>{
    try {
        const Data= await BrandName.findById(req.params.id);
        return res.json(Data);
    } catch (error) {
        console.log(error.message)
    }
});

app.delete('/deleteBrand/:id',async(req,res)=>{
    try {
        await BrandName.findByIdAndDelete(req.params.id);
        return res.json(await BrandName.find());
    } catch (error) {
        console.log(error.message)
    }
});

app.put('/updateBrand/:id', async (req,res)=>{
    try {
       await BrandName.findByIdAndUpdate(req.params.id,{$set:{brandName:req.body.brandName}},{new:true});
        return res.json(await BrandName.find())
    } catch (error) {
        console.log(error.message)
    }
});
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
});
