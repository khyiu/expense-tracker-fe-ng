import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SecurityGuard} from './security/security.guard';
import {PurchaseListComponent} from './purchase/purchase-list.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'purchases'
  },

  // todo kyiu: revert after test
  // {
  //   path: 'purchases',
  //   pathMatch: 'full',
  //   component: PurchaseListComponent,
  //   canActivate: [SecurityGuard],
  // },

  {
    path: 'purchases',
    pathMatch: 'full',
    component: PurchaseListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AppRoutingModule {
}
