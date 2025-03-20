import { Component, ViewChild, ElementRef, HostListener, model } from '@angular/core';
import { Media } from '../../../../core/models/media/media.model';

@Component({
  selector: 'app-smart-video-player',
  standalone: false,

  templateUrl: './smart-video-player.component.html',
  styleUrl: './smart-video-player.component.scss',
})
export class SmartVideoPlayerComponent {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  readonly src = model<string>("");

  showRotateMessage = false; // متغیر برای نمایش پیام چرخش

  constructor() {}

  toggleFullScreen() {
    debugger
    const video = this.videoPlayer.nativeElement;
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if ((video as any).webkitRequestFullscreen) {
      (video as any).webkitRequestFullscreen();
    } else if ((video as any).mozRequestFullScreen) {
      (video as any).mozRequestFullScreen();
    } else if ((video as any).msRequestFullscreen) {
      (video as any).msRequestFullscreen();
    }
  }

  async onFullscreenChange() {
    if (document.fullscreenElement) {
      // فقط در موبایل این کار را انجام بده
      if (window.innerWidth < 768) {
        if ('orientation' in screen) {
          try {
            await (screen.orientation as any).lock('landscape');
          } catch (error) {
            console.warn('Screen orientation lock failed. Showing message...');
            this.showRotateMessage = true; // اگر قفل نشد، پیام را نشان بده
          }
        } else {
          this.showRotateMessage = true;
        }
      }
    } else {
      // وقتی از فول‌اسکرین خارج شد، پیام را حذف کن
      this.showRotateMessage = false;
      if (window.innerWidth < 768 && 'orientation' in screen) {
        try {
          await (screen.orientation as any).unlock();
        } catch (error) {
          console.warn('Cannot unlock screen orientation');
        }
      }
    }
  }
}