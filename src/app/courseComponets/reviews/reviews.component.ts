import { Component, OnInit, Input } from "@angular/core";
import { RegisterService } from "../../services/register.service";
import { Feedback } from "src/app/Models/feedback";

@Component({
  selector: "app-reviews",
  templateUrl: "./reviews.component.html",
  styleUrls: ["./reviews.component.css"]
})
export class ReviewsComponent implements OnInit {
  @Input() courseId;
  rating3: number = 0;
  userId = 1;
  feedback: Feedback;
  userFeedbacks: [];

  constructor(private register: RegisterService) {}
  flag = false;
  message = "";
  ngOnInit(): void {
    this.feedback = new Feedback();
    this.getFeedback();
  }

  submitFeedback() {
    //event.prevantDefault();
    this.feedback.courseId = this.courseId;
    this.feedback.starRating = this.rating3;
    this.feedback.userId = this.userId;
    this.register.registerFeedback(this.feedback).subscribe(
      data => {
        this.flag = true;
        this.message = "Feedback submitted";
      },
      err => {
        this.message = "Issue in Feedback submission";
      }
    );
  }
  getFeedback() {
    this.register.getFeedback(this.courseId).subscribe(
      data => {
        debugger;
        console.log(data);
      },
      err => {}
    );
  }
}
