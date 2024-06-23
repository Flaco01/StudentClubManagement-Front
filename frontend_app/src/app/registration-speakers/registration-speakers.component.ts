import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ISpeakers } from '../interfaces/speakers.interface';
import { SpeakersService } from '../services/api_serivices/speakers/speakers.service';

@Component({
  selector: 'app-registration-speakers',
  standalone: true,
  templateUrl: './registration-speakers.component.html',
  styleUrls: ['./registration-speakers.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule]
})
export class RegistrationSpeakersComponent implements OnInit {
  speakersService = inject(SpeakersService);
  router = inject(Router);

  speakers = new FormGroup({
    card: new FormControl<any>('', [Validators.required]),
    name: new FormControl<any>('', [Validators.required]),
    lastName: new FormControl<any>('', [Validators.required]),
    email: new FormControl<any>('', [Validators.required, Validators.email]),
    phone: new FormControl<any>('', [Validators.required]),
    biography: new FormControl<any>('', [Validators.required]),
    topic: new FormControl<any>('', [Validators.required])
  });

  ngOnInit() {}

  onSubmit() {
    if (this.speakers.valid) {
      const speakerData: ISpeakers = {
        card: this.speakers.get('card')?.value,
        name: this.speakers.get('name')?.value,
        lastName: this.speakers.get('lastName')?.value,
        email: this.speakers.get('email')?.value,
        phone: this.speakers.get('phone')?.value,
        biography: this.speakers.get('biography')?.value,
        topic: this.speakers.get('topic')?.value
      };

      this.speakersService.createSpeaker(speakerData).subscribe(
        response => {
          alert('Ponente registrado con éxito');
          this.router.navigate(['/speakers-list']);
        },
        error => {
          alert('Error al registrar ponente');
        }
      );
    } else {
      alert('Formulario inválido');
    }
  }
}
