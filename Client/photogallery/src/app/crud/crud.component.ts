import { Component, OnInit } from '@angular/core';
import{CommonService} from '../services/common.service';
import{Crud} from '../interfaces/crud.interface';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {

  constructor(private route:ActivatedRoute, private cs:CommonService) { }
  allData:Crud[]=[];
  input:string="";
  idNumber:string="";
  showMessage = "none";
  singleData:any;
  status:boolean = false;
  deleteStatus:boolean = false;
  createStatus:boolean = false;

  trueStatement:boolean = false;
  edit(id:any){
    this.trueStatement = true;
    this.showMessage = "block";
    console.log("id number is " + id);

    // let dataID:any= this.route.snapshot.paramMap.get("id");
    this.cs.updateCrudById(id).subscribe(data =>{
      this.singleData = data;
      this.idNumber = this.singleData[0].id;
      this.input = this.singleData[0].input;

      console.log(this.input);
      // console.log("id is " + this.singleData[0].id);

    })
  }
  // for display a message "Enter new input in the box"


  display(){
    this.cs.displayAllCrud().subscribe(data=>{
      this.allData = data;
    })
  }

  create(){
    console.log(this.input);
    this.cs.createCrudData(this.input).subscribe(inputData=>{
      console.log(inputData.message);
      console.log(inputData.newData);
      if(inputData.newData){
        this.createStatus = inputData.newData;
        this.showMessage = "blcok";
      }

    })
  }




  update(){
    let inputID:any=this.route.snapshot.paramMap.get("id");
    console.log(inputID);
    this.cs.updateCrud(inputID, this.input).subscribe(update=>{
    if(update.update){
      this.status = update.update;
    }
    })



  }

  delete(){
    if(confirm("Are you sure?")){
      let id:any = this.route.snapshot.paramMap.get("id");
      console.log(id);
      this.cs.deleteCrud(id).subscribe(response =>{
        console.log(response);
        if(response.deletedata == true){
          this.deleteStatus = response.deletedata;
          this.showMessage = "block";

          console.log(response.message);

        }else{
          console.log(response.message);
        }
      })
  }
}

  ngOnInit(): void {



  }

}
