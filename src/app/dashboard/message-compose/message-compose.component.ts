import { Component, Input, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environment';
import { MessageService } from '../services/message.service';
import { io } from "socket.io-client";
import { TimeAgoPipe } from 'src/app/utils/TimeAgoPipe';

@Component({
  selector: 'app-message-compose',
  templateUrl: './message-compose.component.html',
  styleUrls: ['./message-compose.component.css']
})
export class MessageComposeComponent implements OnInit {

  @Input() chatId;
  content;
  socket;
  @Input() messages: any = [];
  currentUserId : string = this.getCurrentUserId();
  
  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.setupSocketConnection();
  }
  setupSocketConnection() {
    this.socket = io(environment.socketURL, {transports: ['websocket']});
    this.socket.on('newMessageSended', (chat) => {
      this.messages.push(chat);
    });
  }

  getCurrentUserId()
  {
    const token = localStorage.getItem('token'); 
    if(token !== null)
    {
      const decoded : any =  jwt_decode(token);
      return decoded.userId;
    }
  }

  createMessage(){    
    if(this.chatId !== undefined)
    {
      const token = localStorage.getItem('token'); 
      if(token !== null)
      {
        const authentificatedUserId = this.getCurrentUserId();
        const messageContent = this.content.trim();
        if(messageContent != '')
        {
          const bodyData = {
            content: messageContent,
            user: authentificatedUserId
          }
          this.sendMessage(this.chatId, bodyData);
        }
      }
    }
  }

  sendMessage(chatId, data){
    this.messageService.sendMessage(chatId, data).subscribe((response: any)=>{
      this.content = '';
    });
  }

}
