import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslationService } from '../translation/translation.service';
import { TranslatedashService } from '../translation/translatedash.service';
import { Product } from '../_sharedService/_models/product';
import { ProductService } from '../_sharedService/_services/product.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  translatedDirAttribute: any = '';
  products: Product[] = [];
  language: string = 'ar';
  textDir: any;
  constructor(
    private translationService: TranslationService,
    private productService: ProductService,
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
    });
  }
}
