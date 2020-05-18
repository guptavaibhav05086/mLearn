import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Observable } from "rxjs";
import { HelperService } from "../../services/helper.service";
@Component({
  selector: "app-registercours",
  templateUrl: "./registercours.component.html",
  styleUrls: ["./registercours.component.css"]
})
export class RegistercoursComponent implements OnInit {
  selectedCourse: string;
  selectedTopic: string = "";
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
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    let courseid = this.route.snapshot.queryParams["course"];
    let topicId = this.route.snapshot.queryParams["topic"];
    this.getCourseTopicDetails(courseid, topicId);
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
}
