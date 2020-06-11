import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoginService } from "../services/login.service";
import { GusetRegister } from "../../app/Models/guset-register";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root"
})
export class RegisterService {
  constructor(private _httpclient: HttpClient, private login: LoginService) {}

  guestRegister(register: GusetRegister) {
    return this._httpclient.post(
      `${environment.baseUrl}${environment.guestRegister}`,
      register,
      this.login.getAuthHeader()
    );
  }
  registerFeedback(feedback) {
    return this._httpclient.post(
      `${environment.baseUrl}${environment.registerFeedback}`,
      feedback,
      this.login.getAuthHeader()
    );
  }
  getFeedback(courseId) {
    let url = `${environment.baseUrl}${environment.getFeedback}`.replace(
      "$courseId",
      courseId
    );
    return this._httpclient.get(url, this.login.getAuthHeader());
  }
}
