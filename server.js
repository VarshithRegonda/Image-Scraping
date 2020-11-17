 var AWS = require('aws-sdk');
AWS.config.loadFromPath("./config.json");
const express = require('express')
const async = require('async')
AWS.config.apiVersions = {
  rekognition: '2016-06-27',
  // other service API versions
}
process.setMaxListeners(Infinity);
const rekognition = new AWS.Rekognition()
const bodyParser = require('body-parser');
const fs = require('fs');
const { json } = require('body-parser');
const { concat } = require('async');
const { waitForDebugger } = require('inspector');
const { response } = require('express');
const request = require("request").defaults({ encoding: null });
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

  
// let url = "https://www.whoi.edu/wp-content/uploads/2020/04/beach-stairs.jpg";
// request.get(url, function (err, re, body) {
//   const buffer = new Buffer.from(body);
//   const parms={ Image:{
//     Bytes:buffer,
// },
// MaxLabels:10
// }
// rekognition.detectLabels(parms,function(err,data){
//   if(err){
//       console.log(err)
//   }
//   else{
      
//       return  res.json(data)
//   }

// })
// });
 
 let obj= req.body
//  console.log(obj)

 
 
  
 let type = typeof obj;
 

   
//   obj.map(function (ob) {
     
//      request.get(ob,(err,re,body)=>{
//        console.log(ob)
//       const buffer = new Buffer.from(ob,'base64');
      
    
//       const parms={ Image:{
//               Bytes:buffer,
//           },
//           MaxLabels:10
//           }
//           rekognition.detectLabels(parms,async (err,data)=>{
//                 // if(!err){
//                 //   //  console.log(data)
//                 //     return await data
//                 //     ;
//                 //   }
            
                   
                 
            
//                      return await res.json( data)
                
                
//               })
                
              
//      console.log()

   
    
 
              
//    });
  
//   })

// }        

let url= obj

let requests = []


// Promise.all waits until all jobs are resolved
Promise.all(url).then(resonses => resonses.forEach( resonse => {
request.get(resonse,function(err, re, body){
  const buffer = new Buffer.from(body);
  const parms =     {
    Image: {
      Bytes: buffer,
    },
    MaxLabels: 10,
  };rekognition.detectLabels(parms, async function (err, data) {
    //  req.setHeader(‘Content-Type’, ‘application/json’)
    if (!err) {
      
     await  requests.push((data.Labels));
     
    }



  }).promise()
  .then(()=>{ return res.json (requests)})


  
})


})).catch((err)=>{return res.json(err)})



// for(i in url  ){

  
//   // 200, {‘content-type’:‘application/json’, ‘content-length’:Buffer.byteLength(json)}
//   request.get(url[i],  function (err, re, body) {
//     const buffer = new Buffer.from(body);
//     // console.log(buffer);
//     const parms = {
//       Image: {
//         Bytes: buffer,
//       },
//       MaxLabels: 10,
//     };
//     rekognition.detectLabels(parms, async function (err, data) {
//       //  req.setHeader(‘Content-Type’, ‘application/json’)
//       if (!err) {
        
//        await  result.push(data.Labels);
       
//       }
//  console.log(result)
      
//     });

//   });

// }









  // for(i in url  ){
  //   // 200, {'content-type':'application/json', 'content-length':Buffer.byteLength(json)}
  //   request.get(url[i], function (err, re, body) {
  //     console.log(typeof(body))
  //     const buffer = new Buffer.from(body);
  //     // console.log(buffer)
  //     const parms={ Image:{
  //       Bytes:buffer,
  //   },
  //   MaxLabels:10
  //   }
      
  //   rekognition.detectLabels(parms,function(err, response) {
  //     if (err) {
  //       console.log(err, err.stack); // an error occurred
  //     } else {
  //       // console.log(`Detected labels for: ${photo}`)
        
  //        // for response.labels
  //      let  t= response
  //       console.log(t)
  //     } // if
  //   });


  //   })
  
  
  

  // }
  
  
})

app.listen('3003')