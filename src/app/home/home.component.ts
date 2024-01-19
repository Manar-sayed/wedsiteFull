import { Component } from '@angular/core';
import { TranslationService } from '../translation/translation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatedashService } from '../translation/translatedash.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  images = [
    'https://plus.unsplash.com/premium_photo-1661952448084-c8ff11cc973f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1661962468079-5d6791f9c627?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1531431057391-da7a1aabd412?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ].map((n) => `${n}`);

  translatedDirAttribute: any = '';
  language: string = 'ar';
  textDir: any;
  constructor(
    private translationService: TranslationService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private translatedashService: TranslatedashService
  ) {}

  // ngOnInit() {
  //   this.translateDirAttribute();
  // }
  ngOnInit() {
    this.translatedashService.getLanguage().subscribe((language) => {
      this.language = language;
      if (this.language === 'en') {
        this.textDir = 'ltr';
        console.log(this.textDir);
      } else {
        this.textDir = 'rtl';
        console.log(this.textDir);
      }
    });
  }

  // switchLanguage() {
  //   // Toggle between 'en' (English) and 'ar' (Arabic) for demonstration purposes
  //   const currentLanguage = this.translationService.getCurrentLanguage();
  //   const newLanguage = currentLanguage === 'en' ? 'ar' : 'en';

  //   this.translationService.setLanguage(newLanguage);
  //   this.translateDirAttribute();
  // }

  // private translateDirAttribute() {
  //   this.translatedDirAttribute =
  //     this.translationService.translateAttribute('dir');
  // }
}
