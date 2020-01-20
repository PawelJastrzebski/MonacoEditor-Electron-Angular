import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  code = [
    "function x() {",
    "\tconsole.log('Hello Angular');",
    "}"
  ].join("\n");

  constructor() { }

  ngOnInit(): void { }

}
