// requiring modules both internal e.g https and external that will help in code execution and running our servers
const express=require('express');
const bodyParser=require('body-parser');
const request=require("request");
const https=require("https");

const app=express();

// allows us to use the css files incorporated in our html files
app.use(express.static("public"));
// allows us to use the body-parser package.body parser helps us access all the data written in forms
app.use(bodyParser.urlencoded({extended:true}));


// method that specifies what browser should display when localhost:3000/ is called.does not specofy action to be taken when data is inputted
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
})

// method that specifies what the browser should display if data was installed into it.
// the function specifies what should happen upon the request from client browser and the response from server to client browser
app.post("/",function(req,res){
const email=req.body.yourEmail;
const name=req.body.firstName;
const lastName=req.body.lastName;
// console.log(email, name);


// creating objects that we want to send to the website where we want to store data contained inside our objects
 //synatax we acquired it through mailchimps website
const data={
  members:[{
    email_address:email,
    status:'subscribed',
    merge_fields:{
      FNAME:name,
      LNAME:lastName
    }
  }]
};
// changing the object to json string format
const jsonData=JSON.stringify(data);

const url=  'https://us5.api.mailchimp.com/3.0/lists/c7a1fc43bd';
const options={
  method:"POST",
  auth:"Twalib:bea29e8842f953bff6de078502c378ec-us5"
}

const request=https.request(url,options,function(response){
  if (response.statusCode===200) {
    res.sendFile(__dirname+"/success.html");
  }else{
    res.sendFile(__dirname+"/failure.html");
  }

  response.on("data",function(data){
    console.log(JSON.parse(data));
  })
})
request.write(jsonData);
request.end();


});

app.post("/failure",function(req,res){
  res.redirect("/")
});



// basically shows us what port our site should run on.Servers should listen to this port before submitting the app.get request
app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on port 3000");
})








// list id
// c7a1fc43bd
// API KEY
// api key=bea29e8842f953bff6de078502c378ec-us5
