import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputSwitchModule} from "primeng/inputswitch";
import {ButtonModule} from "primeng/button";
import {TableModule} from 'primeng/table';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CalendarModule} from 'primeng/calendar';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {SelectButtonModule} from 'primeng/selectbutton';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputSwitchModule,
    ButtonModule,
    TableModule,
    ScrollingModule,
    CalendarModule,
    MessagesModule,
    MessageModule,
    SelectButtonModule
  ],
  exports: [
    InputSwitchModule,
    ButtonModule,
    TableModule,
    ScrollingModule,
    CalendarModule,
    MessagesModule,
    MessageModule,
    SelectButtonModule
  ]
})
export class SharedModule { }
