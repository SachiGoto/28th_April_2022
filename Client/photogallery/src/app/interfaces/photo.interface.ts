export interface Photo{
  albumid: number;
  id:number;
  title:string;
  url:string;
  thumbnailUrl:string
}


export interface Photos{
  allphotos:
  [{albumid: number,
  id:number,
  title:string,
  url:string,
  thumbnailUrl:string,
}];
message:any;
}
