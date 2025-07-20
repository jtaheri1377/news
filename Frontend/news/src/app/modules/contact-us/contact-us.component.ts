import { Component, model, OnInit, signal } from '@angular/core';
import { Contact } from '../../core/models/ContactUs/contactUs.model';
import { User } from '../admin/manage/users/models/user.model';
import { Subscription } from 'rxjs';
import { ContactUsService } from './services/contact-us.service';

@Component({
  selector: 'app-contact-us',
  standalone: false,

  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
})
export class ContactUsComponent implements OnInit {
  readonly users = model<User[]>([]);
  subs: Subscription[] = [];
  isLoading: boolean = false;
  // users: User[] = []
  //  test: User[] = [
  //   {
  //     id: 10,
  //     name: 'سید امیر علی بابایی',
  //     // img: '',
  //     phone1: '09124324333',
  //     role: 'مدیر سامانه',
  //     province: 'قم',
  //     link: 'http://web.eitaa.ir',
  //     firstCyberspace: '@AmirAli_313',
  //     secondCyberspace: '@AmirAli_313',
  //   },
  // ];

  constructor(private service: ContactUsService) {}

  ngOnInit(): void {
    // this.users.set(this.test);
  }

  fetchUsers(provinceId: number) {
    this.isLoading = true;
    var sub = this.service
      .getRepresentatives(provinceId)
      .subscribe((res: any) => {
        this.isLoading = false;
        this.users.set(res);
      });
    this.subs.push(sub);
  }

  onSelectProvince(provinceId: number) {
    this.fetchUsers(provinceId);
  }

  ngOnDestroy(): void {
    this.subs.forEach((x) => x.unsubscribe());
  }
}
