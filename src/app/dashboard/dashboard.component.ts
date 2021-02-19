import { Component, OnInit } from '@angular/core';
import { ChatService } from './services/chat.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  inboxList;
  chatId;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.loadInbox();
  }

  loadInbox(){
    this.chatService.getInbox().subscribe((response:any)=>{
     this.inboxList = response;
    })
  }

  startNewChat(id)
  {
    const token = localStorage.getItem('token'); 
    if(token !== null)
    {
      const decoded : any =  jwt_decode(token);
      const authentificatedUserId = decoded.userId;
      this.createOrGetNewChat(id, authentificatedUserId);
    }
    
  }

  createOrGetNewChat(idUser1, idUser2){
      this.chatService.createOrGetNewChat(idUser1, idUser2).subscribe((response: any)=>{
        this.chatId = response._id;
      })
  }

}
