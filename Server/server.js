import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import multer from 'multer';
// import { resolveShowConfigPath } from '@babel/core/lib/config/files';
import 'dotenv/config';
import fs from 'fs';

// const db = mysql.createConnection({
//        host:'localhost',
//        port:8889,
//        user:'root',
//        password:'root',
//        database:'PhotoGallery'

// })

const db = mysql.createConnection({
  host: process.env.DBHOST,
  port: process.env.DBPORT,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBDATABASE

})

db.connect(error=>{
  // send an error if there is
  if(error) console.log('Sorry cannot connect to db: ', error );
  else console.log('Connected to mysql db');

})

const server = express();
server.use(cors());
server.use(express.json());
server.use(express.static('uploads'));



// need to make the folder accessible to public to be able to access images from client side. 

const storage = multer.diskStorage({
  // creating configuration here
  // allocating destination and giving file name (original)
  destination: function (req, file, cb) {
    cb(null, './uploads')
    // this is the name of the folder where you want the images to store 
  },
  filename: function (req, file, cb) {
   
    cb(null, file.originalname )
  // cb(null, Date.now() + '-' + file.originalname );
  // indicate what file name to give 

  }
})


const fileupload = multer({storage: storage})
// initiate multer // 



// file_fromC should match with name="" in inputfield in html. 
server.post('/upload', fileupload.single("file_fromC"),(req, res)=>{

  // console.log(req.file);
     res.json({fileupload:true, file:req.file});
});







// if it is exsiting node module, you don't need {}



// This tells node to apply json format to all data

server.get('/photos/:photoid', (req, res)=>{
  let query = "CALL `getPhotoById`(?);";
  db.query(query, [req.params.photoid], (error, photo)=>{
    if(error){
      res.json({photo:false, message:error})
    }else{
      res.json({photo:photo[0][0], message: "Return photo by ID"})
    }
  })
  
})



// CALL `addPhoto`(@p0, @p1, @p2, @p3);

server.get('/photos', (req, res)=>{
  let query = "CALL `getPhotos`()";
  db.query(query, (error, allphotos)=>{
    if(error){
      res.json({allphotos:false, message:error});
    }else{
      res.json({allphotos:allphotos[0], message:"returned photos"})
    }
  })
});



server.post('/photos', (req, res)=>{
  let query = "CALL `addPhoto`(?, ?, ?, ?)";
  // names of columns don't need to have the same name as client side. 
  db.query(query, [req.body.albumId_fromC, req.body.title_fromC, req.body.url_fromC, req.body.tn_fromC ] ,(error, newphoto)=>{
          if(error){
            res.json({newphoto:false, message:error});
          }else{
            res.json({newphoto:newphoto[0], message:"Photo added to the table"});
          }

})
});



server.delete('/photos/:id', (req, res)=>{

let query = " CALL `deletePhoto`(?)";

let getFilename = "CALL `photoById`(?)";

db.query(getFilename, [req.params.id], (error, data)=>{
  // res.json(data[0][0].url_fromC);
 if(error){
        res.json(error);

 }else{
  //  res.json(data[0][0].url);
  let file_to_be_deleted = data[0][0].url;
  fs.unlink('./uploads/' + file_to_be_deleted, (error)=>{
    if(error){
        // file path and callback function 
      res.json({delStatus:false, message:error})
    }else{
      db.query(query, [req.params.id], (error, deleteStatus)=>{
          if(error){
            res.json({delStatus:false, message:error})
          }else{
        
            let del_success = deleteStatus[0][0].DEL_SUCCESS; 
            if (del_success === 1){
            res.json({
              delStatus:deleteStatus[0][0].DEL_SUCCESS, message:"Successfully Deleted"
            })
          }else{
            res.json({delStatus:del_success, message:"ID not found"})
          }
        }
        
        })
      }
      })


 }
})

// db.query(query, [req.params.id], (error, deleteStatus)=>{
//   if(error){
//     res.json({delStatus:false, message:error})
//   }else{

//     let del_success = deleteStatus[0][0].DEL_SUCCESS; 
//     if (del_success === 1){
//     res.json({
//       delStatus:deleteStatus[0][0].DEL_SUCCESS, message:"Successfully Deleted"
//     })
//   }else{
//     res.json({delStatus:del_success, message:"ID not found"})
//   }
//   }

// })
})





