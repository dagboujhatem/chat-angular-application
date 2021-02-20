import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MessageComposeComponent } from './message-compose/message-compose.component';
import { InboxComponent } from './inbox/inbox.component';
import { FormsModule } from '@angular/forms';
import { TimeAgoPipe } from '../utils/TimeAgoPipe';
import { FilterPipe } from '../utils/filter.pipe';


@NgModule({
  declarations: [DashboardComponent, MessageComposeComponent, InboxComponent, TimeAgoPipe, FilterPipe],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule
  ],
  providers: [TimeAgoPipe]
})
export class DashboardModule { }
