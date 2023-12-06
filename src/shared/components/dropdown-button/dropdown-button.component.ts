import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown-button',
  standalone: true,
  imports: [],
  templateUrl: './dropdown-button.component.html',
  styleUrl: './dropdown-button.component.css'
})
export class DropdownButtonComponent {
  @Input() buttonText: string = 'Theme';

  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
