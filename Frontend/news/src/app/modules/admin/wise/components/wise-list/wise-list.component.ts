import { Component } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'app-wise-list',
  standalone: false,

  templateUrl: './wise-list.component.html',
  styleUrl: './wise-list.component.scss',
})
export class WiseListComponent {
  constructor(public authService: AuthService) {}
}
