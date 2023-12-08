import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoadingService } from '../modules/core/domain/loading.service';
import { ToastComponent } from "../shared/components/toast/toast.component";
import { ToastService } from '../shared/components/toast/toast.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, ToastComponent]
})
export class AppComponent {
  title = 'FRONTEND_CVM';
  toastService = inject(ToastService);
  message: string = '';
  showToast = false;

  ngOnInit() {
    this.toastService.toast$.subscribe((res: any) => {
      console.log(res)
      this.message = res.message;
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 2500);
    });
  }
}
