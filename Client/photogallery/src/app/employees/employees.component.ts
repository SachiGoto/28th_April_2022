import { Component, OnInit } from '@angular/core';
import { Employee } from '../interfaces/employee.interface';
import { EmployeesService } from '../services/employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']

})


export class EmployeesComponent implements OnInit {

  // employees:Employee[] = [

  //   {"ID":2,"Emp_name":"Steve_local","City_name":"vancouver","Country_name":"canada"},
  //   {"ID":3,"Emp_name":"Mark_local","City_name":"vancouver","Country_name":"canada"},
  //   {"ID":4,"Emp_name":"Daisy_local","City_name":"london","Country_name":"u.k"},
  //   {"ID":5,"Emp_name":"Jo_local","City_name":"london","Country_name":"u.k"}

  // ]

  constructor(private es:EmployeesService) { }

  employees:Employee[]=[];
  ngOnInit(): void {

    this.es.getAllEmployees().subscribe( employees =>{
       console.log(employees);
       this.employees= employees;
    })

  }

}


