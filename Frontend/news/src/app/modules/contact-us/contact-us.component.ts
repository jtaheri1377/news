import { Component, OnInit, signal } from '@angular/core';
import { Contact } from '../../core/models/ContactUs/contactUs.model';

@Component({
  selector: 'app-contact-us',
  standalone: false,
  
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent implements OnInit {
readonly users=signal<Contact[]>([]);

ngOnInit(): void {
  var test:Contact[]=[{
    id:10,
    name:'سید امیر علی بابایی',
    img:'',
    phone:'09124324333',
    role:'مدیر سامانه',
    province:'قم',
    link:'http://web.eitaa.ir',
    firstCyberspace:'@AmirAli_313',
    secondCyberspace:'@AmirAli_313',
  }]
    this.users.set(test)
}
}
