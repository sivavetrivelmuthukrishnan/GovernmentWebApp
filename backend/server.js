const express = require("express");
const mysql = require("mysql2");
const bodyparser = require("body-parser");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(express.static('public'));


const conn = mysql.createConnection(
  {
      host:'127.0.0.1',
      port:3306,
      user:'root',
      password:"Root",
      database :"Government"
  }

)

conn.connect(
    function(err){
        if(err){
            console.log("Error,",err);
            return;
            
        }
        console.log("Mysql Connected Successfully");
        
    }
)

app.post('/submit',(req,res)=>{
    const  {
        work_ ,
        zone,
        Organization_type,
        District, 
        Local_Body,
        Typeof_Core_Sanitary,
        NatureOf_Job ,
       Local_Body_last
    } = req.body;

    const sql = `insert into organiation(work_ ,
        zone,
        Organization_type,
        District, 
        Local_Body,
        Typeof_Core_Sanitary,
        NatureOf_Job ,
       Local_Body_last) values(?,?,?,?,?,?,?,?)`;

       conn.query(sql,[work_ ,
        zone,
        Organization_type,
        District, 
        Local_Body,
        Typeof_Core_Sanitary,
        NatureOf_Job ,
       Local_Body_last],
       (err,result)=>{
        if(err) throw err;
        res.send({message:"Data stored in successfully!"})
       }
    );

});

app.post('/add-details',(req,res)=>{
    const {
        firstname,
        lastname,
        gardion, 
        dob ,
        health_id ,
        Status_ ,
       Education ,
       Phone_Number ,
       Ration_No ,
      Aadhar_No,
      Community

    } = req.body;
    const sql = `insert into details(
        firstname,
        lastname,
        gardion, 
        dob ,
        health_id ,
        Status_ ,
       Education ,
       Phone_Number ,
       Ration_No ,
      Aadhar_No,
      Community) values(?,?,?,?,?,?,?,?,?,?,?) `;

   conn.query(sql,[
         firstname,
        lastname,
        gardion, 
        dob ,
        health_id ,
        Status_ ,
       Education ,
       Phone_Number ,
       Ration_No ,
      Aadhar_No,
      Community
   ],(err,result)=>{
    if(err) throw err;
     res.send({message:"Data stored in successfully!"});
   })   
})


app.post("/address",(req,res)=>{
    const {
        Door_No,
        Street_Name,
        village ,
        District,  
        Taluk ,
        Pincode
    }=req.body;

    const sql = `insert into address(Door_No,
        Street_Name,
        village ,
        District,  
        Taluk ,
        Pincode) values(?,?,?,?,?,?);`

     conn.query(sql,[ 
        Door_No,
        Street_Name,
        village ,
        District,  
        Taluk ,
        Pincode

     ],(result,err)=>{
        if(err) throw err;
        res.send({message:"Data stored in successfully"})

     }) 
});


app.get('/submit',(req,res)=>{
    const sql = 'select * from organiation';
    conn.query(sql,(err,result)=>{
        if(err){
            console.error("Error fetching data:",err);
            res.status(500).send("error retrieving data")

        }
        else{
            res.json(result)
        }
    });
});
app.listen(3000 ,()=>{
    console.log("Server running on http://localhost:3000");

    
})


    
