import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslationService } from '../translation/translation.service';
import { TranslatedashService } from '../translation/translatedash.service';
import { Product } from '../_sharedService/_models/product';
import { ProductService } from '../_sharedService/_services/product.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent {
  translatedDirAttribute: any = '';
  products: Product[] = [];
  @Input() language: any;
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
      this.loadProducts(); // You can call your loadProducts function here
    });
  }

  loadProducts() {
    const index = 0;
    const size = 20;
    // all products
    this.productService.getAllProducts(this.language, index, size).subscribe(
      (data) => {
        this.products = data.items;
        console.log(this.products);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  private translateDirAttribute() {
    this.translatedDirAttribute =
      this.translationService.translateAttribute('dir');
  }
}
