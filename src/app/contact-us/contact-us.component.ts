import { Component, Input, OnInit } from '@angular/core';
import { ContactmessageService } from '../_sharedService/contact_message/contactmessage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslationService } from '../translation/translation.service';
import { TranslatedashService } from '../translation/translatedash.service';
import Swal from 'sweetalert2';
import { SettingService } from '../_sharedService/setting.service';
import { Setting } from '../_sharedService/setting';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent implements OnInit {
  settingGet: Setting = new Setting(0, '', '', '', '', '', '', '');
  @Input() language: any;
  constructor(
    public messageService: ContactmessageService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private translatedashService: TranslatedashService,
    private translationService: TranslationService,
    private settingService: SettingService
  ) {}
  contactusForm!: FormGroup;
  textDir: any;
  errortrue: any = false;

  public editPro: any;
  allGategory: any = [];
  ngOnInit(): void {
    console.log('first');
    this.translatedashService.selectedLanguage$.subscribe((lan) => {
      this.language = lan;
      if (this.language === 'en') {
        this.textDir = 'ltr';
        console.log(this.textDir);
      } else {
        this.textDir = 'rtl';
        console.log(this.textDir);
      }

      console.log('lang from services', this.language);
      this.settingService.getAllSetting().subscribe(
        (data) => {
          console.log('setting from footer');
          this.settingGet = data;
          console.log('this.settingGet', this.settingGet);
        },
        (error) => {
          console.error('Error fetching setting:', error);
        }
      );
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
