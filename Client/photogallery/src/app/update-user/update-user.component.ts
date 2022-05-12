import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

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
  constructor(private cs:CommonService) { }


  updateUser(){

   this.updatestatus = true;

   this.cs.updateService(this.UserID, this.email, this.password).subscribe(updateData=>{
     console.log("updateData has " , updateData);
     console.log(this.email);
     console.log(this.password);
     console.log(this.UserID);

    //  console.log("works");
   })


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
