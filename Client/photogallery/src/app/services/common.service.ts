import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

interface Login{
  login:boolean;
  message:string;
}

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private loginURL= "http://localhost:4400/login";
  constructor(private http:HttpClient) { }

  loginService(email:string, password:string){
    let loginBody={
      email: email,
      password: password
    }

  return this.http.post<Login>(this.loginURL, loginBody);

  // sending data from server to client so need post


  }


  private signUpURL = "http://localhost:4400/signUp";
  signUpService(user_name:string, email:string, password:string){
    let signUpBody={
      user_name:user_name,
      email: email,
      password: password
    }

    return this.http.post<{message:string, signUp:boolean}>(this.signUpURL, signUpBody);
  }
}
