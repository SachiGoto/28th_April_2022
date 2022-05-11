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


      this.cs.loginService(this.email, this.password).subscribe( loginData => {
        // console.log(loginData, loginData.login, loginData.data[0]);
        this.loginStatus = loginData.login;
        if(loginData.login){
          console.log(loginData.data[0]);
          //Navigate method takes an array. The first element is the path and the rest
          //are parameters
          // console.log(loginData.data[0].UserID);
          localStorage.setItem("photoUserID", JSON.stringify(loginData.data[0].UserID));
          this.router.navigate(['/photos']);
        }
      })



      // this.cs.loginService(this.email, this.password).subscribe(loginData=>{
      //    console.log(loginData, loginData.login);

      //    this.loginStatus = loginData.login;

      //    if(loginData.login){

      //      localStorage.setItem("photoUserID", JSON.stringify(loginData.data[0].UserID));
      //      console.log(loginData.data[0].UserID);

      //      // value from the loginData
      //      this.router.navigate(['/photos']);
      //      // navigate is an array coz it takes parameters//

      //     //  this.router.navigate(['/photos', 2]);
      //      // it will take me to the product that has product id 2

      //    }

      // })


  }

  ngOnInit(): void {

    console.log(this.email);
    console.log(this.password);
  }

}
