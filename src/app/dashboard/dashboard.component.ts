import { Component, OnInit } from '@angular/core';
import { ChatService } from './services/chat.service';
import jwt_decode from 'jwt-decode';
import { MessageService } from './services/message.service';
import { environment } from 'src/environments/environment';
import { io } from 'socket.io-client';

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
  socket;

  constructor(private messageService: MessageService,
     private chatService: ChatService) { }

  ngOnInit(): void {
    this.loadInbox();
    this.initNotificationSocket();
  }

  loadInbox() {
    this.chatService.getInbox().subscribe((response: any) => {
      this.inboxList = response;
    })
  }

  startNewChat(inbox) {
    this.markAsReaded(inbox._id)
    const token = localStorage.getItem('token');
    this.chatWith = inbox.userName;
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

  initNotificationSocket()
  {
    this.socket = io(environment.socketURL, {transports: ['websocket']});
    this.socket.on('newMessageNotification', (message) => {
      const token = localStorage.getItem('token');
      if (token !== null) {
        const decoded: any = jwt_decode(token);
        const authentificatedUserId = decoded.userId;
        if(message.user != authentificatedUserId)
        {
          let index = this.inboxList.findIndex(inbox=> inbox._id == message.user);
          this.inboxList[index].hasNotification = true;
          this.inboxList[index].nubmerOfMessage += 1;
          this.playAudio();
        }
      }     
    });
  }

  markAsReaded(id)
  {
    let index = this.inboxList.findIndex(inbox=> inbox._id == id);
    this.inboxList[index].hasNotification = false;
    this.inboxList[index].nubmerOfMessage = 0;
  }

  playAudio(){
    let audio = new Audio();
    audio.src = "../../../assets/audio/facebook-new-message-pop-ding.wav";
    audio.load();
    audio.play();
  }

}
