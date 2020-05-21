import { Component, OnInit } from "@angular/core";
import { HelperService } from "../../services/helper.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ValidatorsService } from "../../services/validators.service";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: [
    "./register.component.css",
    "../../../assets/DashBoard/css/style.css",
    "../../../assets/DashBoard/css/theme.css"
  ]
})
export class RegisterComponent implements OnInit {
  flag = false;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  studentForm = new FormGroup({
    email: new FormControl("", [
      Validators.required,
      this._validator.patternValidation(
        /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
      )
    ]),
    password: new FormControl("", [Validators.required]),
    confirmPassword: new FormControl("", [Validators.required]),
    mobileNumber: new FormControl("", [
      Validators.required,
      this._validator.patternValidation(
        /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/
      )
    ])
  });
  trainerForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    confirmPassword: new FormControl(),
    mobileNumber: new FormControl(),
    technology: new FormControl()
  });
  constructor(
    private _helper: HelperService,
    private _validator: ValidatorsService
  ) {}

  ngOnInit() {
    this.dropdownList = this._helper.getCourseList();
    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: false,
      text: "Select Courses",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      enableSearchFilter: true,
      classes: "myclass custom-class",
      labelKey: "courseName",
      primaryKey: "courseId"
    };
  }
  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }
}
