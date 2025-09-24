import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MhInput, MhStates } from 'mh-lib';
@Component({
  selector: 'app-root',
  imports: [MhInput, MhStates, ReactiveFormsModule, JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('mh-complaint');
  memberInfoForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    memberId: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl('', [Validators.email, Validators.required]),
    address: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    zipCode: new FormControl(''),
  });

  onSubmit(): void {
    if (this.memberInfoForm.valid) {
      console.log(this.memberInfoForm.value);
    }
  }
}
