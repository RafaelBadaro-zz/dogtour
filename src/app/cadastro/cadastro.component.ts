import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {


  formCadastro: FormGroup;

  name = new FormControl('', Validators.required);

  email = new FormControl('', Validators.required);

  password = new FormControl('', Validators.required);

  role = new FormControl('', Validators.required);

  constructor(private formBuilder: FormBuilder, private router: Router , private http: HttpClient) { }

  ngOnInit() {

    this.formCadastro = this.formBuilder.group({
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role,
    });
  }

  realizarCadastro() {
    this.http.post('/api/user', this.formCadastro.value).subscribe(
      (res) => {
        this.router.navigate(['/login']);
      },
      (err) => {
      },
      () => {
      }
    );
  }

}
