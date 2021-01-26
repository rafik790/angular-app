import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ErrorHandler, NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesComponent } from './courses.component';
import { CourseComponent } from './course/course.component';
import { CoursesService } from './courses.service';
import { AuthorsComponent } from './authors/authors.component';
import { AuthorsService } from './authors.service';
import { FavoriteComponent } from './favorite/favorite.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { NewcourseFormComponent } from './newcourse-form/newcourse-form.component';
import { FormbuilderFormComponent } from './formbuilder-form/formbuilder-form.component';
import { PostsComponent } from './posts/posts.component';
import { PostService } from './services/post.service';
import { AppErrorHandler } from './common/app-error-handler';
import { NavbarComponent } from './navbar/navbar.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { HomeComponent } from './home/home.component';
import { FollowersComponent } from './followers/followers.component';
import { FollowersService } from './services/followers.service';
import { FollowerProfileComponent } from './follower-profile/follower-profile.component';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './login/login.component';
import { fakeBackendProvider } from './helper/FakeBackendInterceptor ';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './services/auth-guard.service';
import { NoAccessComponent } from './no-access/no-access.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { AdminComponent } from './admin/admin.component';
import { OrderService } from './services/order.service';
import { PatientRegistrationFormComponent } from './patient-registration-form/patient-registration-form.component';
import { DoctorRegistrationFormComponent } from './doctor-registration-form/doctor-registration-form.component';
import { UserService } from './services/user.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DoctorHomeComponent } from './doctor-home/doctor-home.component';
import { PatientHomeComponent } from './patient-home/patient-home.component';


@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    CourseComponent,
    AuthorsComponent,
    FavoriteComponent,
    ProductFormComponent,
    SignupFormComponent,
    NewcourseFormComponent,
    FormbuilderFormComponent,
    PostsComponent,
    NavbarComponent,
    NotfoundComponent,
    HomeComponent,
    FollowersComponent,
    FollowerProfileComponent,
    LoginComponent,
    LogoutComponent,
    NoAccessComponent,
    AdminComponent,
    PatientRegistrationFormComponent,
    DoctorRegistrationFormComponent,
    DoctorHomeComponent,
    PatientHomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [
    CoursesService,
    AuthorsService,
    PostService,
    FollowersService,
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    OrderService,
    UserService,
    {provide: ErrorHandler, useClass: AppErrorHandler},
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
