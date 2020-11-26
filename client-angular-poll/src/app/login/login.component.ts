import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      loginName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    this.userService.login(this.form.value.loginName, this.form.value.password).subscribe(res => {
      console.log(res);
      this.router.navigateByUrl('dashboard');
    });
  }

}
