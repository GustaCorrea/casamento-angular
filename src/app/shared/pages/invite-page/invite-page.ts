import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invite-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './invite-page.html',
  styleUrls: ['./invite-page.css'],
})
export class InvitePage {
  inviteForm: FormGroup;
  submitted = false;

  inputStyle = {
    'border-color': 'rgba(139,94,82,0.25)',
    background: '#f7ede7',
    color: '#2c1f14',
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.inviteForm = this.fb.group({
      name: ['', Validators.required],
      contact: ['', Validators.required],
      contactType: ['phone'], // 'phone' | 'email'
      companions: this.fb.array([]),
    });

    this.inviteForm.get('contactType')?.valueChanges.subscribe((type) => {
      if (type === 'phone' || type === 'email') {
        this.updateContactValidators(this.inviteForm, type, true);
      }
    });
  }

  get companions(): FormArray {
    return this.inviteForm.get('companions') as FormArray;
  }

  createCompanionFormGroup(): FormGroup {
    const group = this.fb.group({
      name: [''],
      contact: [''],
      contactType: ['phone'],
      dietary: [''],
    });

    // CORREÇÃO: Validamos se o tipo emitido coincide com o esperado antes de passar para a função
    group.get('contactType')?.valueChanges.subscribe((type) => {
      if (type === 'phone' || type === 'email') {
        this.updateContactValidators(group, type);
      }
    });

    return group;
  }

  addCompanion(): void {
    this.companions.push(this.createCompanionFormGroup());
  }

  removeCompanion(index: number): void {
    this.companions.removeAt(index);
  }

  changeContactType(formGroup: AbstractControl, type: 'phone' | 'email'): void {
    formGroup.get('contactType')?.setValue(type);
  }

  isContactType(formGroup: AbstractControl, type: 'phone' | 'email'): boolean {
    return formGroup.get('contactType')?.value === type;
  }

  private updateContactValidators(
    group: FormGroup,
    type: 'phone' | 'email',
    required = false
  ): void {
    const contactControl = group.get('contact');
    if (!contactControl) return;

    const validators = required ? [Validators.required] : [];

    if (type === 'email') {
      validators.push(Validators.email);
      contactControl.setValidators(validators);
    } else {
      contactControl.setValidators(validators);
    }
    contactControl.updateValueAndValidity();
  }

  handleSubmit(): void {
    if (this.inviteForm.valid) {
      this.submitted = true;
      this.router.navigate(['/']);
      console.log('Dados do Formulário:', this.inviteForm.value);
    } else {
      this.inviteForm.markAllAsTouched();
    }
  }
}
