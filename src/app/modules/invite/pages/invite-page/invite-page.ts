import { ChangeDetectorRef, Component } from '@angular/core';
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
import { ApiService } from '../../../../core/services/api-service';

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
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) {
    this.inviteForm = this.fb.group({
      name: ['', Validators.required],
      contact: ['', [Validators.required, Validators.email]], // Configura o campo de contato como email obrigatório
      contactType: ['email'], // Fixa o tipo de contato para e-mail
      dietaryRestrictions: [''], // Mapeia as restrições alimentares do convidado principal
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
      name: ['', Validators.required],
      contact: [''],
      contactType: ['phone'],
      dietary: [''],
    });

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
    }
    contactControl.setValidators(validators);
    contactControl.updateValueAndValidity();
  }

  handleSubmit(): void {
    if (this.inviteForm.invalid) {
      this.inviteForm.markAllAsTouched();
      return;
    }

    const formValues = this.inviteForm.value;
    const emailDigitado = formValues.contact.trim().toLowerCase();

    // Transforma os acompanhantes criados no formulário reativo para os objetos CompanionDTO
    const companionsPayload = formValues.companions.map((c: any) => ({
      name: c.name,
      email: c.contactType === 'email' ? c.contact : '',
      dietaryRestriction: c.dietary || ''
    }));

    // Constrói o objeto estruturado baseado no PresenceFormDTO esperado no Back-end
    const presenceFormDTO = {
      companions: companionsPayload,
      dietaryRestrictions: formValues.dietaryRestrictions || '',
      linkValidation: emailDigitado // Encaminha o e-mail para busca dinâmica no Spring
    };

    // Envia a requisição POST para a nova rota que valida via e-mail direto no banco
    this.api.post<any>('guest/confirm-by-email', presenceFormDTO).subscribe({
      next: () => {
        this.submitted = true;
        this.cdr.detectChanges()
      },
      error: (err) => {
        console.error('Erro ao confirmar presença:', err);
        alert('Não encontramos um convite ativo para o e-mail digitado ou o limite de acompanhantes foi ultrapassado.');
      }
    });
  }
}
