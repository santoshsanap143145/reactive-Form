import { AbstractControl, ValidationErrors } from '@angular/forms';

export class EmpIdValidator {
  static isEmpIdValid(control: AbstractControl): ValidationErrors | null {
    let empIdVal: string = control.value;

    if (!empIdVal) {
      return null;
    }

    let regExp = /^[A-Z]\d{3}$/;
    let isValid = regExp.test(empIdVal);
    if (isValid) {
      return null;
    } else {
      return {
        EmpIdErr: `Invalid Employee Id(must start with 1 alphabet and ends with 3 numbers)`,
      };
    }
  }
}
