import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MhInput } from 'mh-lib';
@Component({
  selector: 'app-root',
  imports: [MhInput, ReactiveFormsModule, JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('mh-complaint');
  memberInfoForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    memberId: new FormControl('BK098764BK'),
    phone: new FormControl(''),
    email: new FormControl('', [Validators.email, Validators.required]),
    address: new FormControl(''),
    city: new FormControl(''),
    zipCode: new FormControl({ value: '', disabled: true }),
  });

  onSubmit(): void {
    if (this.memberInfoForm.valid) {
      console.log(this.memberInfoForm.value);
    }
  }
}
