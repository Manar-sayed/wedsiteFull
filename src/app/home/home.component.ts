import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { TranslationService } from '../translation/translation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatedashService } from '../translation/translatedash.service';
import { ProductService } from '../_sharedService/_services/product.service';
import { Product } from '../_sharedService/_models/product';
import { CategoryService } from '../_sharedService/_services/category.service';
import { Category } from '../_sharedService/_models/category';
declare var $: any; // Declare jQuery (Owl Carousel depends on it)

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('carousel') carousel!: ElementRef;

  images = [
    'https://plus.unsplash.com/premium_photo-1661952448084-c8ff11cc973f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1661962468079-5d6791f9c627?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1531431057391-da7a1aabd412?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ].map((n) => `${n}`);

  translatedDirAttribute: any = '';
  language: string = 'ar';
  products: Product[] = [];
  categorys: Category[] = [];
  textDir: any;
  constructor(
    private translationService: TranslationService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private translatedashService: TranslatedashService,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}
  ngAfterViewInit() {
    $(this.carousel.nativeElement).owlCarousel({
      loop: true,
      nav: true,
      dots: true,
      autoplay: true,
      autoplayTimeout: 3000,
      responsive: {
        0: { items: 1 },
        800: { items: 2, margin: 20 },
        1000: { items: 3 },
      },
      navText: [
        '<i class="fa fa-chevron-left  py-2  "></i>',
        '<i class="fa fa-chevron-right  py-2 "></i>',
      ],
    });
    // $(this.owlCarousel.nativeElement).owlCarousel({
    //   // Owl Carousel options
    //   loop: true,
    //   margin: 10,
    //   autoplay: true,
    //   responsive: {
    //     0: {
    //       items: 1, // Display one item on small screens
    //     },
    //     768: {
    //       items: 2, // Display two items on medium screens
    //     },
    //     992: {
    //       items: 3, // Display three items on large screens
    //     },
    //   },
    // });
  }

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
    this.categoryService.getAllCategory(this.language, index, size).subscribe(
      (data) => {
        this.categorys = data.items;
        console.log('this.categorys from home', this.categorys);
      },
      (error) => {
        console.error('Error fetching categorys:', error);
      }
    );
  }
}
