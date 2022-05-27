import { Component, OnInit } from '@angular/core';
import {Photo, Photos} from '../interfaces/photo.interface';
import {PhotoserviceService} from '../services/photoservice.service'

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss']
})





export class PhotoGalleryComponent implements OnInit {

  constructor(private http:PhotoserviceService) { }
  photos:Photo[]= [];

  albumId_fromC:number=0;
  title_fromC:string='';
  url_fromC:string='';
  tn_fromC:string='';
  filename:string= '';
  // when image was added, the file name will be stored in filename variable

  imageFormData:any;
  imgname:string = '';

  myformdata:any;


  trackFile(event:any){
    console.log(event);
    let myfile = event.target.files[0];
    this.filename = myfile.name;
    // it is an array so you need to target which index you want //
    console.log(myfile);

    // now send the file details to a server with formdata format
    const formdata = new FormData();
    // FormData is predefied method
    formdata.append("file_fromC", myfile, myfile.name);
    this.myformdata = formdata



  }


  addNewPhoto(){
    console.log(this.albumId_fromC, this.title_fromC, this.filename);
    this.http.addNewPhoto(this.albumId_fromC, this.title_fromC, this.filename).subscribe(newphoto=>{
      // it returns observerble and I named it as newphoto
      console.log(newphoto);
      // let newPhoto = newphoto;
      this.http.uploadFile(this.myformdata).subscribe(uplodMessage=>{
        console.log(uplodMessage);
        this.photos.unshift(newphoto);
      })
    })
  }


  // deletePhoto(id:number){
  //   if(confirm("Are you sure you want to delte?")){
  //     // if yes is clicked, below happens.

  //     console.log(id);
  //     let index = this.photos.findIndex(photo => photo.id === id);
  //     // variable index will have id

  //     console.log(index);

  //     this.photos.splice(index, 0);




  //   }


//   onChange(event:any){
//    let file:File = event.target.files[0];
//    // let file = <File>event.target.files[0];
//    console.log(file.name);
//    this.imgname = file.name;

//    const formData = new FormData();
//    console.log(formData);
//    formData.append('file_fromC', file);
//    // file needs to be sent as a part of a form.
//    // 'file' is a property name. the name must match with the name in html!
//    console.log(formData);
//    this.imageFormData = formData



//  }

 uploadImage(){
  // create an api
  // send the image(s) in imageFormData to the server

  this.http.uploadFile(this.imageFormData).subscribe(response=>{
    console.log(response);

  })

}

  getPhotos(){
    this.http.getAllPhotos().subscribe(photos=>{
      this.photos = photos.allphotos;
      console.log(photos)

    })
  }

  // addNew(){
  //   this.http.addPhotos(this.albumId_fromC, this.title_fromC, this.imgname, this.tn_fromC).subscribe(insertedPhoto=>{
  //     let newphoto = insertedPhoto;
  //     console.log(this.title_fromC);
  //     console.log(this.albumId_fromC);


  //     this.http.uploadFile(this.imageFormData).subscribe(response=>{
  //       this.photos.unshift(newphoto);
  //       console.log(newphoto);
  //     })

  //   })
  // }

  ngOnInit(): void {

    this.getPhotos();
    console.log(this.photos)
  }

}
