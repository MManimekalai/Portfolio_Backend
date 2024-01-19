const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

const app=express();

app.use(cors({origin:"*"}));
app.use(express.json());

dotenv.config();

app.post("/",async(req,res)=>{
    try {
        const email=req.body.email;
        const subject=req.body.subject;
        const message=req.body.message;
        let transporter = nodemailer.createTransport({
            service:'gmail',
            auth: {
              user: process.env.USER, 
              pass: process.env.PASS,
            },
          });
        
          let info = await transporter.sendMail({
            from: process.env.USER,
            to: process.env.TO,
            subject: subject,
            html: `<b>email : ${email}</b><br/>
                    <b>Message : ${message}<b/>`, 
          });
          res.status(200).json({message:"success"})
    } catch (error) {
        res.status(200).json({message:"Error",error})
    }
    
})

const port = process.env.PORT;
app.listen(port,()=>console.log("Listening",port))