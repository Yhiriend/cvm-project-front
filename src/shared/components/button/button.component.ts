import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input('buttonColor') buttonColor?: 'primary' | 'secondary';
  @Input('buttonType') buttonType?: string;
  @Output() onClick = new EventEmitter<void>();
  @Input('buttonText') buttonText?: string;
  @Input('isLoading') isLoading?: any;

  constructor(private store: Store) {}

  emitOnclick() {
    this.onClick.emit();
  }
}
