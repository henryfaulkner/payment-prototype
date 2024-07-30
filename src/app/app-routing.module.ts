import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentCreationComponent } from './pages/payment-creation/payment-creation.component';
import { PaymentApplicationComponent } from './pages/payment-application/payment-application.component';
import { PaymentDocumentUploadComponent } from './pages/payment-document-upload/payment-document-upload.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
