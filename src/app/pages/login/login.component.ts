import { AngularFireAuth } from '@angular/fire/auth';
import { AlertService } from './../_services/alert.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../_model/user';
import { AuthenticationService, UserService } from '../_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: User = new User();
  public errorMsg: Object;
  public success: Object;
  loading = false;
  submitted = false;
  email: string;
  array = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public afAuth: AngularFireAuth,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/deposits']);
  }
  }

  ngOnInit() {
  }

  register() {
    console.log('clicked');
    this.router.navigate(['/register']);
  }

  reset() {
    console.log('clicked');
    this.router.navigate(['/reset']);
  }


  verify() {
    if (this.user === undefined) {
      this.errorMsg = 'User does not exist';
        return;
    } else {
      this.SignIn();
    }
  }

  SignIn() {
    const email = this.user.email;
    const pass = this.user.password;
    this.afAuth.auth.signInWithEmailAndPassword(email, pass)
    .then(
      (res) => {
         console.log('im here--- 2', res);
        if (res.user.emailVerified !== true) {
          const user: any = this.afAuth.auth.currentUser;
          user.sendEmailVerification().then(
            (success2) => {
             this.errorMsg = 'please verify your email';
             }).catch(
            (err) => {
              console.log('im here--- 8', res);
              this.errorMsg = err;
            });
        } else {
            this.setLocalStorage();
        }
    }).catch((error) => {
          console.log('im here---');
          this.errorMsg = error.message;
    });
  }

  setLocalStorage() {
    console.log('im here--- 3');
    this.submitted = true;
    this.loading = true;
    const array = localStorage.getItem('users');
    const array2 = JSON.parse(array);

    console.warn('array', JSON.parse(array));
    const index = array2.findIndex(x => x.email === this.user.email);
    const newItem = array2.map(item => {
      if (item.email === this.user.email) {
        return item;
      }
    });
    const p = newItem.filter(function(v) {
      return v !== undefined;
      });

    this.authenticationService.login(this.user.email, p.password)
    .pipe(first())
    .subscribe(
        data => {
            this.router.navigate(['/deposits']);
        },
        error => {
            this.errorMsg = error;
            this.loading = false;
      });

  }



}
