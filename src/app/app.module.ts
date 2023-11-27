import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { HttpClientModule } from '@angular/common/http';
import { TeamsTableComponent } from './components/teams-table/teams-table.component';
import { DropdownMenuComponent } from './components/dropdown-menu/dropdown-menu.component';
import { FormsModule } from '@angular/forms';
import { TeamsStatisticsComponent } from './components/teams-statistics/teams-statistics.component';
import { StatisticsChartComponent } from './components/statistics-chart/statistics-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    TeamsTableComponent,
    DropdownMenuComponent,
    TeamsStatisticsComponent,
    StatisticsChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgApexchartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
