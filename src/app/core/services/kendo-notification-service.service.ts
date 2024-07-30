
import { Injectable } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';

@Injectable({
  providedIn: 'root',
})
export class KendoNotificationService {
  constructor(private notificationService: NotificationService) {}

  public show(
    style: 'none' | 'success' | 'warning' | 'error' | 'info' | undefined,
    message: string
  ): void {
    this.notificationService.show({
      content: message,
      cssClass: 'button-notification',
      hideAfter: 10000,
      animation: { type: 'slide', duration: 400 },
      position: { horizontal: 'center', vertical: 'top' },
      type: { style, icon: true },
    });
  }

  public showValidation(
    style: 'none' | 'success' | 'warning' | 'error' | 'info' | undefined,
    message: string
  ): void {
    this.notificationService.show({
      content: message,
      cssClass: 'button-notification',
      animation: { type: 'slide', duration: 400 },
      position: { horizontal: 'center', vertical: 'top' },
      type: { style, icon: true },
      closable: true,
    });
  }
}
