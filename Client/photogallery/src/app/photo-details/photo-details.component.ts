import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import{Photo} from '../../app/interfaces/photo.interface';
import{PhotoserviceService} from '../services/photoservice.service'

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.scss']
})
export class PhotoDetailsComponent implements OnInit {

  constructor(private route:ActivatedRoute, private ps:PhotoserviceService) { }
  photo:Photo;
  // jsonData:Photo = {
  //   "albumId": 1,
  //   "id": 1,
  //   "title": "accusamus beatae ad facilis cum similique qui sunt",
  //   "url": "https://via.placeholder.com/600/92c952",
  //   "thumbnailUrl": "https://via.placeholder.com/150/92c952"
  // };

  ngOnInit(): void {

    console.log(this.route.snapshot.paramMap.get("id"));
    // it will go though the route and look for an id;
    // this.photo = this.jsonData;

    let id:any= this.route.snapshot.paramMap.get("id");

    this.ps.getPhotoById(id).subscribe(photo =>{
      this.photo = photo.photo;


    })
  }



}
