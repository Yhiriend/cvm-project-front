import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from '../shared/components/toast/toast.component';
import { ToastService } from '../shared/components/toast/toast.service';
import { LoaderService } from '../shared/components/loader.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule, RouterOutlet, ToastComponent],
})
export class AppComponent {
  title = 'FRONTEND_CVM';
  toastService = inject(ToastService);
  loaderService = inject(LoaderService);
  message: string = '';
  showToast = false;
  showLoader = false;

  ngOnInit() {
    this.toastService.toast$.subscribe((res: any) => {
      this.message = res.message;
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 2500);
    });
    this.loaderService.loader$.subscribe((res: any) => {
      this.showLoader = res.load;
    })
  }
}
