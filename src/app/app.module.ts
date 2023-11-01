import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { HttpClientModule } from '@angular/common/http';
import { TeamsTableComponent } from './components/teams-table/teams-table.component';

@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    TeamsTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
