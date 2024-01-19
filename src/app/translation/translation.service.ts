// translation.service.ts
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
//import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  constructor(private translate: TranslateService) {
    // Set the default language
    this.translate.setDefaultLang('ar');
  }

  setLanguage(language: string): void {
    this.translate.use(language);
    localStorage.setItem('currentLanguage', language); // Save the current language in local storage
  }

  getCurrentLanguage(): string {
    // Get the current language from local storage
    return localStorage.getItem('currentLanguage') || 'ar';
  }

  translateAttribute(attribute: string): string {
    return this.translate.instant(attribute);
  }
}
