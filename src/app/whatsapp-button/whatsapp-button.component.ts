import { Component, Input } from '@angular/core';
import { TranslationService } from '../translation/translation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatedashService } from '../translation/translatedash.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-whatsapp-button',
  templateUrl: './whatsapp-button.component.html',
  styleUrls: ['./whatsapp-button.component.css'],
  animations: [
    trigger('rotateAndScale', [
      state('normal', style({ transform: 'rotate(0deg) scale(1)' })),
      state('rotated', style({ transform: 'rotate(360deg) scale(1.2)' })),
      transition('normal <=> rotated', animate('3s ease-in-out')),
    ]),
  ],
})
export class WhatsappButtonComponent {
  @Input() language: any;
  textDir: any;
  rotateAndScaleState: 'normal' | 'rotated' = 'normal';

  constructor(
    private translationService: TranslationService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private translatedashService: TranslatedashService
  ) {}
  openWhatsApp(): void {
    // Replace the phone number and message as needed
    window.open(
      'https://wa.me/1234567890?text=Hello%20from%20Angular%20App',
      '_blank'
    );
  }
  ngOnInit() {
    this.translatedashService.getLanguage().subscribe((language) => {
      this.language = language;
      if (this.language === 'en') {
        this.textDir = 'ltr';
        console.log('from btn comp', this.textDir);
      } else {
        this.textDir = 'rtl';
        console.log('from btn comp', this.textDir);
      }
    });
    setInterval(() => {
      this.rotateAndScaleState =
        this.rotateAndScaleState === 'normal' ? 'rotated' : 'normal';
    }, 3000); // Rotate every 10 seconds
  }
}