// CALL `deleteCrudData`(@p0);

// server.delete('/deletcrud/:id' , (req, res)=>{
//   let id = req.params.id;
//   let query = "CALL `deleteCrudData`(?)"
//   db.query(query, [id], (error, data)=>{
//     if(error){
//        res.json({deleteData:false, message:error});
//     }else{
//       res.json({deleteData: true, message:"User deleted successfully"})
//     }
//   })
// })



// "CALL `crudDataById`(?)"


// server.get('/updateCrud/:id', (req, res)=>{
//   let id = req.params.id;
//   let dataById = "CALL `crudDataById`(?)";
//   // select statement// 
//   db.query(dataById, [id], (error, data, fields)=>{
//       if(error){
//         res.json({ErrorMessage: error});

//       }else{
//         res.json(data[0]);
//       }
//   })

// });

// server.put('/updateCrud', (req, res)=>{
//   let id= req.body.id;
//   let updateCrud = "CALL `updateCrudData`(?, ?)";
//   let input = req.body.input;

//   db.query(updateCrud,[id, input], (error, data)=>{
//     if(error){
//       res.json({ update: false, message: error });
//     }
//     else{
//       if(data.affectedRows === 0){
//         res.json({ update: false, message: "no affectedRows", data:data });
//       }else{
    
//       res.json({ update: true, message: "User successfully updated", data:data});
      
//       }
//     }

//   })
// })

// server.post('/newCrudData',(req, res)=>{
//   let input = req.body.input;
//   let newCrudData = "CALL `createCrudData`(?)";
//   db.query(newCrudData, [input], (error, data, fields)=>{
//     if(error) res.json({ErrorMessage: error});
//     else{
//       res.json({
//         message:"inserting new data was successful!",
//         newData:true})
//     }
//   })
// })


// server.get('/allCrudData',(req,res)=>{
//        let allCrudData = "CALL `All_crud_data`()";
//        db.query(allCrudData, (error, data, fields)=>{
           
//         if(error)
//         res.json({ErrorMessage: error
//           // console.log(error);
//          });        
//       else{
//         // res.json(data);
//         res.json(data[0]);
//         // console.log(data);
//       } 



//        })
// })


// let userID = req.body.UserID;
// let email = req.body.email;
// let password = req.body.password;
// let query = "CALL `updateUser`(?, ?, ?)";
// db.query(query, [userID, email, password], (error, data) => {
//   if(error){
//     res.json({ update: false, message: error });
//   }
//   else{
//     if(data.affectedRows === 0){
//       res.json({ update: false, message: error });
//     }else{
  
//     res.json({ update: true, message: "User successfully updated", data:data});
    
//     }
//   }
// })




// server.get('/employeesapi', (req, res) =>{
//       // let allEmpSP = "SELECT*FROM Employee";
//       let allEmpSP = "CALL `All_Emp_Data`()";
//       db.query(allEmpSP, (error, data, fields)=>{
//           // three call back function , show an error is there is, otherwise take data
//           //write a quesry in " "
//            // "SELECT*FROM Employee"
//           // CALL `All_Emp_Data`()
//           if(error)
//             res.json({ErrorMessage: error
//               // console.log(error);
//              });        
//           else{
//             // res.json(data);
//             res.json(data[0]);
//             // console.log(data);
//           } 
//       }) 
// })


