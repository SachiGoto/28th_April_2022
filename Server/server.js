import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const db = mysql.createConnection({
       host:'localhost',
       port:8889,
       user:'root',
       password:'root',
       database:'Employees'

})

// if it is exsiting node module, you don't need {}

const server = express();
server.use(cors());
server.use(express.json());
// This tells node to apply json format to all data

db.connect(error=>{
      // send an error if there is
      if(error) console.log('Sorry cannot connect to db: ', error );
      else console.log('Connected to mysql db');

})



server.get('/employeesapi', (req, res) =>{
      // let allEmpSP = "SELECT*FROM Employee";
      let allEmpSP = "CALL `All_Emp_Data`()";
      db.query(allEmpSP, (error, data, fields)=>{
          // three call back function , show an error is there is, otherwise take data
          //write a quesry in " "
           // "SELECT*FROM Employee"
          // CALL `All_Emp_Data`()
          if(error)
            res.json({ErrorMessage: error
              // console.log(error);
             });        
          else{
            // res.json(data);
            res.json(data[0]);
            // console.log(data);
          } 
      }) 
})


server.get('/employeesapi/:id', (req, res)=>{
       let emp_id = req.params.id;
       let empSP = "CALL `Single_Emp_data`(?)";
       // select statement// 
       db.query(empSP, [emp_id], (error, data, fields)=>{
           if(error){
             res.json({ErrorMessage: error});

           }else{
             res.json(data[0]);
           }
       })

});

server.post('/signUp',(req,res)=>{
  let email = req.body.email;
  let password = req.body.password;
  let user_name= req.body.user_name;
  console.log("works");

  let addNewUser = "CALL `newusers`(?, ?, ?);"
  db.query(addNewUser, [user_name, email, password], (error, data, fields)=>{
    if(error){
      res.json({ErrorMessage:error});
    }else{
      res.json({
        message:"Sign Up successful!",
        signUp:true
      })
    }
  })

})


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

server.put('/updateUser', (req, res) => {
  let userID = req.body.UserID;
  let email = req.body.email;
  let password = req.body.password;
  let query = "CALL `updateUser`(?, ?, ?)";
  db.query(query, [userID, email, password], (error, data) => {
    if(error){
      res.json({ update: false, message: error });
    }
    else{
      if(data.affectedRows === 0){
        res.json({ update: false, message: error });
      }else{
    
      res.json({ update: true, message: "User successfully updated", data:data});
      
      }
    }
  })
});

server.get('/user/:id', (req, res)=>{
     let userID = req.params.id;

     let query =  "CALL `getUser`(?)"
     db.query(query, [userID], (error, data)=>{
       if(error){
         res.json({user:false, message:error})
       }else{
         if(data[0].length === 0 ){
           res.json({user:false, message:"No user with that ID exists"})
         }else{
           res.json({user:true, message:"User found", userData:data[0]});
         }
       }
     })
     // id comes from the url // 


})

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


server.post('/login', (req, res)=>{
       let email = req.body.email;
       let password = req.body.password;
      //  db.query = "SELECT * FROM `users` WHERE users.email = `${emial}` AND users.password = `${password}`";

      let loginQuery = 'CALL `login`(?, ?);'

      db.query(loginQuery, [email, password], (error, data, fields)=>{
        if(error){
          res.json({ErrorMessage:error});
        }else{
          if(data[0].length === 0){
            res.json({data:data[0], login: false, message: "Sorry, you have provided wrong credentials"})
          }else{
            res.json({
              // data:data[0],
              UserID:data[0].UserID, 
              email:data[0].email, 
              data:data[0],
              login: true, 
              message: "Login successful"});
              // create the Auth key
          }
        }
      })


})

let jsonData = [{
    "albumId": 1,
    "id": 1,
    "title": "accusamus beatae ad facilis cum similique qui sunt",
    "url": "https://via.placeholder.com/600/92c952",
    "thumbnailUrl": "https://via.placeholder.com/150/92c952"
  },
  {
    "albumId": 1,
    "id": 2,
    "title": "reprehenderit est deserunt velit ipsam",
    "url": "https://via.placeholder.com/600/771796",
    "thumbnailUrl": "https://via.placeholder.com/150/771796"
  },
  {
    "albumId": 1,
    "id": 3,
    "title": "officia porro iure quia iusto qui ipsa ut modi",
    "url": "https://via.placeholder.com/600/24f355",
    "thumbnailUrl": "https://via.placeholder.com/150/24f355"
  },
  {
    "albumId": 1,
    "id": 4,
    "title": "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
    "url": "https://via.placeholder.com/600/d32776",
    "thumbnailUrl": "https://via.placeholder.com/150/d32776"
  },
  {
    "albumId": 1,
    "id": 5,
    "title": "natus nisi omnis corporis facere molestiae rerum in",
    "url": "https://via.placeholder.com/600/f66b97",
    "thumbnailUrl": "https://via.placeholder.com/150/f66b97"
  },
  {
    "albumId": 1,
    "id": 6,
    "title": "accusamus ea aliquid et amet sequi nemo",
    "url": "https://via.placeholder.com/600/56a8c2",
    "thumbnailUrl": "https://via.placeholder.com/150/56a8c2"
  },
  {
    "albumId": 1,
    "id": 7,
    "title": "officia delectus consequatur vero aut veniam explicabo molestias",
    "url": "https://via.placeholder.com/600/b0f7cc",
    "thumbnailUrl": "https://via.placeholder.com/150/b0f7cc"
  },
  {
    "albumId": 1,
    "id": 8,
    "title": "aut porro officiis laborum odit ea laudantium corporis",
    "url": "https://via.placeholder.com/600/54176f",
    "thumbnailUrl": "https://via.placeholder.com/150/54176f"
  },
  {
    "albumId": 1,
    "id": 9,
    "title": "qui eius qui autem sed",
    "url": "https://via.placeholder.com/600/51aa97",
    "thumbnailUrl": "https://via.placeholder.com/150/51aa97"
  }]



  server.get('/photosapi', (req,res) =>{
         res.json(jsonData);
  })
  // api structure// 
  // req is data from the client to the server
  // res is data from the server to the client


  server.get('/photosapi/:photoid', (req, res)=>{
      let id_from_client = req.params.photoid;
      // contain the number that was sent from the client
      // the name should show up once I typed params. 
      // this :photoid is coming from the client

      res.json(jsonData.find(x=>x.id == id_from_client))
      // x is the temprary variable which indicates the objects in the json
      // This is where photoid passed from client is connected to jason id. 
  })


server.listen(4400, function(){
    console.log('Server is successfully running on port 4400');
   
});

