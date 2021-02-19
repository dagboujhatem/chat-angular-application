import { Component, Input, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-message-compose',
  templateUrl: './message-compose.component.html',
  styleUrls: ['./message-compose.component.css']
})
export class MessageComposeComponent implements OnInit {

  @Input() chatId;
  content;
  
  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  createMessage(){    
    if(this.chatId !== undefined)
    {
      const token = localStorage.getItem('token'); 
      if(token !== null)
      {
        const decoded : any =  jwt_decode(token);
        const authentificatedUserId = decoded.userId;
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

    });
  }

}
