import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "src/environments/environment";
import { BookCourse } from "../Models/book-course";
@Injectable({
  providedIn: "root"
})
export class BoookingService {
  constructor(private _httpclient: HttpClient) {}

  generateOrderId(bookingOrder) {
    return this._httpclient.post(
      `${environment.baseUrl}${environment.generateOrder}`,
      bookingOrder
    );
  }
  CreateBooking(bookingOrder: BookCourse) {
    return this._httpclient.post(
      `${environment.baseUrl}${environment.createBoooking}`,
      bookingOrder
    );
  }
  validateTransaction(paymentId, orderId, signature, bookingOrder: any) {
    let url = `${environment.baseUrl}${environment.transactionValidate}`
      .replace("$paymentId", paymentId)
      .replace("$orderId", orderId)
      .replace("$signature", signature);
    return this._httpclient.post(url, bookingOrder);
  }
}
