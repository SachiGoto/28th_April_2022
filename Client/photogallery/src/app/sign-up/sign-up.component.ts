import { Component, OnInit } from '@angular/core';
import{CommonService} from '../services/common.service'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {


  constructor(
    private cs:CommonService
  ) { }

   user_name:string='';
   email:string='';
   password:string='';
   password2:string='';

   registration:boolean=false;

   signUp(){

    this.cs.signUpService(this.user_name, this.email, this.password).subscribe(signUpData=>{
            console.log(signUpData.signUp);
            this.registration = signUpData.signUp
    });

    //  console.log(this.user_name);
    //  console.log(this.email);
    //  console.log(this.password);
    //  console.log(this.password2);
   }

  ngOnInit(): void {

    console.log(this.user_name);
  }

}
