import { Component, Input } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent {
  showToast: boolean = false;
  @Input ('message') message: string = '';

  constructor(private toastService: ToastService) {
    this.toastService.showToast$.subscribe((show) => {
      this.showToast = show;
    });
  }

  hideToast(): void {
    this.toastService.hide();
  }
}
