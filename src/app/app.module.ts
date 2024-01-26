import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ProjectsComponent } from './projects/projects.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { FooterComponent } from './footer/footer.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslationService } from './translation/translation.service';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NavigationComponent } from './navigation/navigation.component';
import { ProjectdetailsComponent } from './projectdetails/projectdetails.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { ServiceUpdateComponent } from './_sharedService/service-update/service-update.component';
import { ServicegetComponent } from './_sharedService/serviceget/serviceget.component';
import { MessageAddComponent } from './_sharedService/contact_message/message-add/message-add.component';
import { MessageGetComponent } from './_sharedService/contact_message/message-get/message-get.component';
import { TranslationPipe } from './translation/translation.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WhatsappButtonComponent } from './whatsapp-button/whatsapp-button.component';
import { MainServicePageComponent } from './main-service-page/main-service-page.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    ContactUsComponent,
    ProjectsComponent,
    AboutComponent,
    ServicesComponent,
    FooterComponent,
    NavigationComponent,
    ProjectdetailsComponent,
    ServiceUpdateComponent,
    ServicegetComponent,
    MessageAddComponent,
    MessageGetComponent,
    TranslationPipe,
    WhatsappButtonComponent,
    MainServicePageComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatProgressBarModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatRadioModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MatProgressSpinnerModule,

    TranslateModule.forRoot({
      defaultLanguage: 'en',
      useDefaultLang: true,
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  // exports: [TranslateModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  // constructor(private translationService: TranslationService) {
  //   this.translationService.init();
  // }
}
