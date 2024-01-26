import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatedashService } from '../translation/translatedash.service';
import Swiper from 'swiper';
import { DomSanitizer } from '@angular/platform-browser';
import { Product } from '../_sharedService/_models/product';
import { ProductService } from '../_sharedService/_services/product.service';
declare var $: any; // Declare jQuery (Owl Carousel depends on it)

@Component({
  selector: 'app-projectdetails',
  templateUrl: './projectdetails.component.html',
  styleUrls: ['./projectdetails.component.css'],
})
export class ProjectdetailsComponent implements AfterViewInit {
  @ViewChild('carousel') carousel!: ElementRef;
  @ViewChild('carousel1') carousel1!: ElementRef;
  shouldReload: boolean = true;

  ngAfterViewInit() {
    // Initialize Owl Carousel
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
    $(this.carousel1.nativeElement).owlCarousel({
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
        '<i class="fa fa-chevron-right p-5  py-2 "></i>',
      ],
    });
  }
  language: string = 'ar';
  textDir: any;
  productId: number = 0;
  currentProduct: Product = new Product(0, '', '', '', '', '', '', []);
  allRelatedWork: any = [];
  imageUrl: any = 'https://jovial-darwin.162-220-162-242.plesk.page';
  // photohttp = {
  //   path: 'http://localhost:4200/',
  // };
  fullUrl: any;
  defaultImageUrl: string = 'assets/images/home2/slide3.jpg';

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    public router: Router,
    private sanitizer: DomSanitizer,
    private translatedashService: TranslatedashService
  ) {}
  setDefaultImage() {
    this.fullUrl = this.defaultImageUrl;
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
      this.activatedRoute.params.subscribe((p) =>
        this.productService
          .getById(p['id'], this.language)
          .subscribe((data: any) => {
            this.productId = p['id'];
            console.log('productId', this.productId);
            this.currentProduct = data;
            //window.location.reload()
            this.fullUrl = this.imageUrl + this.currentProduct.photos[0]?.path;
            // console.log('fullUrl', this.fullUrl);

            console.log(data);

            //get related work based on project id
            this.productService
              .getAllByProductId(this.language, this.productId)
              .subscribe((data) => {
                this.allRelatedWork = data.items;
                console.log('allRelatedWork-->', this.allRelatedWork);
              });
          })
      );
    });
  }
}
