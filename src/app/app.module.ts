import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HomeComponent } from "../app/public/home/home.component";
import { HomecontentComponent } from "../app/public/homecontent/homecontent.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PublicModule } from "../app/public/public.module";
import { AboutComponent } from "./otherComponents/about/about.component";
import { NavbarComponent } from "./public/navbar/navbar.component";

import { ReactComponent } from "./courseComponets/react/react.component";
import { AngularComponent } from "./courseComponets/angular/angular.component";
import { FAQComponent } from "./courseComponets/faq/faq.component";
import { NodeComponent } from "./courseComponets/node/node.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { JavascriptComponent } from "./courseComponets/javascript/javascript.component";
import { DotnetComponent } from "./courseComponets/dotnet/dotnet.component";
import { JavaComponent } from "./courseComponets/java/java.component";
import { AllcoursesComponent } from "./courseComponets/allcourses/allcourses.component";
import { RegistercoursComponent } from "./otherComponents/registercours/registercours.component";
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { ReactiveFormsModule } from '@angular/forms'
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomecontentComponent,
    AboutComponent,
    ReactComponent,
    AngularComponent,
    FAQComponent,
    NodeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    JavascriptComponent,
    DotnetComponent,
    JavaComponent,
    AllcoursesComponent,
    RegistercoursComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PublicModule,
    AngularMultiSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
