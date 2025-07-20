import { Component, Input, model, signal } from '@angular/core';
import { Contact } from '../../../../core/models/ContactUs/contactUs.model';
import { User } from '../../../admin/manage/users/models/user.model';

@Component({
  selector: 'app-contact-item',
  standalone: false,

  templateUrl: './contact-item.component.html',
  styleUrl: './contact-item.component.scss',
})
export class ContactItemComponent {
  readonly item = model<User | null>(null);
}
