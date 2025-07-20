import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DrawerPusherService {
  toggleDrawer: BehaviorSubject<void | null> = new BehaviorSubject<void | null>(
    null
  );
  provinceUpdate$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor() {}
}
