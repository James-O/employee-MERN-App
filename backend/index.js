const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const EmployeeModel = require('./models/employee')
const ImageModel = require('./models/image')

const app = express()
app.use(express.json())
app.use(cors({
    origin:[''],
    methods:["POST","GET","PUT","DELETE"],
    credentials:true
}))
app.use(express.static('public'))

// mongoose.connect('mongodb://localhost:27017/employee')
mongoose.connect('mongodb+srv://James:jamesdgr81A!@atlascluster.vzvs9.mongodb.net/employee')

//uploading images
const store = multer.diskStorage({
    destination:(req,file,cb)=>{
       cb(null,'public/images') 
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage:store
})

app.post('/upload', upload.single('file'), (req,res)=>{
    // console.log(req.file)
    ImageModel.create({image:req.file.filename})
    .then(image=>res.json(image))
    .catch(err=>res.json(err))
})
app.get('/getimage',(req,res)=>{
    ImageModel.find()
    .then(image=>res.json(image))
    .catch(err=>res.json(err))
})
// register an employee
app.post('/register', (req,res)=>{
    EmployeeModel.create(req.body)
    .then(employees=>res.json(employees))
    .catch(err=>res.json(err))
})

// login a registered employee
app.post('/login', (req,res)=>{
    const {email,password}=req.body;
    EmployeeModel.findOne({email:email})
    .then(employee=>{
        if(employee){
            if(employee.password === password){   
                res.json('success')
            }else{
                res.json('password is incorrect')
            }
        }else{
            res.json("Record doesn't exist")
        }
    })
})

// add employee to db
app.post('/create', (req,res)=>{
    EmployeeModel.create(req.body)
    .then(employee=>res.json(employee))
    .catch(err=>res.json(err))
})

// get single employee detail before update
app.get('/getuser/:id',(req,res)=>{
    const id = req.params.id
    EmployeeModel.findById({_id:id})
    .then(employee=>res.json(employee))
    .catch(err=>res.json(err))
})
// update single employee
app.put('/update/:id',(req,res)=>{
    const id = req.params.id
    EmployeeModel.findByIdAndUpdate({_id:id},{
        name:req.body.name,
        email:req.body.email,
        age:req.body.age,
        city:req.body.city,
    })
    .then(employee=>res.json(employee))
    .catch(err=>res.json(err))
})
// get all employee from db
app.get('/', (req,res)=>{
    EmployeeModel.find({})
    .then(employees=>res.json(employees))
    .catch(err=>res.json(err))
})

//delete a single employee from db
app.delete('/delete/:id',(req,res)=>{
    EmployeeModel.findByIdAndDelete({_id:req.params.id})
    .then(employee=>res.json(employee))
    .catch(err=>res.json(err))
})

// connect to server
app.listen(8081, ()=>{
    console.log('server is running')
})