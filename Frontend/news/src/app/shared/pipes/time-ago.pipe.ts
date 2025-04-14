import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'TimeAgo',
  standalone: false,
  pure:false
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: string | Date): string {
    if (!value) return 'نامشخص';

    const date = new Date(value);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'همین الآن';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} دقیقه پیش`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} ساعت پیش`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} روز پیش`;
    if (seconds < 2592000) return `${Math.floor(seconds / 604800)} هفته پیش`;
    if (seconds < 31536000) return `${Math.floor(seconds / 2592000)} ماه پیش`;

    return `${Math.floor(seconds / 31536000)} سال پیش`;
  }

}
 