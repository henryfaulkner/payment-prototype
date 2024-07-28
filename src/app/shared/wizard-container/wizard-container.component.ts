import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-wizard-container',
  templateUrl: './wizard-container.component.html',
  styleUrl: './wizard-container.component.scss',
})
export class WizardContainerComponent {
  @Input() showBack: boolean = false;
  @Input() showNext: boolean = false;

  @Output() backEvent = new EventEmitter();
  @Output() nextEvent = new EventEmitter();

  back() {
    this.backEvent.emit();
  }

  next() {
    this.nextEvent.emit();
  }
}
