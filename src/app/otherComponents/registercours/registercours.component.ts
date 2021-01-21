import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Observable } from "rxjs";
import { HelperService } from "../../services/helper.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ValidatorsService } from "src/app/services/validators.service";
import { LoginService } from "../../services/login.service";
import { RegisterService } from "../../services/register.service";
import { RegisterUser } from "../../Models/register-user";
import { NgxSpinnerService } from "ngx-spinner";
import { delay } from "rxjs/operators";
import { TokenRequest } from "src/app/Models/token-request";
import { GusetRegister } from "src/app/Models/guset-register";
import { BookCourse } from "src/app/Models/book-course";
import { BoookingService } from "src/app/services/boooking.service";
import { RazorpaymentsComponent } from "../razorpayments/razorpayments.component";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-registercours",
  templateUrl: "./registercours.component.html",
  styleUrls: ["./registercours.component.css"]
})
export class RegistercoursComponent implements OnInit {
  @ViewChild(RazorpaymentsComponent, null)
  private payComponent: RazorpaymentsComponent;
  courseBooking: BookCourse;
  orderPaymentData: any;
  selectedCourse: string;
  selectedTopic: string = "";
  displayGuestForm: boolean = false;
  displayForm: boolean;
  imageUrl: string = "../../../assets/img/";
  feesDetails = {
    fees: 0,
    discount: 0,
    GST: 0,
    totalFees: 0,
    netTotal: 0,
    disPer: 0
  };
  constructor(
    private _helper: HelperService,
    private router: Router,
    private route: ActivatedRoute,
    private _validator: ValidatorsService,
    private _login: LoginService,
    private spinnerService: NgxSpinnerService,
    private _register: RegisterService,
    private _booking: BoookingService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    debugger;
    let courseid = this.route.snapshot.queryParams["course"];
    let topicId = this.route.snapshot.queryParams["topic"];
    this.getCourseTopicDetails(courseid, topicId);
    let token = this._login.getUserToken();
    if ((token.Token != null || token.Token != "") && token.type == "Student") {
      this.displayForm = false;
    } else {
      this.displayForm = true;
    }
  }
  loginForm = new FormGroup({
    email: new FormControl("", [
      Validators.required,
      this._validator.patternValidation(
        /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
      )
    ]),
    mobileNumber: new FormControl("", [
      Validators.required,
      this._validator.patternValidation(
        /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/
      )
    ])
  });
  showForm(e) {
    e.preventDefault();
    this.displayGuestForm = true;
  }
  registerGuest() {
    this.spinnerService.show();
    let loginRequest = new GusetRegister();
    loginRequest.Email = this.loginForm.controls["email"].value;
    loginRequest.PhoneNumber = this.loginForm.controls["mobileNumber"].value;
    this._register.guestRegister(loginRequest).subscribe(
      data => {
        this.spinnerService.hide();
        this.courseBooking.isGuestRegistartion = true;
        this.courseBooking.email = loginRequest.Email;
        console.log(data);
        this.toastr.success("Registration Successful!", "Registration Done!");
      },
      err => {
        this.spinnerService.hide();
        console.log(err);
      }
    );
  }
  getCourseTopicDetails(courseId, topicid) {
    debugger;
    let courseList = this._helper.getCourseList();
    let topicList = this._helper.getTopicList();
    let courseName = courseList.filter(item => item.courseId == courseId);
    let topicName = topicList.filter(
      item => item.courseId == courseId && item.topicId == topicid
    );
    if (topicid == 0) {
      this.selectedTopic = "Bundled Course (Full)";
      this.calculateFees(courseName[0].courseFees);
    } else if (topicName != null) {
      this.selectedTopic = topicName[0].topicName;
      this.calculateFees(topicName[0].fees);
    }
    if (courseName != null) {
      this.selectedCourse = courseName[0].courseName;
      this.imageUrl = this.imageUrl + courseName[0].imageName;
    }
    this.InitiateRegistration(courseId, topicid);
  }

  calculateFees(basicFees: number) {
    let disPer = this._helper.getDiscountPercentage();
    this.feesDetails.disPer = disPer;
    this.feesDetails.fees = basicFees;
    this.feesDetails.discount = basicFees * (disPer / 100);
    this.feesDetails.GST = basicFees * (this._helper.getGSTRate() / 100);
    this.feesDetails.totalFees = basicFees - this.feesDetails.discount;
    this.feesDetails.netTotal =
      this.feesDetails.totalFees + this.feesDetails.GST;
  }
  InitiateRegistration(courseid, topicId) {
    this.courseBooking = new BookCourse();
    this.courseBooking.courseFees = this.feesDetails.fees;
    this.courseBooking.discount = this.feesDetails.discount;
    this.courseBooking.gst = this.feesDetails.GST;
    this.courseBooking.totalCourseFees = this.feesDetails.totalFees;
    this.courseBooking.totalPaidAmount = this.feesDetails.netTotal;
    this.courseBooking.mLearnTopic = topicId;
    this.courseBooking.courseId = courseid;
    this.courseBooking.courseName = this.selectedCourse;
    if (topicId == 0) {
      this.courseBooking.ismLearn = false;
    } else {
      this.courseBooking.ismLearn = true;
    }
    this._booking.generateOrderId(this.courseBooking).subscribe(
      data => {
        this.orderPaymentData = data;
      },
      err => {}
    );
  }

  BookCourse(e) {
    e.preventDefault();
    this.courseBooking.transactionId = this.orderPaymentData[0];
    this._booking.CreateBooking(this.courseBooking).subscribe(data => {
      this.payComponent.orderId = this.orderPaymentData[1];
      this.payComponent.createRzpayOrder(this.courseBooking.totalPaidAmount);
    });
  }
  transactionUpdate(event) {
    debugger;
    console.log(event);
    let result = "";
    if (event.status == "Successful") {
      result = `Your booking status is  ${event.status}.Email with all boooking details is Sent t your Mail Id.`;
      this.toastr.success(result);
      let timer = setInterval(() => {
        this._helper.navigateToPath("/paymentmessage");
      }, 10000);
    } else {
      result = `Your booking status is  ${event.status}.In case amount is deducted will be refunded to you in 3-5 business days`;
      this.toastr.error(result);
    }
    // this.toastr.success(result, "Payment Done!");

    //alert(result);
    //this._pubData.navigateToPath("/");
  }
}
