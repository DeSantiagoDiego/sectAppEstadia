import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public afAuth: AngularFireAuth) { }

  async resetPassword(email:string):Promise<any>{
    try{
      return this.afAuth.sendPasswordResetEmail(email);
    } catch(error){
      console.log(error);
      
    }
  }


  async sendVerificationEmail():Promise<void>{
    return (await this.afAuth.currentUser)?.sendEmailVerification();
  }

  async login(email:string,password:string):Promise<any>{
    try{
      /*const result = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );*/
      return await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
    }catch(error){
      console.log(error);
    }
  }

  async register(email:string, password:string){
    try{
    return await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    //this.sendVerificationEmail();
    }catch(error){
      console.log(error);
      return error;
    }
  }

  async logout(){
    try{
     await this.afAuth.signOut();
    }catch(error){
      console.log(error);
    }
  }

}
