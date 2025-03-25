import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MDrawerPusherService {
 toggleDrawer: BehaviorSubject<void | null> = new BehaviorSubject<void | null>(
    null
  );
  constructor() { }
}
