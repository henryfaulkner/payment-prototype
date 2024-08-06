import { Component, ElementRef, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { BladeObserverService } from '../../core/services/blade-observer.service';
import { Subscription } from 'rxjs';
import { destructSubscriptionArray } from '../../destruct-subscription-array';
import { BladeState } from '../../types/blade-state.type';

@Component({
  selector: 'app-blade-container',
  templateUrl: './blade-container.component.html',
  styleUrl: './blade-container.component.scss'
})
export class BladeContainerComponent implements OnInit, OnDestroy {
  @Input() bladeHashId;
  @Input() title: string = '';

  isOpen = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private bos: BladeObserverService,
    private elementRef: ElementRef,
  ) { }

  ngOnInit(): void {
    console.log('BladeContainerComponent ngOnInit, hash ' + this.bladeHashId)
    this.bos.setBladeSubject(this.bladeHashId);
    this.subscriptions.push(
      this.bos.observeBladeEvent(this.bladeHashId).subscribe((event: BladeState) => {
        console.log("BladeContainerComponent The blade state has changed. hash " + this.bladeHashId, event);
        this.isOpen = event.isOpen;
      })
    )
  }

  ngOnDestroy(): void {
    destructSubscriptionArray(this.subscriptions);
  }

  // @HostListener('document:click', ['$event'])
  // onClick(event: MouseEvent) {
  //   if (!this.elementRef) return;
  //   // Check if the click target is outside the component
  //   const isClickedOutside = !this.elementRef.nativeElement.contains(
  //     event.target,
  //   );
  //   if (isClickedOutside) this.closeBlade();
  // }

  closeBlade() {
    console.log('Call closeBlade')
    this.bos.emitBladeEvent(this.bladeHashId, { isOpen: false })
  }
}
