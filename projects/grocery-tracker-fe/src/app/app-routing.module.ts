import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityGuard } from './security/security.guard';
import { PurchaseListComponent } from './purchase/purchase-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'purchases',
  },

  {
    path: 'purchases',
    pathMatch: 'full',
    component: PurchaseListComponent,
    canActivate: [SecurityGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
