import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Platform } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthService } from './services/auth.service';
import { EventEmitterService } from './services/event-emitter.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public menuItems = [{
    title: 'Accounts',
    url: '/account-list',
    icon: 'list'
  },
  {
    title: 'New account',
    url: '/account-new',
    icon: 'add'
  },
  {
    title: 'Sign Off',
    url: 'sign-out',
    icon: 'power'
  }];

  constructor(
    private platform: Platform,
    public  menuCtrl: MenuController,
    private router: Router,
    private location: Location,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private eventEmitterService: EventEmitterService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.menuCtrl.enable(false);
      
      this.eventEmitterService.loggedIn.subscribe(res => {
        this.menuCtrl.enable(true);
      });
      if (this.authService.accessToken) {
        this.menuCtrl.enable(true);
        this.router.navigate(["/account-list"]);
      } else if (this.location.path() != '/signin') {
        this.router.navigate(["/signin"]);
      }
    });
  }

  /**
   * Disabling sidebar menu
   * signOut function: Logging out from token based authentication 
   * Navigating to sign in page after signout
   * 
   */
  signOut() {
    this.menuCtrl.enable(false);
    this.authService.signOut()
      .then(res => {
        this.router.navigate(["/signin"]);
      }, err => {
        console.log(err);
      })
  }
}
