import { Component } from '@angular/core';
import { ContactmessageService } from '../_sharedService/contact_message/contactmessage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslationService } from '../translation/translation.service';
import { TranslatedashService } from '../translation/translatedash.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent {
  language: string = 'ar';
  textDir: any;
  constructor(
    public messageService: ContactmessageService,
    public activatedRoute: ActivatedRoute,
    private translationService: TranslationService,
    private translatedashService: TranslatedashService,

    public router: Router
  ) {}
  contactusForm!: FormGroup;

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
      this.contactusForm = new FormGroup({
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
        description: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
        phone: new FormControl('', [
          Validators.required,
          Validators.pattern('[0-9 ]{11}'),
        ]),
      });
    });
  }

  save() {
    if (this.contactusForm.valid) {
      const formData = this.contactusForm.value;
      this.messageService.create(formData).subscribe(
        (response) => {
          console.log('Contact form added successfully:', response);
          this.router.navigate(['/dash/listproduct']);
        },
        (error) => {
          console.error('Error adding Contact Form:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}
