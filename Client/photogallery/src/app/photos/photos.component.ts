import { Component, OnInit } from '@angular/core';
import { Photo } from '../interfaces/photo.interface';
import { PhotoserviceService } from '../services/photoservice.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  photos:Photo[]=[];

  // jsonData:Photo[]=  [];

  constructor(private ps:PhotoserviceService) { }

  ngOnInit(): void {

      this.ps.getAllPhotos().subscribe(photos =>{
        this.photos = photos;
      })
      // this.photos = this.jsonData;
  }

}
