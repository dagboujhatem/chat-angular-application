import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-compose',
  templateUrl: './message-compose.component.html',
  styleUrls: ['./message-compose.component.css']
})
export class MessageComposeComponent implements OnInit {

  @Input() chatId; 
  
  constructor() { }

  ngOnInit(): void {
  }

}
