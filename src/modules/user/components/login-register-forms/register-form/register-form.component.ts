import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SharedModule } from '../../../../../shared/components/shared.module';
import { Store } from '@ngrx/store';
import { register } from '../../../application/user.actions';
import { User } from '../../../domain/models/user.model';
import { selectAuthToken } from '../../../application/user.selectors';
import { encryptData } from '../../../../../shared/utils/datahelper';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-register-form',
  standalone: true,
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
  imports: [SharedModule, ReactiveFormsModule],
})
export class RegisterFormComponent {
  fb = inject(FormBuilder);
  registerForm = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  msg = '';
  constructor(private router: Router, private readonly store: Store) {}

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.registerForm.valid) {
      const user: User = {
        name: this.registerForm.controls['name'].value!,
        surname: this.registerForm.controls['surname'].value!,
        email: this.registerForm.controls['email'].value!,
        password: this.registerForm.controls['password'].value!,
      };
      this.store.dispatch(register({ user: user }));
      this.store.select(selectAuthToken).subscribe((token) => {
        if(token){
          const securaData = encryptData(token, environment.secretKey);
          localStorage.setItem('token', JSON.stringify(securaData));
          window.location.href = ''
        }
      })
    } else if (
      this.registerForm.get('email')?.hasError('required') ||
      this.registerForm.get('name')?.hasError('required') ||
      this.registerForm.get('surname')?.hasError('required') ||
      this.registerForm.get('password')?.hasError('required')
    ) {
      this.msg = '¡Llena todos los campos!';
    } else if (this.registerForm.get('email')?.hasError('email')) {
      this.msg = 'ingresa un correo válido (ejemplo@correo.ex)';
    }
  }

  onLoginClick() {
    window.location.href = '/auth/login';
  }
}
