import { Component, OnInit, ViewChild, ViewEncapsulation, NgModule } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ComponentDecorator } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environment';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';


interface userE {
  username: string
  firstName: string
  lastName: string
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  imports: [CommonModule, FuseAlertComponent, ReactiveFormsModule, MatIconModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatDividerModule, MatCheckboxModule, MatRadioModule, MatButtonModule],
})
export class UserComponent implements OnInit {
  @ViewChild('editUserNgForm') editUserNgForm: NgForm;
  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: '',
  };
  editUserForm: UntypedFormGroup;
  showAlert: boolean = false;


 

  entireFormValue = {
    firstName: '',
    lastName: '',
    email: ''
  };

  user: any;
  /**
 * Constructor
 */
  constructor(private _httpClient: HttpClient,
    private _formBuilder: UntypedFormBuilder
  ) {
  }

  /**
     * On init
     */
  ngOnInit(): void {
    // Create the form
    this.editUserForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName : ['', Validators.required],
      email    : [{value   : '', disabled: true}, Validators.required]
    });
    //this._fuseLoadingService.show();
    this.editUser();
  }

  editUser(): void {
    this._httpClient.post<any>(environment.backendUrl + '/api/v1/users/view', {}, { withCredentials: true }).subscribe((response) => {
      //Next callback
      this.user = response;
      console.log(this.user);
      console.log(this.user.lastName);
      this.entireFormValue.lastName = this.user.lastName;
      this.entireFormValue.firstName = this.user.firstName;
      this.entireFormValue.email = this.user.email;
      this.editUserForm.setValue(this.entireFormValue);
    }),
      (error) => { //Error callback
        console.error('Request failed with error')
      },
      () => { //Complete callback
        //console.log('Request completed')
      }
  }

  submit(): void {
    // Return if the form is invalid
    if (this.editUserForm.invalid) {
      return;
    }

    var user: userE = {
      username: '',
      firstName: this.editUserForm.value.firstName ,
      lastName: this.editUserForm.value.lastName
  };
 

    this._httpClient.post<any>(environment.backendUrl + '/api/v1/users/edit', user, { withCredentials: true }).subscribe((response) => {
      //Next callback
    }),
      (error) => { //Error callback
        console.error('Request failed with error')
      },
      () => { //Complete callback
      }

    // Set the alert
    this.alert = {
      type: 'success',
      message: 'Successful update.',
    };

    // Show the alert
    this.showAlert = true;
  }
}
