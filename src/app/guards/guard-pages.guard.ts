import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardPagesGuard implements CanActivate {
  constructor(private authSvc: AuthService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authSvc.afAuth.user.pipe(
        map(user=>{
          if(!user){
            alert('No logueado')
            this.router.navigate(['/login']);
            //return false;
          }
          if(!user.emailVerified){
            //alert('Cuenta no verificada.')
            this.router.navigate(['/verification-email']);
            //return false;
          }
          console.log(user)
          return true;
        })
      );
  }
  
}
