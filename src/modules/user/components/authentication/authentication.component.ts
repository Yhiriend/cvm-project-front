import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginFormComponent } from "../login-register-forms/login-form/login-form.component";
import { RegisterFormComponent } from "../login-register-forms/register-form/register-form.component";

@Component({
    selector: 'app-authentication',
    standalone: true,
    templateUrl: './authentication.component.html',
    styleUrl: './authentication.component.css',
    imports: [LoginFormComponent, RegisterFormComponent]
})
export default class AuthenticationComponent {

  accessType: string | null;

  constructor(private route: ActivatedRoute) {
    this.accessType = this.route.snapshot.paramMap.get('accessType');
  }

}
