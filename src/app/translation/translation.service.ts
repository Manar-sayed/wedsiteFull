// translation.service.ts
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
//import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  public currentLanguageSubject: BehaviorSubject<string> | any;
  public currentLanguage: Observable<string> | any;
  constructor(private translate: TranslateService) {
    // Set the default language
    // this.translate.setDefaultLang('ar');
    this.currentLanguageSubject = new BehaviorSubject<string>('ar');
    this.currentLanguage = this.currentLanguageSubject.asObservable();
  }

  setLanguage(language: string): void {
    this.currentLanguageSubject?.next(language);

    // this.translate.use(language);
    // localStorage.setItem('currentLanguage', language); // Save the current language in local storage
  }
   getLanguage(): Observable<string> {
    return this.currentLanguage;
  }

  // getCurrentLanguage(): string {
  //   // Get the current language from local storage
  //   return localStorage.getItem('currentLanguage') || 'en';
  // }

  translateAttribute(attribute: string): string {
    return this.translate.instant(attribute);
  }
}
