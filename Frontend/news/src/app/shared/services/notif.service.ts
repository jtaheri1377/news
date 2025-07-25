import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotifService {
  // service = inject(HotToastService);

  constructor(private service:ToastrService){}

  success(message: string) {
    this.service.success(message);
  }
  error(message: string) {
    this.service.error(message);
  }
  info(message: string) {
    this.service.info(message, );
  }
  warn(message: string) {
    this.service.warning(message,);
  }
  // showToast() {
  //   this.toast.show('Hello World!');
  //   this.toast.loading('Lazyyy...');
  //   this.toast.success('Yeah!!');
  //   this.toast.warning('Boo!');
  //   this.toast.error('Oh no!');
  //   this.toast.info('Something...');
  // }

  // update() {
  //   saveSettings
  //     .pipe(
  //       this.toast.observe({
  //         loading: 'Saving...',
  //         success: 'Settings saved!',
  //         error: 'Could not save.',
  //       })
  //     )
  //     .subscribe();
  // }

  // customToast(message:string,) {
  //   this.toast.success(message, {
  //     duration: 5000,
  //     style: {
  //       border: '1px solid #713200',
  //       padding: '16px',
  //       color: '#713200',
  //     },
  //     iconTheme: {
  //       primary: '#713200',
  //       secondary: '#FFFAEE',
  //     },
  //   });
  // }
  // successToast(message:string,) {
  //   this.toast.success(message, {
  //     duration: 5000,
  //     style: {
  //       border: '1px solid rgb(0, 197, 0)',
  //       padding: '16px',
  //       color: 'rgb(0, 87, 0)',
  //     },
  //     iconTheme: {
  //       primary: 'rgb(0, 134, 0)',
  //       secondary: '#FFFAEE',
  //     },
  //   });
  // }
  // ErrorToast(message:string,) {
  //   this.toast.error(message, {
  //     duration: 5000,
  //     style: {
  //       border: '1px solid rgb(197, 0, 43)',
  //       padding: '16px',
  //       color: 'rgb(87, 0, 0)',
  //     },
  //     iconTheme: {
  //       primary: 'rgb(134, 0, 0)',
  //       secondary: '#FFFAEE',
  //     },
  //   });
  // }
}
