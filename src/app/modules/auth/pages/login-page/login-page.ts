import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login-page',
  standalone: false,
  templateUrl: './login-page.html',
})
export class LoginPage {
  loginForm: FormGroup;
  showPassword = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    //Formulário reativo com validadores
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  clearError(): void {
    this.errorMessage = '';
  }

  onSubmit(): void {
  if (this.loginForm.invalid) return;

  this.isLoading = true;
  this.errorMessage = '';

  this.authService.login(this.loginForm.value).subscribe({
    next: () => {
      this.isLoading = false;
      this.router.navigate(['/system/']);
    },
    error: (err) => {
      this.isLoading = false;
      if (err.status === 401 || err.status === 403) {
        this.errorMessage = 'Usuário ou senha incorretos.';
      } else {
        this.errorMessage = 'Ocorreu um erro no servidor. Tente novamente.';
      }
    }
  });
}
}
