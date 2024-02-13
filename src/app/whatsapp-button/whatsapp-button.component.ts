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
import { Setting } from '../_sharedService/setting';
import { SettingService } from '../_sharedService/setting.service';

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
    private settingService: SettingService,
    private translationService: TranslationService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private translatedashService: TranslatedashService
  ) {}

  settingGet: Setting = new Setting(0, '', '', '', '', '', '', '');
  openWhatsApp(): void {
    // Replace the phone number and message as needed  location

    window.open(
      `https://wa.me/${this.settingGet.firstPhoneNumber}?text=Hello\n ${this.settingGet.describtion}`,
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
      this.settingService.getAllSetting().subscribe(
        (data) => {
          console.log('setting from footer');
          this.settingGet = data;
          console.log(this.settingGet);
        },
        (error) => {
          console.error('Error fetching setting:', error);
        }
      );
    });
    setInterval(() => {
      this.rotateAndScaleState =
        this.rotateAndScaleState === 'normal' ? 'rotated' : 'normal';
    }, 3000); // Rotate every 10 seconds
  }
}
