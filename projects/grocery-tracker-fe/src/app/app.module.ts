import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PurchaseListComponent } from './purchase/purchase-list.component';
import { SecurityGuard } from './security/security.guard';
import { SecurityService } from './security/security.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, PurchaseListComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [SecurityGuard, SecurityService],
  bootstrap: [AppComponent],
})
export class AppModule {}
