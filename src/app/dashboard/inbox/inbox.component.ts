import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  @Input() inbox;
  @Output() newChatEvent = new EventEmitter<string>();

  
  constructor() { }

  ngOnInit(): void {
  }

  startChat()
  {
    this.newChatEvent.emit(this.inbox);
  }

}
