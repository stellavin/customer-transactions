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


  constructor(
    private route: ActivatedRoute,
    private router: Router,
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

  login() {
    this.submitted = true;
        // stop here if form is invalid
        if (this.user === undefined) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.user.username, this.user.password)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/deposits']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });

  }


}
