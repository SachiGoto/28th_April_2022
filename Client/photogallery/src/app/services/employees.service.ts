import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import{ Employee} from '../interfaces/employee.interface'
@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private url ="http://localhost:4400/employeesapi";
  constructor(private eshttp:HttpClient) { }

  getAllEmployees(){
    return this.eshttp.get<Employee[]>(this.url);

    // this will return the observable
  }


}
