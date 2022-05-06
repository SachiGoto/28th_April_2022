import { Component, OnInit } from '@angular/core';
import{CommonService} from '../services/common.service'
import{Router} from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email:string='';
  password:string='';
  loginStatus = true;

  constructor(
    private cs:CommonService,
    private router:Router) { }

  login(){



      this.cs.loginService(this.email, this.password).subscribe(loginData=>{
         console.log(loginData);
         this.loginStatus = loginData.login;
         if(loginData.login){
           this.router.navigate(['/photos']);
           // navigate is an array coz it takes parameters//

          //  this.router.navigate(['/photos', 2]);
           // it will take me to the product that has product id 2

         }

      })


  }

  ngOnInit(): void {

    console.log(this.email);
    console.log(this.password);
  }

}
