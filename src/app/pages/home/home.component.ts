import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from './../_model/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public user: User = new User();
  public errorMsg: Object;
  public success: Object;
  loading = false;
  submitted = false;
  email: string;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    console.log('clicked');
    this.router.navigate(['/']);

  }

  reset() {
    if (this.user.email === undefined) {
      this.errorMsg = 'User does not exist';
        return;
    }

    console.log(this.user.email);
    this.email = this.user.email;
    this.afAuth.auth.sendPasswordResetEmail(this.user.email)
    .then(() => {
    console.log('email sent');
    this.success = 'Password reset link has been sent to' + ' ' +  this.email;
    this.user = new User();
  }
    )
    .catch((error) => {
    console.log(error);
    this.errorMsg = error;
    }
    );
  }

}
