import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  CustomRegex,
  ValidationMessages,
} from './shared/Validators/validationPatterns';
import { NoSpaceBarValidator } from './shared/Validators/noSpaceBar';
import { AsyncEmailValidator } from './shared/Validators/asyncEmailValidators';
import { EmpIdValidator } from './shared/Validators/empIdValidator';
import { Icountry } from './shared/models/country';
import { COUNTRIES_META_DATA } from './shared/const/countries';
import { STATES_AND_UTS } from './shared/const/states';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'reactive-Form';
  signUpForm!: FormGroup;
  validationMsgs = ValidationMessages;
  genderArr: Array<string> = ['male', 'female', 'others'];
  countriesArr: Array<Icountry> = COUNTRIES_META_DATA;
  statesArr: Array<string> = STATES_AND_UTS;
  constructor() {}

  ngOnInit(): void {
    this.createSignUpForm();
    this.addSkills();
    this.addDependents();
    this.isAdressSameCheck();
    this.pathaddressHandler();
    this.confirmPasswordHandler();
    this.confirmPasswordValidation();
  }

  createSignUpForm() {
    this.signUpForm = new FormGroup({
      userName: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12),
        Validators.pattern(CustomRegex.username),
        NoSpaceBarValidator.noSpaceBar,
      ]),
      email: new FormControl(
        null,
        [
          Validators.required,
          Validators.pattern(CustomRegex.email),
          NoSpaceBarValidator.noSpaceBar,
        ],
        [AsyncEmailValidator.isEmailAvailable]
      ),
      empId: new FormControl(null, [
        Validators.required,
        EmpIdValidator.isEmpIdValid,
      ]),
      gender: new FormControl('male'),
      currentAdress: new FormGroup({
        country: new FormControl('India', [Validators.required]),
        state: new FormControl(null, [Validators.required]),
        city: new FormControl(null, [Validators.required]),
        pincode: new FormControl(null, [Validators.required]),
      }),
      permanentAdress: new FormGroup({
        country: new FormControl('India', [Validators.required]),
        state: new FormControl(null, [Validators.required]),
        city: new FormControl(null, [Validators.required]),
        pincode: new FormControl(null, [Validators.required]),
      }),
      isAddressSame: new FormControl({ value: false, disabled: true }),
      skills: new FormArray([]),
      dependents: new FormArray([]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(CustomRegex.password),
      ]),
      confirmPassword: new FormControl({ value: null, disabled: true }, [
        Validators.required,
      ]),
    });
  }

  isAdressSameCheck() {
    this.f['currentAdress'].valueChanges.subscribe((res) => {
      if (this.f['currentAdress'].valid) {
        this.f['isAddressSame'].enable();
      } else {
        this.f['isAddressSame'].disable();
      }
    });
  }

  pathaddressHandler() {
    this.f['isAddressSame'].valueChanges.subscribe((res: boolean) => {
      if (res === true) {
        let currentAddress = this.f['currentAdress'].value;
        this.f['permanentAdress'].patchValue(currentAddress);
        this.f['permanentAdress'].disable();
      } else {
        this.f['permanentAdress'].reset();
        this.f['permanentAdress'].enable();
      }
    });
  }

  addSkills() {
    if (this.skillArr.length < 5) {
      let skillInput = new FormControl(null, [Validators.required]);
      this.skillArr.push(skillInput);
    }
  }

  removeSkill(i: number) {
    this.skillArr.removeAt(i);
  }

  addDependents() {
    if (this.dependentsArr.length < 5) {
      let dependentGroup = new FormGroup({
        fullName: new FormControl(null, [Validators.required]),
        relationship: new FormControl(null, [Validators.required]),
        citizenship: new FormControl(null, [Validators.required]),
        isTravelingWithYou: new FormControl(null, [Validators.required]),
      });
      this.dependentsArr.push(dependentGroup);
    }
  }

  removeDependent(i: number) {
    this.dependentsArr.removeAt(i);
  }

  confirmPasswordHandler() {
    this.f['password'].valueChanges.subscribe((res) => {
      if (this.f['password'].valid) {
        this.f['confirmPassword'].enable();
        this.f['confirmPassword'].updateValueAndValidity();

      } else {
        this.f['confirmPassword'].disable();
        this.f['confirmPassword'].reset();
      }
    });
  }

  confirmPasswordValidation() {
    this.f['confirmPassword'].valueChanges.subscribe((confirmPassvalue) => {
      if (this.f['password'].value === confirmPassvalue) {
        this.f['confirmPassword'].setErrors(null);
      } else {
        this.f['confirmPassword'].setErrors({
          passwordMatchErr: `Password and ConfirmPassword must be the same`,
        });
      }
    });
  }

  onSignUp() {
    console.log(this.signUpForm);
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
      console.log(this.signUpForm.getRawValue);
      let val = {...this.signUpForm.getRawValue()}
      console.log(val);
    }
  }

  get f() {
    return this.signUpForm.controls;
  }

  get skillArr() {
    return this.f['skills'] as FormArray;
  }
  get dependentsArr() {
    return this.f['dependents'] as FormArray;
  }
}
