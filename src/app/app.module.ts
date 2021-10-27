import { SparklineAllModule } from '@syncfusion/ej2-angular-charts';

import { DialogModule } from '@syncfusion/ej2-angular-popups';

import {
  DropDownListAllModule,
  MultiSelectAllModule,
} from '@syncfusion/ej2-angular-dropdowns';

import {
  ToolbarModule,
  ToolbarAllModule,
} from '@syncfusion/ej2-angular-navigations';

import {
  ButtonAllModule,
  CheckBoxAllModule,
  SwitchModule,
} from '@syncfusion/ej2-angular-buttons';

import {
  DatePickerModule,
  DatePickerAllModule,
} from '@syncfusion/ej2-angular-calendars';

import {
  NumericTextBoxAllModule,
  TextBoxAllModule,
  ColorPickerAllModule,
} from '@syncfusion/ej2-angular-inputs';

import { TreeGridAllModule } from '@syncfusion/ej2-angular-treegrid';
import { ContextMenuModule } from '@syncfusion/ej2-angular-navigations';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  PageService,
  FilterService,
  EditService,
  ToolbarService,
  SortService,
  ResizeService,
  ReorderService,
  ExcelExportService,
  PdfExportService,
  ContextMenuService,
} from '@syncfusion/ej2-angular-treegrid';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    HttpModule,
    TreeGridAllModule,
    NumericTextBoxAllModule,
    ToolbarModule,
    DropDownListAllModule,
    ButtonAllModule,
    DialogModule,
    MultiSelectAllModule,
    CheckBoxAllModule,
    ReactiveFormsModule,
    FormsModule,
    DatePickerModule,
    SparklineAllModule,
    BrowserModule,
    SwitchModule,
    ContextMenuModule,
    TextBoxAllModule,
    ColorPickerAllModule,
  ],
  providers: [
    PageService,
    SortService,
    FilterService,
    EditService,
    SortService,
    ResizeService,
    ReorderService,
    ExcelExportService,
    PdfExportService,
    ContextMenuService,
    ToolbarService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
