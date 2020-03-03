import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NewUserComponent } from './components/new-user/new-user.component';
import { SanitizerPipe } from './pipes/sanitizer.pipe';
import { UcfirstPipe } from './pipes/ucfirst.pipe';
import { FooterComponent } from './components/footer/footer.component'

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    DashboardComponent,
    UserDashboardComponent,
    HeaderComponent,
    LoginComponent,
    NewUserComponent,
    SanitizerPipe,
    UcfirstPipe,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
