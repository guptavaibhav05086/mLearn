import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-studentprofile",
  templateUrl: "./studentprofile.component.html",
  styleUrls: ["./studentprofile.component.css"]
})
export class StudentprofileComponent implements OnInit {
  isDisabled: boolean = true;
  constructor() {}

  ngOnInit() {}
  editForm() {
    this.isDisabled = false;
  }
  updateForm() {
    this.isDisabled = true;
  }
}
