import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslatedashService } from '../translation/translatedash.service';
import { Product } from '../_sharedService/_models/product';
import { ProductService } from '../_sharedService/_services/product.service';
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent {
  language: string = 'ar';
  categoryId: any;
  products: Product[] = [];

  textDir: any;
  constructor(
    private productService: ProductService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public dialog: MatDialog,
    private translatedashService: TranslatedashService,
    private translate: TranslateService,
    private renderer: Renderer2,
    private el: ElementRef,
    private cdRef: ChangeDetectorRef
  ) {}
  public editPro: any;

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
      this.activatedRoute.params.subscribe((p) =>
        this.productService.getByCategoryId(p['id'], this.language).subscribe(
          (data: any) => {
            this.products = data.items;
            this.categoryId = p['id'];
            console.log('categoryId', this.categoryId);
            console.log('data', this.products);
          },
          (error) => {
            console.error('Error fetching products:', error);
          }
        )
      );
    });
  }

  // loadProducts() {
  //   const index = 0;
  //   const size = 20;
  //   // all products
  //   this.productService
  //     .getByCategoryId(this.language, this.categoryId)
  //     .subscribe(
  //       (data: any) => {
  //         this.products = data.items;
  //         console.log(this.products);
  //       },
  //       (error) => {
  //         console.error('Error fetching products:', error);
  //       }
  //     );
  // }

  // this.textDir = 'ltr';
  // this.renderer.setAttribute(this.el.nativeElement, 'dir', this.textDir);
}
