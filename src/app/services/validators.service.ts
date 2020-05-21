import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";

@Injectable({
  providedIn: "root"
})
export class ValidatorsService {
  constructor() {}

  confirmPassword(password: string) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return control.value === password ? { confirmPassword: true } : null;
    };
  }
  patternValidation(pattern: RegExp) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      debugger;
      if (control.value != "" && control.value != null) {
        const forbidden = pattern.test(control.value);
        return forbidden
          ? null
          : { invalidPattern: { valid: false, value: control.value } };
      }
      return null;
    };
  }
}
