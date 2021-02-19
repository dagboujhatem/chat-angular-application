import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  baseURL: string = environment.baseURL;

  constructor(private http: HttpClient) { }

  sendMessage(chatId, data)
  {
    return this.http.post( this.baseURL + `/sendMessage/${chatId}`, data);
  }
}
