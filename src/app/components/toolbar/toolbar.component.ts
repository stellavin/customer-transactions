import { Component, OnInit, HostListener } from '@angular/core';
import { SidenavService } from '../sidenav/sidenav.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  isMenuIcon = true;
  @HostListener('window:resize') onResize() {
    this.onResizeDisplay();
  }

  constructor(
    public sidenavService: SidenavService,
    private router: Router
  ) {
    this.onResizeDisplay();
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

  login() {
    console.log('clicked');
    this.router.navigate(['/']);

  }

}
