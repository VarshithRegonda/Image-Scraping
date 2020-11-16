 var AWS = require('aws-sdk');
AWS.config.loadFromPath("./config.json");
const express = require('express')
const rekognition = new AWS.Rekognition()
const bodyParser = require('body-parser');
const fs = require('fs');
const { json } = require('body-parser');
var request = require("request").defaults({ encoding: null });
// App
// const imagerouter= require('./routes/images')
const app = express()
// Morgan
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text())

// AWS.config.update({
//     accessKeyId: "AKIA526JIYRBTHT6QBFS",
//     secretAccessKey: "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",
//     region: "us-east-1",
//   });

//   });

app.get('/', (req, res) => {
    res.json({ message: 'Hello world' })
})
// app.use('/use', imagerouter)
app.post('/image/', (req, res) => {
       
    
    // const url = "https://blkboxassets.s3.amazonaws.com/media/121871685_23845946091360553_5581094706740889931_n.jpg"

  
let url = "https://www.whoi.edu/wp-content/uploads/2020/04/beach-stairs.jpg";
request.get(url, function (err, re, body) {
  const buffer = new Buffer.from(body);
  const parms={ Image:{
    Bytes:buffer,
},
MaxLabels:10
}
rekognition.detectLabels(parms,function(err,data){
  if(err){
      console.log(err)
  }
  else{
      
      return  res.json(data)
  }

})
});
    
 
 
 let obj= req.body


 console.log(obj[0])


 let result =[]
 for(i in obj)
 {

  result.push( Buffer.from(obj[i]).toString('base64'))

 }
 
  
//  fs.readFile('./download.jpg',(err,data)=>{
//     const buffer = new Buffer.from(data)
//     // console.log(buffer)
//    const parms={ Image:{
//         Bytes:buffer,
//     },
//     MaxLabels:10
//    }
//   rekognition.detectLabels(parms,function(err,data){
//       if(err){
//           console.log(err)
//       }
//       else{
//           res.json(data)
//       }

//   })

// })

 // create a new buffer out of the string passed to us by fs.readFile()

 // now that we have things in the right type, send it to rekognition


     
   
 
          
       
  
})
// Starting server
app.listen('3003')