import { Component, AfterViewInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { SidenavService } from './components/sidenav/sidenav.service';
import { User } from './pages/_model/user';
import { AuthenticationService, UserService } from './pages/_services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('appDrawer') appDrawer: ElementRef;
  mode = 'over';
  opened = false;
  login = false;
  currentUser: User;
  currentUserSubscription: Subscription;

  constructor(
    public sidenavService: SidenavService,
    private changeDetectorRef: ChangeDetectorRef,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      console.log('current user---', user);
      if ( user) {
        this.currentUser = user;
        this.login = true;
      } else {
        this.login = false;

      }
  });
  }

  ngAfterViewInit() {
    this.sidenavService.appDrawer = this.appDrawer;
    this.onResizeDisplay();
    window.onresize = () => {
      this.onResizeDisplay();
    };
  }

  onResizeDisplay() {
    if (window.innerWidth > 800) {
      this.mode = 'side';
      this.opened = true;
      this.changeDetectorRef.detectChanges();
    } else {
      this.mode = 'over';
      this.opened = false;
    }
  }
}
