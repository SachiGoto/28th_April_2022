import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})



export class UpdateUSerComponent implements OnInit {
  UserID = localStorage.getItem("photoUserID");
  email:string = '';
  password:string ='';
  updatestatus:Boolean = false;
  showMessage= "none";
  constructor(private cs:CommonService, private router:Router) { }


  // updateUser(){

  //  this.updatestatus = true;

  //  this.cs.updateService(this.UserID, this.email, this.password).subscribe(updateData=>{
  //    console.log("updateData has " , updateData);
  //    console.log(this.email);
  //    console.log(this.password);
  //    console.log(this.UserID);

  //   //  console.log("works");
  //  })



  updateUser(){

  // this.updatestatus = true;
  let id = localStorage.getItem("photoUserID");

  this.cs.updateUser(id, this.email, this.password).subscribe(updateConfirmation=>{
    console.log("updateData has " , updateConfirmation);
    console.log(this.email);
    console.log(this.password);
    console.log(id);
    this.updatestatus = updateConfirmation.update;
    this.showMessage = "block";


   //  console.log("works");




  })


  }


  deleteUser(){
  if(confirm("Are you sure?")){
    let userID = localStorage.getItem("photoUserID");
    this.cs.deleteUser(userID).subscribe(response =>{
      console.log(response);
      if(response.deleteUser){
        localStorage.setItem("photoUserID", "0");
        this.router.navigate(['/signUp']);

      }


    })

  }



  }
  ngOnInit(): void {

    console.log(localStorage.getItem("photoUserID"));
    let userID = localStorage.getItem("photoUserID");
      this.cs.getUser(userID).subscribe(userDetails=>{
        console.log(userDetails);
        this.email = userDetails.userData[0].email;
        this.password = userDetails.userData[0].password;

      })

  }

}
