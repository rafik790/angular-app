import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthorsComponent } from './authors/authors.component';
import { DoctorHomeComponent } from './doctor-home/doctor-home.component';
import { DoctorRegistrationFormComponent } from './doctor-registration-form/doctor-registration-form.component';
import { FollowerProfileComponent } from './follower-profile/follower-profile.component';
import { FollowersComponent } from './followers/followers.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { PatientHomeComponent } from './patient-home/patient-home.component';
import { PatientRegistrationFormComponent } from './patient-registration-form/patient-registration-form.component';
import { PostsComponent } from './posts/posts.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { AuthGuard } from './services/auth-guard.service';


const routes: Routes = [
  { path: "", component:  HomeComponent},
  { path: "patientregistration", component:  PatientRegistrationFormComponent},
  { path: "patienthome", component:  PatientHomeComponent},
  { path: "doctorregistration", component:  DoctorRegistrationFormComponent},
  { path: "doctorhome", component:  DoctorHomeComponent},

  { path: "posts", component: PostsComponent,canActivate:[AuthGuard] },
  { path: "product", component:  ProductFormComponent},
  { path: "followers/:username/:id", component:  FollowerProfileComponent,canActivate:[AuthGuard] },
  { path: "followers", component:  FollowersComponent,canActivate:[AuthGuard] },
  { path: "login", component:  LoginComponent},
  { path: "logout", component:  LogoutComponent},
  { path: "no-access", component:  NoAccessComponent},
  { path: "**", component:  NotfoundComponent}
];

@NgModule({
  imports: [
    
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
