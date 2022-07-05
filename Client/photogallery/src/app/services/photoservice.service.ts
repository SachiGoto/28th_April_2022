import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import{Photo, Photos} from '../interfaces/photo.interface'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})


export class PhotoserviceService {
 private server = environment.server;
  private photoUrl = this.server + "photos";

  private url = this.server + "photosapi";

  private fileuploadURL = this.server + "upload";

  // private photoUrl = "http://localhost:4400/photos"

  constructor(private http:HttpClient) {}





        //  uploadFile(filedata:any){
        //    return this.http.post('http://localhost:4400/upload', filedata);
        //    // post this api and send filedata from client
        //  }

        uploadFile(formdata:any){

          return this.http.post('http://localhost:4400/upload', formdata);


        }



          getAllPhotos(){
            return this.http.get<Photos>(this.photoUrl);
          }

          // addPhotos(albumId_fromC:number,  title_fromC:string,  url_fromC :string, tn_fromC:string){

          //   let addBody={

          //     albumId_fromC: albumId_fromC,
          //     title_fromC: title_fromC,
          //     url_fromC :  url_fromC ,
          //     tn_fromC: tn_fromC
          //     // newpost:newpost (newost comes from the clinet)
          //   }

          //   return this.http.post<Photo>(this.photoUrl, addBody);


          // }

          addNewPhoto(albumId_fromC:number, title_fromC:string, url_fromC:string){

            let newphotobody={

                  albumId_fromC: albumId_fromC,
                  title_fromC: title_fromC,
                  url_fromC :  url_fromC,

                  // newpost:newpost (newost comes from the clinet)
                }

                // return this.http.post<{newPhoto:[Photo], message:any}>(this.photoUrl, newphotobody);
                return this.http.post<Photo>(this.photoUrl, newphotobody);
          }




          //  getAllPhotos(){
          //        return this.http.get<Photo[]>(this.url);
          //  }

           getPhotoById(id:number){

                  return this.http.get<{photo:Photo, message:any}>(this.photoUrl + "/" + id);

           }


           deletePhoto(id:number){
             return this.http.delete<{delStatus:any, message:any}>(this.photoUrl + '/' + id);
           }




}
