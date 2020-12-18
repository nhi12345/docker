import { Component, OnInit } from '@angular/core';
import { BaseDestroyableDirective } from 'src/app/common/abstract/base-destroyable';
import { ToastrService } from 'ngx-toastr';
import { MESSAGE } from 'src/app/common/data/message';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent extends BaseDestroyableDirective implements OnInit {

  constructor(
    private toastr: ToastrService
  ) {
    super();
  }

  ngOnInit(): void {
  }
}
