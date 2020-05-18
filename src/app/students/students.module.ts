import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { DashboadComponent } from './dashboad/dashboad.component';
import { LeftnavComponent } from './leftnav/leftnav.component';
import { TopnavComponent } from './topnav/topnav.component';
import { CoursetakenComponent } from './coursetaken/coursetaken.component';


@NgModule({
  declarations: [StudentsComponent, DashboadComponent, LeftnavComponent, TopnavComponent, CoursetakenComponent],
  imports: [
    CommonModule,
    StudentsRoutingModule
  ]
})
export class StudentsModule { }
