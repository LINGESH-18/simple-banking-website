var express = require('express')
var app=express();
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
var ejs=require('ejs')

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.use(express.static("public"));

app.listen(3000,function(err){
  if(err){
    console.log(err);
  }
  else{
    console.log('working on port 3000');
  }
})

app.get('/', function(req,res){
  res.render('index');
})

mongoose.connect("mongodb://localhost:27017/bankdatabase", {useNewUrlParser: true,useUnifiedTopology: true});

var bankschema={
  Name:String,
  AccountNo:Number,
  Cash:Number
}

var accountDetail=mongoose.model('accountDetail',bankschema);
let person_name,person_account,person_cash;
const person_array=[]
app.post('/', function(req,res){
  console.log('the post function is working');
  person_name=req.body.a1
  person_account=req.body.a2
  person_cash=req.body.a3;
  person= new accountDetail({
    Name:person_name,
    AccountNo:person_account,
    Cash:person_cash

  })


  accountDetail.insertMany(person)
  res.redirect('/')
  })

  app.get('/ad',function(req,res){
    accountDetail.find({},function(err,founditem){
      if(!err){
        console.log(founditem);
        res.render('accountdetail',{docs:founditem})

      }
    })

  })
