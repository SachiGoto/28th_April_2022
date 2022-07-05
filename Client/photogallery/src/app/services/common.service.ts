import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Crud} from '../interfaces/crud.interface';
import { environment } from 'src/environments/environment';

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

// interface Crud{
//   id:number;
//   input:string;
// }

@Injectable({
  providedIn: 'root'
})
export class CommonService {


private server = environment.server;

  constructor(private http:HttpClient) { }

  private deleteCrudURL = this.server + "deletcrud";
  private crudUpdateURL = this.server + "updateCrud";
  private crudCreateURL = this.server + "newCrudData";
  private crudURL = this.server + "allCrudData";
  private loginURL= this.server + "login";
  private signUpURL = this.server + "signUp";
  private userURL = this.server + "user";
  private updateURL = this.server + "updateUser";
  private deleteURL = this.server + "deleteuser";

  deleteCrud(id:any){
    return this.http.delete<{deletedata:boolean, message:any}>(this.deleteCrudURL + "/" + id);
  }

  // private crudDataById = "http://localhost:4400/updateCrud/:id"



  updateCrud(id:string, input:string){
    let updateCrudBody ={
      "id":id,
      "input":input
    }
    // console.log(updateCrudBody);


    return this.http.put<{message:any, update:boolean}>(this.crudUpdateURL, updateCrudBody)


  }

  updateCrudById(id:string){
      // return this.http.get<{data:[{ id:string, input:string}]}>(this.crudUpdateURL + "/" + id);
      return this.http.get<Crud>(this.crudUpdateURL + "/" + id);
  }






  createCrudData(input:string){

    let dataBody={
          input:input
    }

    return this.http.post<{message:any, newData:boolean}>(this.crudCreateURL, dataBody);

  }


  displayAllCrud(){
    return this.http.get<Crud[]>(this.crudURL);
  }







  loginService(email:string, password:string){
    let loginBody={
      email: email,
      password: password
    }

  return this.http.post<Login>(this.loginURL, loginBody);

  // sending data from server to client so need post


  }




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



getUser(id:any){
  return this.http.get<{user: boolean, message:string, userData:[{ UserID:number, email:string, password:string}]}>(this.userURL + "/" + id);
}


// private updateURL = "http://localhost:4400/updateUser";
// updateService(UserID:any, email:string, password:string){
//     let updateBody={
//       UserID:UserID,
//       email: email,
//       password:password
//     }
//     // console.log(updateBody);
//     return this.http.put<{message:any,update:boolean}>(this.updateURL, updateBody);
// }



// neeed to match with the end point
updateUser(id:any, email:string, password:string){
    let updateBody={
      "UserID":id,
      "email": email,
      "password":password
    }
    // the structure needs to match with the one you used for testing

    // console.log(updateBody);
    return this.http.put<{message:any,update:boolean}>(this.updateURL, updateBody);
    // updateBody - include information you want to pass
    // need to pass two arguments. 1 - endpoint 2- body
    // include type casting
}







deleteUser(id:any){
    return this.http.delete<{deleteUser:boolean, message:any}>(this.deleteURL + "/" + id);
}





}
