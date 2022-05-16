import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Crud} from '../interfaces/crud.interface';

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




  constructor(private http:HttpClient) { }

  private deleteCrudURL = "http://localhost:4400/deletcrud";

  deleteCrud(id:any){
    return this.http.delete<{deletedata:boolean, message:any}>(this.deleteCrudURL + "/" + id);
  }

  // private crudDataById = "http://localhost:4400/updateCrud/:id"


  private crudUpdateURL = "http://localhost:4400/updateCrud";
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



  private crudCreateURL = "http://localhost:4400/newCrudData";


  createCrudData(input:string){

    let dataBody={
          input:input
    }

    return this.http.post<{message:any, newData:boolean}>(this.crudCreateURL, dataBody);

  }


  private crudURL = "http://localhost:4400/allCrudData";
  displayAllCrud(){
    return this.http.get<Crud[]>(this.crudURL);
  }






  private loginURL= "http://localhost:4400/login";
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


private updateURL = "http://localhost:4400/updateUser";
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



private deleteURL = "http://localhost:4400/deleteuser";



deleteUser(id:any){
    return this.http.delete<{deleteUser:boolean, message:any}>(this.deleteURL + "/" + id);
}





}
