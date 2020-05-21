import { Component, OnInit } from "@angular/core";
import { HelperService } from "../../services/helper.service";
@Component({
  selector: "app-react",
  templateUrl: "./react.component.html",
  styleUrls: ["./react.component.css"]
})
export class ReactComponent implements OnInit {
  constructor(private _helper: HelperService) {}

  ngOnInit() {}
  register(courseId, topicId) {
    this._helper.navigateToRegister(courseId, topicId);
  }
}
