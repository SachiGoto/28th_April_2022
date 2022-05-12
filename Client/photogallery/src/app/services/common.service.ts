import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

interface Login{
  login:boolean;
  message:string;
  data:[
    {
      UserID:number;
      email:string;
      password:string;
    }
  ]
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
      password: password,
      // signupmessage: message,
    }

    // This has to match with the object from the server
    // this object will be sent to the server

    return this.http.post<{message:any, signUp:boolean}>(this.signUpURL, signUpBody);
    // this will be returned as observable
  }

private userURL = "http://localhost:4400/user";

getUser(id:any){
  return this.http.get<{user: boolean, message:string, userData:[{ UserID:number, email:string, password:string}]}>(this.userURL + "/" + id);
}


private updateURL = "http://localhost:4400/updateUser";
updateService(UserID:any, email:string, password:string){
    let updateBody={
      UserID:UserID,
      email: email,
      password:password
    }
    // console.log(updateBody);
    return this.http.put<{message:any,update:boolean}>(this.updateURL, updateBody);
}



}
