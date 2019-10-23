import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../services/loading.service';
import { Cachorro } from '../models/cachorro.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {


  formLogin: FormGroup;

  email = new FormControl('', Validators.required);

  password = new FormControl('', Validators.required);

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient,
              private authService: AuthService, private loadingService: LoadingService) { }

  ngOnInit() {

    this.formLogin = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });
   }

  realizarLogin() {
    this.loadingService.mostrarLoading();
    this.http.post('/api/user/login', this.formLogin.value).subscribe(
      (res: any) => {
        this.authService.usuarioAuth.email = this.email.value;
        this.authService.usuarioAuth.name = res.user.name;
        this.authService.usuarioAuth.role = res.user.role;
        this.authService.usuarioAuth.dogs = [];
        for(let dog in res.user.dogs){
          let c:Cachorro = res.user.dogs[dog]
          this.authService.usuarioAuth.dogs.push(c);
        }
        

        this.email.setValue(undefined);
        this.password.setValue(undefined);

        sessionStorage.setItem('token', res.idToken);
        this.router.navigate(['/tabs/passeioTab']);
      },
      () => {
        this.loadingService.fecharLoading();
      },
      () => {
        this.loadingService.fecharLoading();
      }
    );
  }


}
