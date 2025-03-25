import { Component, model } from '@angular/core';
import { Message } from '../../../models/message/message.model';
import { UserMessage } from '../../../models/userMassage/userMessage.model';

@Component({
  selector: 'app-message-item',
  standalone: false,
  
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.scss'
})
export class MessageItemComponent {
readonly item= model<UserMessage|null>(null);
readonly currentUserId= model('')

}
