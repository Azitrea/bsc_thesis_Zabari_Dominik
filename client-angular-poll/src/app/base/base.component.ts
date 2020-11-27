import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  menuList: { name: string; route: string }[];

  constructor(
    private userService: UserService,
    private router: Router) {
    this.menuList = [
      {
        name: 'Főoldal',
        route: '/dashboard'
      },
      {
        name: 'Új kérdőív létrehozása',
        route: '/poll/new'
      },
      {
        name: 'Kérdőív lista',
        route: '/poll/list'
      },
      {
        name: 'Válaszok megtekintése',
        route: '/poll/answer-list'
      },
    ];
  }

  ngOnInit(): void {
  }

  logout() {
    this.userService.logout();
    this.router.navigateByUrl('auth/login');
  }

  navigateTo(route) {
    this.router.navigateByUrl(route);
  }

}