// server.get('/employeesapi/:id', (req, res)=>{
//        let emp_id = req.params.id;
//        let empSP = "CALL `Single_Emp_data`(?)";
//        // select statement// 
//        db.query(empSP, [emp_id], (error, data, fields)=>{
//            if(error){
//              res.json({ErrorMessage: error});

//            }else{
//              res.json(data[0]);
//            }
//        })

// });

// server.post('/signUp',(req,res)=>{
//   let email = req.body.email;
//   let password = req.body.password;
//   let user_name= req.body.user_name;
//   console.log("works");

//   let addNewUser = "CALL `newusers`(?, ?, ?);"
//   db.query(addNewUser, [user_name, email, password], (error, data, fields)=>{
//     if(error){
//       res.json({ErrorMessage:error});
//     }else{
//       res.json({
//         message:"Sign Up successful!",
//         signUp:true
//       })
//     }
//   })

// })


// server.delete('/deleteuser/:id', (req, res)=>{
//   let UserID = req.params.id;
//   let query = "CALL `deleteUser`(?)";
//   db.query(query, [UserID], (error, data)=>{
//     if(error){
//        res.json({deleteUser:false, message:error});
//     }else{
//       res.json({deleteUser: true, message:"User deleted successfully"})
//     }
//   })
// })


// server.put('/updateUser', (req, res)=>{
//   let userID = req.body.UserID;
//   let email = req.body.email;
//   let password = req.body.password;

//   // those are three things receiving from the client 

//   let query = "CALL `updateUser`(?, ?, ?);"

//   db.query(query, [userID, email, password], (error, data, fields)=>{

//    if(error){
//      res.json({update:false, message:error});
//    }else{
//      res.json({update:true, message: "User successfully updated"});
//      console.log(userID);
//    }

//   })
// })
// ----- old version 
// creating an api end point
// server.put('/updateUser', (req, res) => {
//   let userID = req.body.UserID;
//   let email = req.body.email;
//   let password = req.body.password;
//   let query = "CALL `updateUser`(?, ?, ?)";
//   db.query(query, [userID, email, password], (error, data) => {
//     if(error){
//       res.json({ update: false, message: error });
//     }
//     else{
//       if(data.affectedRows === 0){
//         res.json({ update: false, message: error });
//       }else{
    
//       res.json({ update: true, message: "User successfully updated", data:data});
      
//       }
//     }
//   })
// });
//------- new version ---------
// server.put('/updateUser', (req, res) => {
//   let userID = req.body.UserID;
//   let email = req.body.email;
//   let password = req.body.password;
//   let query = "CALL `updateUser`(?, ?, ?)";
//   db.query(query, [userID, email, password], (error, data) => {
//     if(error){
//       res.json({ update: false, message: error });
//     }
//     else{
//       if(data.affectedRows === 0){
//         res.json({ update: false, message: error });
//       }else{
    
//       res.json({ update: true, message: "User successfully updated", data:data});
      
//       }
//     }
//   })
// });

// server.get('/user/:id', (req, res)=>{
//      let userID = req.params.id;

//      let query =  "CALL `getUser`(?)"
//      db.query(query, [userID], (error, data)=>{
//        if(error){
//          res.json({user:false, message:error})
//        }else{
//          if(data[0].length === 0 ){
//            res.json({user:false, message:"No user with that ID exists"})
//          }else{
//            res.json({user:true, message:"User found", userData:data[0]});
//          }
//        }
//      })
//      // id comes from the url // 


// })

// testing api 
// server.post('/signup', (req, res)=>{
//   // request should contain emaiil, passowrd, name
//   let email = req.body.email;
//   let password = req.body.password;
//   let query = "CALL `newusers`(?, ?, ?)";
//   db.query(query, [email, password], (error, data)=>{
//        if(error){ res.json({ newuser:false, message: error })
//   }else{
//     res.json({newuser: true, message:"New user"})
//   }

// })


// server.post('/login', (req, res)=>{
//        let email = req.body.email;
//        let password = req.body.password;
//       //  db.query = "SELECT * FROM `users` WHERE users.email = `${emial}` AND users.password = `${password}`";

