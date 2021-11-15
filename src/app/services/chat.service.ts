import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private rtdb: AngularFireDatabase, public fireStorage:AngularFireStorage) { }

  sendMessage(record){
    return this.rtdb.list('/chat/').push(record);
  }
  uploadImage(file: any, path: string, nombre: string): Promise<string>{
    return new Promise ( resolve =>{
      const filePath = path + '/' + nombre;
      const ref = this.fireStorage.ref(filePath);
      const task = ref.put(file);
      task.snapshotChanges().pipe(
        finalize(()=>{
            ref.getDownloadURL().subscribe(res =>{
              const downloadURL = res;
              resolve(downloadURL);
              return;
            });
        })
      ).subscribe();
    })
  }  

  getMessage(){
    return this.rtdb.database.ref('/chat');
  }
}
