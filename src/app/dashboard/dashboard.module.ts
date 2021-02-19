import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MessageComposeComponent } from './message-compose/message-compose.component';
import { InboxComponent } from './inbox/inbox.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [DashboardComponent, MessageComposeComponent, InboxComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule
  ]
})
export class DashboardModule { }