//       let loginQuery = 'CALL `login`(?, ?);'

//       db.query(loginQuery, [email, password], (error, data, fields)=>{
//         if(error){
//           res.json({ErrorMessage:error});
//         }else{
//           if(data[0].length === 0){
//             res.json({data:data[0], login: false, message: "Sorry, you have provided wrong credentials"})
//           }else{
//             res.json({
//               // data:data[0],
//               UserID:data[0].UserID, 
//               email:data[0].email, 
//               data:data[0],
//               login: true, 
//               message: "Login successful"});
//               // create the Auth key
//           }
//         }
//       })


// })

// let jsonData = [{
//     "albumId": 1,
//     "id": 1,
//     "title": "accusamus beatae ad facilis cum similique qui sunt",
//     "url": "https://via.placeholder.com/600/92c952",
//     "thumbnailUrl": "https://via.placeholder.com/150/92c952"
//   },
//   {
//     "albumId": 1,
//     "id": 2,
//     "title": "reprehenderit est deserunt velit ipsam",
//     "url": "https://via.placeholder.com/600/771796",
//     "thumbnailUrl": "https://via.placeholder.com/150/771796"
//   },
//   {
//     "albumId": 1,
//     "id": 3,
//     "title": "officia porro iure quia iusto qui ipsa ut modi",
//     "url": "https://via.placeholder.com/600/24f355",
//     "thumbnailUrl": "https://via.placeholder.com/150/24f355"
//   },
//   {
//     "albumId": 1,
//     "id": 4,
//     "title": "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
//     "url": "https://via.placeholder.com/600/d32776",
//     "thumbnailUrl": "https://via.placeholder.com/150/d32776"
//   },
//   {
//     "albumId": 1,
//     "id": 5,
//     "title": "natus nisi omnis corporis facere molestiae rerum in",
//     "url": "https://via.placeholder.com/600/f66b97",
//     "thumbnailUrl": "https://via.placeholder.com/150/f66b97"
//   },
//   {
//     "albumId": 1,
//     "id": 6,
//     "title": "accusamus ea aliquid et amet sequi nemo",
//     "url": "https://via.placeholder.com/600/56a8c2",
//     "thumbnailUrl": "https://via.placeholder.com/150/56a8c2"
//   },
//   {
//     "albumId": 1,
//     "id": 7,
//     "title": "officia delectus consequatur vero aut veniam explicabo molestias",
//     "url": "https://via.placeholder.com/600/b0f7cc",
//     "thumbnailUrl": "https://via.placeholder.com/150/b0f7cc"
//   },
//   {
//     "albumId": 1,
//     "id": 8,
//     "title": "aut porro officiis laborum odit ea laudantium corporis",
//     "url": "https://via.placeholder.com/600/54176f",
//     "thumbnailUrl": "https://via.placeholder.com/150/54176f"
//   },
//   {
//     "albumId": 1,
//     "id": 9,
//     "title": "qui eius qui autem sed",
//     "url": "https://via.placeholder.com/600/51aa97",
//     "thumbnailUrl": "https://via.placeholder.com/150/51aa97"
//   }]



  // server.get('/photosapi', (req,res) =>{
  //        res.json(jsonData);
  // })
  // api structure// 
  // req is data from the client to the server
  // res is data from the server to the client


  // server.get('/photosapi/:photoid', (req, res)=>{
  //     let id_from_client = req.params.photoid;
  //     // contain the number that was sent from the client
  //     // the name should show up once I typed params. 
  //     // this :photoid is coming from the client

  //     res.json(jsonData.find(x=>x.id == id_from_client))
  //     // x is the temprary variable which indicates the objects in the json
  //     // This is where photoid passed from client is connected to jason id. 
  // })


server.listen(4400, function(){
    console.log('Server is successfully running on port 4400');
   
});

