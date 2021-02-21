import { AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environment';
import { MessageService } from '../services/message.service';
import { io } from "socket.io-client";

@Component({
  selector: 'app-message-compose',
  templateUrl: './message-compose.component.html',
  styleUrls: ['./message-compose.component.css']
})
export class MessageComposeComponent implements OnInit, AfterViewChecked  {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  @Input() chatId;
  @Input() messages: any = [];
  @Input() isLoading;
  @Input() chatWith;
  content;
  socket;
  currentUserId : string = this.getCurrentUserId();
  submitted = false;
  
  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.setupSocketConnection();
  }

  ngAfterViewChecked() {        
    this.scrollToBottom();        
  } 
  // link : https://stackoverflow.com/questions/35232731/angular-2-scroll-to-bottom-chat-style
  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
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
    this.submitted = false;
    this.messageService.sendMessage(chatId, data).subscribe((response: any)=>{
      this.content = '';
    });
  }

}
