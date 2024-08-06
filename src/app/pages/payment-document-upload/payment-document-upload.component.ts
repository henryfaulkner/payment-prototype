import { Component, OnDestroy } from '@angular/core';
import { PaymentDocumentBatch } from '../../types/payment-document-batch.type';
import { PaymentDocument } from '../../types/payment-document.type';
import { BladeObserverService } from '../../core/services/blade-observer.service';
import { BladeState } from '../../types/blade-state.type';
import { Subscription } from 'rxjs';
import { destructSubscriptionArray } from '../../destruct-subscription-array';

@Component({
  selector: 'app-payment-document-upload',
  templateUrl: './payment-document-upload.component.html',
  styleUrl: './payment-document-upload.component.scss'
})
export class PaymentDocumentUploadComponent implements OnDestroy {
  createBladeHashId = 'create-payment-document-blade';
  createBladeDocument: PaymentDocument;
  createBladeTitle = 'Create Payment Document';

  modifyBladeHashId = 'modify-payment-document-blade'
  modifyBladeDocument: PaymentDocument;
  modifyBladeTitle = 'Modify Payment Document'

  public paymentDocumentBatch: PaymentDocumentBatch = {
    paymentDocuments: [],
  };

  private subscriptions: Subscription[] = [];

  constructor(private bos: BladeObserverService) {
    this.subscriptions.push(
      this.bos.observeBladeEvent(this.createBladeHashId).subscribe((event: BladeState) => {
        console.log("The create blade state has changed.", event);
      })
    );

    this.subscriptions.push(
      this.bos.observeBladeEvent(this.modifyBladeHashId).subscribe((event: BladeState) => {
        console.log("The modify blade state has changed.", event);
      })
    );
  }

  ngOnDestroy(): void {
    destructSubscriptionArray(this.subscriptions);
  }

  public openCreatePaymentDocumentBlade(documents: PaymentDocumentBatch) {
    if (documents !== null && documents.paymentDocuments.length > 0){
      this.createBladeDocument = documents.paymentDocuments[0];
    }
    this.bos.emitBladeEvent(this.createBladeHashId, {isOpen:true});
  }

  public openModifyPaymentDocumentBlade(documents: PaymentDocumentBatch) {
    if (documents !== null && documents.paymentDocuments.length > 0){
      this.modifyBladeDocument = documents.paymentDocuments[0];
    }
    this.bos.emitBladeEvent(this.modifyBladeHashId, {isOpen:true});
  }

  createBladeEventHandler(event: boolean) {
    // the blade component has created or modified a document
    // refresh the document table if event is true, indicating a change in state
  }

  modifyBladeEventHandler(event: boolean) {
    // the blade component has created or modified a document
    // refresh the document table if event is true, indicating a change in state
  }
}
