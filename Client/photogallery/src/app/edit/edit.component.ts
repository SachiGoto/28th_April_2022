import { Component, OnInit } from '@angular/core';
import{CommonService} from '../services/common.service';
import{Crud} from '../interfaces/crud.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(private route:ActivatedRoute, private cs:CommonService) { }
  allData:Crud[]=[];

  input:string="";
  idNumber:string="";
  showMessage = "none";
  singleData:any;
  updateStatus:boolean = false;
  trueStatement:boolean = false;

  display(){
    this.cs.displayAllCrud().subscribe(data=>{
      this.allData = data;
    })
  }

  create(){
    console.log(this.input);
    // localStorage.setItem("photoUserID", JSON.stringify(loginData.data[0].UserID));
    this.cs.createCrudData(this.input).subscribe(inputData=>{
      console.log(inputData.message);
      console.log(inputData.newData);

      // let id:any=this.route.snapshot.paramMap.get("id");

    })
  }

  update(){
    let inputID:any=this.route.snapshot.paramMap.get("id");
    console.log(inputID);
   this.trueStatement = true;
    this.showMessage = "block";

    this.cs.updateCrud(inputID, this.input).subscribe(update=>{

    if(update.update){
      console.log("updated");
      console.log(update.update);
      this.updateStatus = update.update;
      console.log("update status is " + this.updateStatus )
    }
    })



  }

  show(){

    let dataID:any= this.route.snapshot.paramMap.get("id");
    console.log(dataID);

    this.cs.updateCrudById(dataID).subscribe(data =>{

          this.singleData = data;
          console.log(this.singleData);
          this.idNumber = data.id;
          this.input = data.input;

          console.log(this.input);
          console.log("id is " + this.idNumber);

    })

  }


  delete(){

    if(confirm("Are you sure?")){
      // let userID = localStorage.getItem("photoUserID");
      let id:any = this.route.snapshot.paramMap.get("id");
      console.log(id);
      this.cs.deleteCrud(id).subscribe(response =>{
        console.log(response);
        if(response.deletedata == true){
          // localStorage.setItem("photoUserID", "0");
          // this.router.navigate(['/signUp']);
          // console.log("deleted");
          console.log(response.message);
          console.log("Deleted");
          // this.router.navigate(['/admin']);

        }else{
          console.log(response.message);
        }


      })


  }

  }

  ngOnInit(): void {

    this.trueStatement = true;
    this.showMessage = "block";
    console.log("hello");

    let dataID:any= this.route.snapshot.paramMap.get("id");

    this.cs.updateCrudById(dataID).subscribe(data =>{

          this.singleData = data;
          console.log(this.singleData);
          this.idNumber = this.singleData[0].id;
          this.input = this.singleData[0].input;

          console.log(this.input);
          console.log("id is " + this.singleData[0].id);

    })

  }

}
