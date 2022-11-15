import { Component, EventEmitter, OnInit } from '@angular/core';

@Component({
  // standalone: true,
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css'],
  // imports: [MatGridListModule],
})
export class MainViewComponent implements OnInit {
  public matchCreated: EventEmitter<null> = new EventEmitter<null>();

  constructor() {}

  ngOnInit(): void {}

  onMatchCreated() {}
}
