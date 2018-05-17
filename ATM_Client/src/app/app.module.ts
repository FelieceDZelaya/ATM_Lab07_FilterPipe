import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { RoutingModule } from './modules/routing.module';
import { AtmServiceService } from './services/atm-service.service';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { AtmoperationsComponent } from './components/atmoperations/atmoperations.component';
import { AuthenticateComponent } from './components/authenticate/authenticate.component';
import { componentFactoryName } from '@angular/compiler';
import { MainopComponent } from './components/mainop/mainop.component';
import { ArrayFilterPipe } from './pipes/array-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TransactionListComponent,
    AtmoperationsComponent,
    AuthenticateComponent,
    MainopComponent,
    ArrayFilterPipe
  ],
  
  imports: [
    BrowserModule  ,
    HttpClientModule,
    ReactiveFormsModule,
    RoutingModule
  ],

  providers: [AtmServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
