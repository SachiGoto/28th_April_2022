import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
// import { title } from 'process';
import { Photo } from '../interfaces/photo.interface';
import { PhotoserviceService } from '../services/photoservice.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  photos:Photo[]=[];
  name_of_env = environment.name;
  server = environment.server;

  deletePhoto(id:number, photocard:HTMLElement){
    if(confirm("Are you sure you want to delte?")){
      this.ps.deletePhoto(id).subscribe(deleteSuccessMessage=>{
        if(deleteSuccessMessage.delStatus === 1){

          console.log(id);
          let index = this.photos.findIndex(photo => photo.id === id);
          // variable index will have id
          console.log(photocard);

          photocard.className = 'fadeout';
          console.log(index);
          setTimeout(()=>{
          this.photos.splice(index, 0)}, 2000);




        }
      })
      // if yes is clicked, below happens.



    }
  }

  // jsonData:Photo[]=  [];

  constructor(private ps:PhotoserviceService) { }

  ngOnInit(): void {

      this.ps.getAllPhotos().subscribe(photos =>{
        this.photos = photos.allphotos;
      })
      // this.photos = this.jsonData;
  }

}
