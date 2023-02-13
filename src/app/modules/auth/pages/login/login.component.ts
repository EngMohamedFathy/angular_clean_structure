import { Component, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  Validators, FormBuilder, FormGroup, FormControl, AbstractControl
} from '@angular/forms';
import { tap, delay, finalize, catchError } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';

import { AuthService } from '@modules/auth/services/auth.service';
import {ValidationService} from "@shared/services/validation.service";
import {TokenStorageService} from "@core/services/token-storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  error: string;
  isLoading: boolean;
  loginForm: FormGroup;

  private sub = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loginForm  =  this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get formControls() { return this.loginForm.controls; }

  login() {
    if(this.loginForm.invalid){
      this.validateAllFormFields(this.loginForm)
      return;
    }

    this.isLoading = true;

    const credentials = this.loginForm.value;

    this.sub = this.authService.login(credentials)
      .pipe(
        //delay(1500),
        tap((res) => {
          // set token
          this.tokenStorageService.saveToken(res.results.token);
          this.routeAfterLogin();
        }),
        catchError(error => {
          this.error = error
          return of([])
        }),
        finalize(() => {
          this.isLoading = false
        }),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  checkInputValid(control: AbstractControl){
    if(control.invalid && (control.touched || control.dirty)){
      return false;
    }
    return undefined;
  }

  getInputErrorMessage(control: AbstractControl){
    if(control.invalid){
      for (const propertyName in control.errors) {
        if (
          control.errors.hasOwnProperty(propertyName) &&
          (control.touched || control.dirty)
        ) {
          return ValidationService.getValidationErrorMessage(
            propertyName,
            control.errors[propertyName],
          );
        }
      }
    }
    return undefined;
  }

  routeAfterLogin(){
    const newRoute = this.route.snapshot.queryParams['returnUrl'] || '';
    this.router.navigate([newRoute])
  }

}
