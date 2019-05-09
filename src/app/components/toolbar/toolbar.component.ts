import { Component, OnInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { SidenavService } from '../sidenav/sidenav.service';
import { Router } from '@angular/router';
import { User } from '../../pages/_model/user';
import { Subscription } from 'rxjs';
import { AuthenticationService, UserService } from '../../pages/_services';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  isMenuIcon = true;
  currentUser: User;
  currentUserSubscription: Subscription;

  @HostListener('window:resize') onResize() {
    this.onResizeDisplay();
  }

  constructor(
    private router: Router,
    public sidenavService: SidenavService,
    private changeDetectorRef: ChangeDetectorRef,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    this.onResizeDisplay();
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
        this.currentUser = user;
  });
  }

  ngOnInit() {
  }

  onResizeDisplay() {
    if (window.innerWidth > 800) {
      this.isMenuIcon = false;
    } else {
      this.isMenuIcon = true;
    }
  }

  loginOut() {
    console.log('clicked');
    this.authenticationService.logout();
    this.router.navigate(['/']);

  }

}
