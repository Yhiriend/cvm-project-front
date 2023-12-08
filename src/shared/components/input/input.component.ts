import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  @Input('inputType') inputType: string = 'text';
  @Input('inputLabel') inputLabel?: string;
  @Input('inputId') inputId?: string;
  @Input('inputName') inputName?: string;
  @Input('placeholder') placeholder?: string;
  @Input() control: FormControl = new FormControl('');
  @Input('options') options: any;
  @Input('selectorType') selectorType: 'small' | 'normal' = 'normal';

  getSelectorClass() {
    if (this.selectorType === 'small') {
      return 'text-gray-600 text-center focus:outline-none bg-white font-maxwellRegular text-lg tracking-wider w-full h-8 flex items-center px-3 border-gray-300 rounded-[40px]';
    } else {
      return 'text-gray-600 text-center focus:outline-none bg-white font-maxwellRegular text-lg tracking-wider w-full h-10 flex items-center px-3 border-gray-300 rounded-[40px]';
    }
  }

  onInput(event: any) {
    const inputValue = event.target.value;
    const nonNegativeValue = Math.max(0, inputValue);
    this.control.setValue(nonNegativeValue, { emitEvent: false });
  }
}
