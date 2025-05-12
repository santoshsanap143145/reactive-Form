import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

export class AsyncEmailValidator {
  static isEmailAvailable(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    let emailVal: string = control.value;
    if (!emailVal) {
      return Promise.resolve(null);
    }

    const promise = new Promise<ValidationErrors | null>((resolve, reject) => {
      setTimeout(() => {
        if (emailVal === 'may@gmail.com') {
          resolve({
            emailExistErr: `Email Id is already in use.`,
          });
        } else {
          resolve(null);
        }
      }, 1000);
    });
    return promise
  }
}
