import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HelperService } from "src/app/services/helper.service";
import { ValidatorsService } from "src/app/services/validators.service";

@Component({
  selector: "app-trainersingup",
  templateUrl: "./trainersingup.component.html",
  styleUrls: ["./trainersingup.component.css"]
})
export class TrainersingupComponent implements OnInit {
  flag = false;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  studentForm = new FormGroup(
    {
      email: new FormControl("", [
        Validators.required,
        this._validator.patternValidationTrainer(
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
      ]),
      technology: new FormControl([], [Validators.required])
    },
    { validators: this._validator.confirmPasswordValidation }
  );
  // trainerForm = new FormGroup({
  //   trainerEmail: new FormControl("", [
  //     Validators.required,
  //     this._validator.patternValidation(
  //       /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
  //     )
  //   ]),
  //   trainerPassword: new FormControl("", [Validators.required]),
  //   confirmPassword: new FormControl("", [Validators.required]),
  //   mobileNumber: new FormControl("", [Validators.required]),
  //   technology: new FormControl([], [Validators.required])
  // });
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
  onSubmit() {
    console.log("Form submitted");
  }
}
