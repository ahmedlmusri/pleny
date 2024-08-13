import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth-service.service';
import { login } from 'src/app/store/actions/auth.actions';
import { AuthState } from 'src/app/store/reducers/auth.reducer';
import { selectAuthState } from 'src/app/store/selectors/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  loadingForm:boolean = false
  constructor(private fb: FormBuilder, private authService : AuthService, private router: Router ,
    private store: Store<AuthState>) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.store.select(selectAuthState).subscribe((authState) => {
      if (authState.user) {
        this.router.navigate(['/product-list']);
        this.loadingForm = false;
      }
    });

  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loadingForm = true
      const email = this.loginForm.get('email').value;
      const password = this.loginForm.get('password').value;
      this.store.dispatch(login({ email: email, password: password }));
    }
  }
}
