import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoggerService } from './logger.service';
import { BladeState } from '../../types/blade-state.type';

/**
 * This service utilizes the observer pattern to open and close BladeContainerComponents
 */
@Injectable({
  providedIn: 'root'
})
export class BladeObserverService {
  bladeSubjectHashMap: Map<string, BehaviorSubject<BladeState>>;

  constructor(private logger: LoggerService) { 
    this.bladeSubjectHashMap = new Map<string, BehaviorSubject<BladeState>>;
  }

  setBladeSubject(bladeHashId: string): void {
    if (this.bladeSubjectHashMap.has(bladeHashId)) {
      console.warn(`BladeSubject with ID ${bladeHashId} already exists.`);
      this.logger.warn(`BladeSubject with ID ${bladeHashId} already exists.`);
      return;
    }

    const bladeSubject: BehaviorSubject<BladeState> 
      = new BehaviorSubject<BladeState>({ isOpen: false });
    this.bladeSubjectHashMap.set(bladeHashId, bladeSubject);
  }

  emitBladeEvent(bladeHashId: string, newBladeState: BladeState): void {
    console.log('Call emitBladeEvent')
    const bladeSubject = this.bladeSubjectHashMap.get(bladeHashId);
    if (bladeSubject) {
      console.log('Call bladeSubject.next(newBladeState);')
      bladeSubject.next(newBladeState);
    } else {
      console.error(`Blade with ID ${bladeHashId} not found`);
      this.logger.error(`Blade with ID ${bladeHashId} not found`);
    }
  }

  observeBladeEvent(bladeHashId: string): Observable<BladeState> {
    const bladeSubject = this.bladeSubjectHashMap.get(bladeHashId);
    if (bladeSubject) {
      return bladeSubject.asObservable();
    } else {
      console.error(`Blade with ID ${bladeHashId} not found`);
      this.logger.error(`Blade with ID ${bladeHashId} not found`);
      return new Observable<BladeState>(); // Return an empty observable in case of an error
    }
  }
}
