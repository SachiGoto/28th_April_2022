import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { LoginComponent } from './login/login.component';
import { PhotoDetailsComponent } from './photo-details/photo-details.component';
import { PhotosComponent } from './photos/photos.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {path:'photos', component:PhotosComponent},
  {path:'photos/:id', component:PhotoDetailsComponent},
  {path:'employees', component:EmployeesComponent},
  {path:'login', component:LoginComponent},
  {path:'signUp', component:SignUpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
