import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  
  baseURL: string = environment.baseURL;

  constructor(private http: HttpClient) { }

  getInbox()
  {
    return this.http.get( this.baseURL + '/getInboxList');
  }

  createOrGetNewChat(idUser1 , idUser2)
  {
    return this.http.post( this.baseURL + `/getOrCreateNewChat/${idUser1}/${idUser2}`, {});
  }
}
