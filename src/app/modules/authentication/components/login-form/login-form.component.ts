import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseDestroyableDirective } from 'src/app/common/abstract/base-destroyable';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidateService } from 'src/app/common/services/validate-form.service';
import { AuthService } from 'src/app/common/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { LoadingOnElementDirective } from 'src/app/common/directive/loading-on-element.directive';
import { MESSAGE } from 'src/app/common/data/message';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent extends BaseDestroyableDirective implements OnInit {
  @ViewChild('buttonSubmit', { static: true }) private elementButtonSubmit: LoadingOnElementDirective;

  public loginForm: FormGroup;

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.createLoginForm();
  }

  public createLoginForm(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        this.validateService.emailValidator,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
    });
  }

  public submitLogin(): void {
    this.elementButtonSubmit.showLoadingCenter('16px', 'auto');
    this.authService
      .login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(
        (result) => {
          if (result.status === 'SUCCESS'){
            this.toastr.success(MESSAGE.LOGIN_SUCCESS, MESSAGE.NOTIFICATION);
          }
          else{
            this.loginForm.setErrors({ incorrect: true, message : result.message });
          }
          this.elementButtonSubmit.hideLoadingCenter();
        },
        () => {
          this.elementButtonSubmit.hideLoadingCenter();
        }
      );
  }
}
