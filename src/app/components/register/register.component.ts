import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
     // tslint:disable-next-line: only-arrow-functions
     $(document).ready(function() {
      $('.sidenav').sidenav();
     });
  }

}
