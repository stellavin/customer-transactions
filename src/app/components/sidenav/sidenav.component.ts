import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavService } from './sidenav.service';
import { User } from '../../pages/_model/user';
import { Subscription } from 'rxjs';
import { AuthenticationService, UserService } from '../../pages/_services';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  public activeRoute = '';
  currentUser: User;
  currentUserSubscription: Subscription;

  constructor(
    private route: Router,
    public sidenavService: SidenavService,
    private changeDetectorRef: ChangeDetectorRef,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
        this.currentUser = user;
  });
  }

  ngOnInit() {
  }

  openPage(url: string) {
    this.activeRoute = url;
    this.route.navigateByUrl(url);
    this.sidenavService.closeNav();
  }
}
