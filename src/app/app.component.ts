import { Component, Input } from '@angular/core';
import { TranslationService } from './translation/translation.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslatedashService } from './translation/translatedash.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'constructios';
  @Input() language: any;
  textDir: any;
  constructor(
    public translate: TranslateService,
    private translatedashService: TranslatedashService
  ) {
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('en');
  }
  ngOnInit(): void {
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
  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
