import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { EventEmitterService } from '../../../services/event-emitter.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  /**
   * @summary Sign in page 
   * form: form group instance object for form data with user credentials
   * errorMessage: var to store error message when authentication failed
   * validationMessages: var to hold validation messages object
   * 
   */
  form: FormGroup;
  errorMessage: string = '';
  validationMessages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };

  constructor(
    private authService: AuthService,
    private eventEmitterService: EventEmitterService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    /**
     * @summary New form builder to handle sign in form validation 
     * form: form group instance object for form data with user credentials
     * @param email id and @param password.
     * 
     */
    this.form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  /**
   * @summary authenticate function to validate user using credentials
   * Navigate to accounts list page after successful login
   * Log the error message to console if login fails
   * @param email id and @param password.
   * 
   */
  authenticate(credentils) {
    this.authService.authenticate(credentils)
      .subscribe(res => {
        this.eventEmitterService.sendMessage(1);
        this.router.navigate(["/account-list"]);
      }, err => {
        this.errorMessage = err.message;
        console.log(err)
      })
  }
}
