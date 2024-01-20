import { Component } from '@angular/core';
import { ContactmessageService } from '../_sharedService/contact_message/contactmessage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslationService } from '../translation/translation.service';
import { TranslatedashService } from '../translation/translatedash.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent {
  constructor(
    public messageService: ContactmessageService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private translatedashService: TranslatedashService,
    private translationService: TranslationService
  ) {}
  contactusForm!: FormGroup;
  language: any = 'en';
  textDir: any;
  errortrue: any = false;

  public editPro: any;
  allGategory: any = [];
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
      console.log('lang from services', this.language);
    });
    this.contactusForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9 ]{11}'),
      ]),
    });
  }

  save() {
    if (this.contactusForm.valid) {
      const formData = this.contactusForm.value;

      this.messageService.create(formData).subscribe(
        (response) => {
          console.log('Contact form added successfully:', response);
          this.showSuccessAlert('Message Added successfully!'); // Show SweetAlert on success
          this.contactusForm.reset();
          this.router.navigate(['/dash/listproduct']);
        },
        (error) => {
          console.error('Error adding Contact Form:', error);
        }
      );
    } else {
      console.error('Form is invalid');
      this.errortrue = true;
    }
  }
  onInput() {
    this.errortrue = false;
  }
  goBack(): void {
    this.router.navigate(['/dash/listproduct']);
  }
  showSuccessAlert(title: any): void {
    Swal.fire({
      icon: 'success',
      title: title,
      showConfirmButton: false,
      timer: 1500, // Adjust the timer as needed
    });
  }
}
// language: string = 'ar';
// textDir: any;
// constructor(
//   public messageService: ContactmessageService,
//   public activatedRoute: ActivatedRoute,
//   private translationService: TranslationService,
//   private translatedashService: TranslatedashService,

//   public router: Router
// ) {}
// contactusForm!: FormGroup;

// public editPro: any;
// allGategory: any = [];
// ngOnInit(): void {
//   this.translatedashService.getLanguage().subscribe((language) => {
//     this.language = language;
//     if (this.language === 'en') {
//       this.textDir = 'ltr';
//       console.log(this.textDir);
//     } else {
//       this.textDir = 'rtl';
//       console.log(this.textDir);
//     }
//     this.contactusForm = new FormGroup({
//       name: new FormControl('', [
//         Validators.required,
//         Validators.minLength(4),
//       ]),
//       description: new FormControl('', [
//         Validators.required,
//         Validators.minLength(4),
//       ]),
//       phone: new FormControl('', [
//         Validators.required,
//         Validators.pattern('[0-9 ]{11}'),
//       ]),
//     });
//   });
// }

// save() {
//   if (this.contactusForm.valid) {
//     const formData = this.contactusForm.value;
//     this.messageService.create(formData).subscribe(
//       (response) => {
//         console.log('Contact form added successfully:', response);
//         this.router.navigate(['/dash/listproduct']);
//       },
//       (error) => {
//         console.error('Error adding Contact Form:', error);
//       }
//     );
//   } else {
//     console.error('Form is invalid');
//   }
// }
