const home=require('./routes/home/home');
const {account}=require('./routes/teacher/account');
const course= require('./routes/course/course')
const mongoose=require('mongoose');
const dbDebug=require('debug')('DEBUG:database');
const express=require('express');
const app = express();
const bodyParser = require('body-parser')
const config = require('config')
app.set('view engine','ejs');

app.use(express.static("public"))
const db =config.get("db")
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/',home);
app.use('/teacher',account);
app.use('/course',course)
mongoose.connect(db)
  .then(
    (value)=>{console.log(`Connected to ${db} `);
    }
  )
  .catch((value) => {
    dbDebug('There was an error when trying to connect to the database')
    process.exit(1)
  }
  )


const port =process.env.PORT || 3000;
const server = app.listen(port,()=>{
    console.log(`Listening on port ${port}...`);
})

module.exports =server
