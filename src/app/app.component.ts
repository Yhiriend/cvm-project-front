import { AfterViewInit, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from '../shared/components/toast/toast.component';
import { ToastService } from '../shared/components/toast/toast.service';
import { LoaderService } from '../shared/components/loader.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, RouterOutlet, ToastComponent],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'FRONTEND_CVM';
  toastService = inject(ToastService);
  loaderService = inject(LoaderService);
  message: string = '';
  showToast = false;
  showLoader = false;

  constructor(private cdr: ChangeDetectorRef){}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.toastService.toast$.subscribe((res: any) => {
      this.message = res.message;
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 2500);
    });
    this.loaderService.loader$.subscribe((res: any) => {
      this.showLoader = res.load;
    });
    this.cdr.detectChanges();
  }
}
