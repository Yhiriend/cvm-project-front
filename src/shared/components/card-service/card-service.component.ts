import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card-service',
  standalone: true,
  imports: [],
  templateUrl: './card-service.component.html',
  styleUrl: './card-service.component.css',
})
export class CardServiceComponent {
  @Input('cardTitle') cardTitle?: string;
  @Input('imageUrl') imageUrl?: string;
  @Output() onCardClick = new EventEmitter<void>();

  onCardEmitClick() {
    this.onCardClick.emit();
  }
}
