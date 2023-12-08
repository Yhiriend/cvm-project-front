import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.css'
})
export default class ImageUploadComponent {
  selectedImage: File | null = null;

  constructor(private http: HttpClient) {}

  onFileSelected(event: any): void {
    this.selectedImage = event.target.files[0] as File;
  }

  onUpload(): void {
    if (this.selectedImage) {
      const formData = new FormData();
      formData.append('file', this.selectedImage);
      const body = {
        brand: 'SAMSUNG',
        data: this.selectedImage
      }
      console.log(this.selectedImage)

      this.http.post<any>(`${environment.productApi}/saveimage`, formData)
        .subscribe(response => {
          console.log(response);
        });
    }
  }
}
