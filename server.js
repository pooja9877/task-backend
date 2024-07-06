const express = require('express');
const mongoose = require('mongoose');
const companyRoutes = require('./routes/companies');
const cors = require('cors');
const path = require('path')
const app = express();
const PORT = 5000;
const MONGODB_URI = 'mongodb+srv://nidhidhiman:nidhi123@cluster0.rcko1if.mongodb.net/test'; 
app.use(cors());
app.use(express.json());
app.use('/',companyRoutes);

app.use(express.urlencoded({extended: true}))
app.use('/uploads', express.static('uploads'));
mongoose.connect(MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => app.listen(5000, () => console.log('listen on port 5000.'))).catch((error) => console.log("error occured", error))