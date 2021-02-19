import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MessageComposeComponent } from './message-compose/message-compose.component';
import { InboxComponent } from './inbox/inbox.component';


@NgModule({
  declarations: [DashboardComponent, MessageComposeComponent, InboxComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
