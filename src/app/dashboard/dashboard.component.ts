import { Component, OnInit } from '@angular/core';
import { ChatService } from './services/chat.service';
import jwt_decode from 'jwt-decode';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  inboxList;
  chatId;
  messages: any = [];
  isLoading = false;
  chatWith: string;
  searchText;

  constructor(private messageService: MessageService,
     private chatService: ChatService) { }

  ngOnInit(): void {
    this.loadInbox();
  }

  loadInbox() {
    this.chatService.getInbox().subscribe((response: any) => {
      this.inboxList = response;
    })
  }

  startNewChat(inbox) {
    const token = localStorage.getItem('token');
    this.chatWith = inbox.firstName + ' ' + inbox.lastName;
    if (token !== null) {
      const decoded: any = jwt_decode(token);
      const authentificatedUserId = decoded.userId;
      this.createOrGetNewChat(inbox._id, authentificatedUserId);
    }

  }

  createOrGetNewChat(idUser1, idUser2) {
    this.chatService.createOrGetNewChat(idUser1, idUser2).subscribe((response: any) => {
      this.chatId = response._id;
      this.loadOldMessages();
    })
  }

  loadOldMessages() {
    this.isLoading = true;
    this.messageService.loadOldMessages(this.chatId).subscribe(response => {
      this.messages = response;
      this.isLoading = false;
    });
  }

}
