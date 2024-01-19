import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingService } from '../_sharedService/setting.service';
import { Setting } from '../_sharedService/setting';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  constructor(
    private settingService: SettingService,
    activatedRoute: ActivatedRoute,
    public router: Router
  ) {}

  settingGet: Setting = new Setting(0, '', '', '', '', '', '', '');
  // allGategory: any = [];
  language: string = 'ar';
  textDir: any;
  ngOnInit(): void {
    this.settingService.getAllSetting().subscribe(
      (data) => {
        console.log('setting from fotter');
        this.settingGet = data;
        console.log(this.settingGet);
      },
      (error) => {
        console.error('Error fetching setting:', error);
      }
    );
  }
}
