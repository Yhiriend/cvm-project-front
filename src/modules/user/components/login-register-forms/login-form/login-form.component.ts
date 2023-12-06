import { Component, inject } from '@angular/core';
import { SharedModule } from '../../../../../shared/components/shared.module';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { login } from '../../../application/user.actions';
import { selectAuthToken } from '../../../application/user.selectors';
import { encryptData } from '../../../../../shared/utils/datahelper';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-login-form',
  standalone: true,
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
  imports: [SharedModule, ReactiveFormsModule],
})
export class LoginFormComponent {
  fb = inject(FormBuilder);

  loginForm = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  msg: any;

  constructor(private router: Router, private readonly store: Store) {}

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.loginForm.valid) {
      const email = this.loginForm.controls['email'].value!;
      const password = this.loginForm.controls['password'].value!;
      this.store.dispatch(login({ email, password }));
      this.store.select(selectAuthToken).subscribe((token) => {
        if(token){
          const securaData = encryptData(token, environment.secretKey);
          localStorage.setItem('token', JSON.stringify(securaData));
          window.location.href = ''
        }
      })
    }else if (
      this.loginForm.get('email')?.hasError('required')||
      this.loginForm.get('password')?.hasError('required')
    ) {
      this.msg = '¡Agrega tus credenciales!';
    } else if (this.loginForm.get('email')?.hasError('email')) {
      this.msg = 'ingresa un correo válido (ejemplo@correo.ex)';
    }
  }

  onRegisterClick() {
    window.location.href = '/auth/register';
  }
}
