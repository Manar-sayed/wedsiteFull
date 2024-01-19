import { Component, ElementRef } from '@angular/core';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownMenu } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../translation/translation.service';
import { TranslatedashService } from '../translation/translatedash.service';
import { CategoryService } from '../_sharedService/_services/category.service';
import { Category } from '../_sharedService/_models/category';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  translatedDirAttribute: any;
  currentLanguage: any;
  language: string = 'ar';
  textDir: any;
  selectedLanguage: string = 'ar';

  constructor(
    private el: ElementRef,
    private categoryService: CategoryService,
    private translationService: TranslationService,
    private translatedashService: TranslatedashService
  ) {}
  categories: Category[] = [];

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
      this.loadProducts();
    });
    let alldrpdwn = document.querySelectorAll('.dropdow-container');
    alldrpdwn.forEach((item: any) => {
      const a = item.parentElement?.querySelector('a:first-child');
      a.addEventListener('click', (e: any) => {
        e.preventDefault();
        this.el.nativeElement.classList.toggle('active');
        item.classList.toggle('show');
        e.defaultStatus = true;
      });
    });
  }

  loadProducts() {
    const index = 0;
    const size = 20;
    // all products
    this.categoryService.getAllCategory(this.language, index, size).subscribe(
      (data) => {
        this.categories = data.items;
        console.log(this.categories);
      },
      (error) => {
        console.error('Error fetching category:', error);
      }
    );
  }
  switchLanguage(newLanguage: string) {
    console.log(`Switching to ${newLanguage}`);
    this.selectedLanguage = newLanguage;
    this.translatedashService.setLanguage(newLanguage);
  }
  // ngOnInit() {
  //   this.translateDirAttribute();
  //   this.currentLanguage = this.translationService.getCurrentLanguage();
  // }

  // switchLanguage() {
  //   const newLanguage = this.currentLanguage === 'en' ? 'ar' : 'en';
  //   this.translationService.setLanguage(newLanguage);
  //   this.translateDirAttribute();
  //   this.currentLanguage = newLanguage;
  // }

  private translateDirAttribute() {
    this.translatedDirAttribute =
      this.translationService.translateAttribute('dir');
  }
}