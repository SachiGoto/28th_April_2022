import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhotosComponent } from './photos/photos.component';
import { PhotoDetailsComponent } from './photo-details/photo-details.component';
import { EmployeesComponent } from './employees/employees.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UpdateUSerComponent } from './update-user/update-user.component';
import { CrudComponent } from './crud/crud.component';
import { EditComponent } from './edit/edit.component';
import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';

@NgModule({
  declarations: [
    AppComponent,
    PhotosComponent,
    PhotoDetailsComponent,
    EmployeesComponent,
    LoginComponent,
    SignUpComponent,
    UpdateUSerComponent,
    CrudComponent,
    EditComponent,
    PhotoGalleryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
