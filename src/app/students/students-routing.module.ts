import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { StudentsComponent } from "./students.component";
import { DashboadComponent } from "./dashboad/dashboad.component";
import { CoursetakenComponent } from "./coursetaken/coursetaken.component";
import { StudentprofileComponent } from './studentprofile/studentprofile.component';
const routes: Routes = [
  {
    path: "",
    component: StudentsComponent,
    children: [
      { path: "dashboard", component: DashboadComponent },
      { path: "courses", component: CoursetakenComponent },
      { path: "profile", component: StudentprofileComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule {}
