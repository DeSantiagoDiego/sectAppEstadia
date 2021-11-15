import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private rtdb: AngularFireDatabase) { }

  sendMessage(record){
    return this.rtdb.list('/chat/').push(record);
  }

  getMessage(){
    return this.rtdb.database.ref('/chat');
  }
}