import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentCreationComponent } from './pages/payment-creation/payment-creation.component';
import { PaymentApplicationComponent } from './pages/payment-application/payment-application.component';
import { PaymentDocumentUploadComponent } from './pages/payment-document-upload/payment-document-upload.component';
import { UnreleasedPaymentsComponent } from './pages/unreleased-payments/unreleased-payments.component';
import { ReleasedPaymentsComponent } from './pages/released-payments/released-payments.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentCreationComponent
  },
  {
    path: 'payment-application',
    component: PaymentApplicationComponent
  },
  {
    path: 'payment-document-upload',
    component: PaymentDocumentUploadComponent
  },
  {
    path: 'unreleased-payments',
    component: UnreleasedPaymentsComponent
  },
  {
    path: 'released-payments',
    component: ReleasedPaymentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
