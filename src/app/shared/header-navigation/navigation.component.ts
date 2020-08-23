import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbPanelChangeEvent, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})


export class NavigationComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  public config: PerfectScrollbarConfigInterface = {};

  constructor(private modalService: NgbModal, private authService: AuthService, private router: Router) {}

  isLogged = false;
  userObject = null;

  ngOnInit(): void {
    this.isLoggedIn();
  }

  isLoggedIn() {
    const loggedUser = localStorage.getItem('loggedUser');
    this.userObject = JSON.parse(loggedUser);

    if (loggedUser == null) {
      this.isLogged = false;
      this.router.navigateByUrl('/login');
    } else {
      this.isLogged = true;
      this.inactivityTime();
    }
  }

  logoutUser() {
    const userJson = localStorage.getItem('loggedUser');
    const userObject = JSON.parse(userJson);
    const env = { id: userObject._id };
    this.authService.logOutUser(env).subscribe(res => {
      // tslint:disable-next-line: no-string-literal
      if (res["status"] == 200) {
        localStorage.clear();
        this.router.navigateByUrl('/login');
      }
    });
  }

  inactivityTime() {
    let time;

    window.onload = resetTimer;

    // DOM events
    document.onmousemove = resetTimer;
    document.onkeypress = resetTimer;

    function resetTimer() {
      clearTimeout(time);
      time = setTimeout(timeOut, 6000000);
    }

    function timeOut() {
      localStorage.clear();
      window.location.reload();
    }
  }
}
