import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-kimirina',
  templateUrl: './kimirina.component.html',
  styleUrls: ['./kimirina.component.css']
})
export class KimirinaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // tslint:disable-next-line: only-arrow-functions
    $(document).ready(function() {
      $('.sidenav').sidenav();
     });
  }

}
