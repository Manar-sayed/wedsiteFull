import { Component, Input } from '@angular/core';
import { Category } from '../_sharedService/_models/category';
import { TranslationService } from '../translation/translation.service';
import { CategoryService } from '../_sharedService/_services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatedashService } from '../translation/translatedash.service';

@Component({
  selector: 'app-main-service-page',
  templateUrl: './main-service-page.component.html',
  styleUrls: ['./main-service-page.component.css'],
})
export class MainServicePageComponent {
  translatedDirAttribute: any = '';
  categorys: Category[] = [];
  @Input() language: any;
  textDir: any;
  constructor(
    private translationService: TranslationService,
    private categoryService: CategoryService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private translatedashService: TranslatedashService
  ) {}
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
      this.loadProducts(); // You can call your loadProducts function here
    });
  }

  loadProducts() {
    const index = 0;
    const size = 20;
    // all products
    this.categoryService.getAllCategory(this.language, index, size).subscribe(
      (data) => {
        this.categorys = data.items;
        console.log(this.categorys);
      },
      (error) => {
        console.error('Error fetching categorys:', error);
      }
    );
  }

  private translateDirAttribute() {
    this.translatedDirAttribute =
      this.translationService.translateAttribute('dir');
  }
}
