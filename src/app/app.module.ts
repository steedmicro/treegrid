import { SparklineAllModule } from '@syncfusion/ej2-angular-charts';

import { DialogModule } from '@syncfusion/ej2-angular-popups';

import {
  DropDownListAllModule,
  MultiSelectAllModule,
} from '@syncfusion/ej2-angular-dropdowns';

import {
  ButtonAllModule,
  CheckBoxAllModule,
  SwitchModule,
} from '@syncfusion/ej2-angular-buttons';

import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import {
  NumericTextBoxAllModule,
  TextBoxAllModule,
  ColorPickerAllModule,
} from '@syncfusion/ej2-angular-inputs';

import { TreeGridAllModule } from '@syncfusion/ej2-angular-treegrid';
import {
  ContextMenuModule,
  ToolbarModule,
} from '@syncfusion/ej2-angular-navigations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  FreezeService,
  RowDDService,
  SelectionService,
} from '@syncfusion/ej2-angular-treegrid';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
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
    FreezeService,
    RowDDService,
    SelectionService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
