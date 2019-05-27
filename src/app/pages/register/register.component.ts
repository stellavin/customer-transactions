import { AlertService } from './../_services/alert.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_model/user';
import { AuthenticationService, UserService } from '../_services';
import { first } from 'rxjs/operators';
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user: User = new User();
  public errorMsg: Object;
  public success: Object;
  public success2: Object;
  loading = false;
  submitted = false;
  email: string;


  constructor(
    private router: Router,
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
  }

  register() {
    let tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    let valid = false;
    if (this.user.email === undefined || this.user.email.length > 254 || this.user.email.length < 5 ) {
      valid = false;
    } else {
      valid = tester.test(this.user.email);
    }

    if (!valid) {
      this.errorMsg = 'Please enter a valid email address.';
       console.log('Please enter a valid email address.');
    } else if (this.user.firstName === undefined || this.user.firstName.length < 3 || this.user.firstName === '' ) {
      // filled are empty
      this.errorMsg = 'First Name should be more than 3 letter and it should not be empt';

    } else if (this.user.lastName === undefined || this.user.lastName.length < 3 || this.user.lastName === '') {
      this.errorMsg = 'Last Name should be more than 3 letter and it should not be empt';
    } else if (this.user.password === undefined || this.user.password.length < 3 || this.user.password === '') {
      this.errorMsg = 'Password should be more than 3 letter and it should not be empt';
    } else {
      this.SignUp();
    }
  }

  SignUp() {
    this.email = this.user.email;
    this.afAuth.auth.createUserWithEmailAndPassword(this.user.email, this.user.password)
    .then(
      (success) => {
         const user: any = this.afAuth.auth.currentUser;
         user.sendEmailVerification().then(
           (success2) => {
            this.success = 'A verification code was sent to' + ' ' +  this.email + '.Click to verify';
            this.errorMsg = '';
            this.saveToLocalhost();
            }).catch(
           (err) => {
             this.errorMsg = err;
           });
      }).catch(
        (err) => {
          this.errorMsg = err;
        });
    }

  saveToLocalhost() {
    this.loading = true;
      this.userService.register(this.user)
      .pipe(first())
      .subscribe(
          data => {
              // this.success = 'Registration successful';
              console.log('user saved ');
              this.user = new User();
          },
          error => {
              this.errorMsg = error;
              console.log('user error ', error);
              this.loading = false;
          });
  }


  login() {
    console.log('clicked');
    this.router.navigate(['/']);

  }

}
