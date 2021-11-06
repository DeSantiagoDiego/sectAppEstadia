import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.page.html',
  styleUrls: ['./send-email.page.scss'],
})
export class SendEmailPage implements OnInit {
  public user$:Observable<any> = this.authSvc.afAuth.user;

  constructor(private authSvc:AuthService) { }

  ngOnInit() {
  }
  onSendEmail(){
    this.authSvc.sendVerificationEmail();
  }

}
