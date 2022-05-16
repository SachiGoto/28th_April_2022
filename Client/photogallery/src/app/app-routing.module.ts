import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudComponent } from './crud/crud.component';
import { EditComponent } from './edit/edit.component';
import { EmployeesComponent } from './employees/employees.component';
import { LoginComponent } from './login/login.component';
import { PhotoDetailsComponent } from './photo-details/photo-details.component';
import { PhotosComponent } from './photos/photos.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UpdateUSerComponent } from './update-user/update-user.component';

const routes: Routes = [
  {path:'photos', component:PhotosComponent},
  {path:'photos/:id', component:PhotoDetailsComponent},
  {path:'employees', component:EmployeesComponent},
  {path:'login', component:LoginComponent},
  {path:'signUp', component:SignUpComponent},
  {path:'updateuser', component:UpdateUSerComponent},
  {path:'crud', component:CrudComponent},
  {path:'crud/:id', component:CrudComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
