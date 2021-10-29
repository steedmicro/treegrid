import { Component, OnInit, ViewChild } from '@angular/core';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import {
  TreeGridComponent,
  ToolbarItems,
} from '@syncfusion/ej2-angular-treegrid';
import { MenuEventArgs } from '@syncfusion/ej2-navigations';
import { BeforeOpenCloseEventArgs } from '@syncfusion/ej2-inputs';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { SwitchComponent } from '@syncfusion/ej2-angular-buttons';
import {
  getColumnModelByFieldName,
  SortEventArgs,
} from '@syncfusion/ej2-angular-grids';
import { FormGroup, FormControl } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  public data!: DataManager;
  public contextMenuItems!: Object[];
  public columns!: Object[];
  public columnStyles!: string[];
  public dialogButtons!: Object[];
  public dataTypes!: Object[];
  public minimumWidth: Number = 0;
  public columnName: string = '';
  public columnDefaultValue: any;
  public columnDataType: string = 'string';
  public columnMinimumWidth: Number = 100;
  public columnFontSize: Number = 20;
  public columnFontColor: string = '#000000ff';
  public columnBackgroundColor: string = '#ffffffff';
  public columnAlignment: string = 'Left';
  public columnWrap: string = 'normal';
  public alignments: string[] = ['Left', 'Right', 'Center'];
  public wraps: string[] = ['normal', 'break-word'];
  public currentMenuItemID: any = '';
  public currentColumnIndex: number = 0;
  public isFrozen: boolean = false;
  public isFilteringAllowed!: boolean;
  public isMultiSortingAllowed!: boolean;
  public isMultiSelectingAllowed!: boolean;
  public selectOptions!: Object;
  public editSettings!: Object;
  public position: any = { x: 100, y: 100 };
  @ViewChild('treegrid')
  public treeGridObj!: TreeGridComponent;
  @ViewChild('dialog')
  public dialog!: DialogComponent;
  @ViewChild('switch')
  public switchObj!: SwitchComponent;

  ngOnInit(): void {
    /*
    this.data = new DataManager({
      url: 'https://ej2services.syncfusion.com/production/web-services/api/SelfReferenceData',
      adaptor: new WebApiAdaptor(),
      crossDomain: true,
      offline: true,
    });
    */

    this.contextMenuItems = [
      { text: 'New', id: 'new_column', target: '.e-headercontent' },
      { text: 'Del', id: 'del_column', target: '.e-headercontent' },
      { text: 'Edit', id: 'edit_column', target: '.e-headercontent' },
      { text: 'Choose', id: 'choose_column', target: '.e-headercontent' },
      { text: 'Freeze', id: 'freeze_column', target: '.e-headercontent' },
      { text: 'Filter', id: 'filter_column', target: '.e-headercontent' },
      {
        text: 'MultiSort',
        id: 'multi_sort_column',
        target: '.e-headercelldiv',
      },
      { text: 'AddNext', id: 'add_next_row', target: '.e-content' },
      { text: 'AddChild', id: 'add_child_row', target: '.e-content' },
      { text: 'MultiSelect', id: 'multi_select_row', target: '.e-content' },
      { text: 'Del', id: 'del_row', target: '.e-content' },
      { text: 'Edit', id: 'edit_row', target: '.e-content' },
      { text: 'Copy', id: 'copy_row', target: '.e-content' },
      { text: 'Cut', id: 'cut_row', target: '.e-content' },
      { text: 'PasteNext', id: 'paste_next_row', target: '.e-content' },
      { text: 'PasteChild', id: 'paste_child_row', target: '.e-content' },
    ];
    this.columns = [
      {
        field: 'TaskID',
        headerText: 'Task ID',
        textAlign: 'Right',
      },
      {
        field: 'StartDate',
        headerText: 'Start Date',
        format: 'yMd',
        textAlign: 'Right',
        editType: 'datepicker',
      },
      {
        field: 'EndDate',
        headerText: 'End Date',
        format: 'yMd',
        textAlign: 'Right',
        editType: 'datepicker',
      },
      {
        field: 'Duration',
        headerText: 'Duration',
        textAlign: 'Right',
      },
      {
        field: 'Progress',
        headerText: 'Progress',
      },
      {
        field: 'Priority',
        headerText: 'Priority',
      },
    ];
    this.dialogButtons = [
      {
        buttonModel: {
          isPrimary: true,
          content: 'Ok',
          cssClass: 'e-flat',
        },
        click: () => {
          if (this.currentMenuItemID === 'new_column') {
            this.addColumn();
          }
          this.dialog.hide();
        },
      },
    ];
    this.dataTypes = ['string', 'number', 'date', 'boolean', 'dropdownlist'];
    this.selectOptions = { type: 'Single' };
    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: 'Dialog',
    };
    this.selectOptions = {
      type: 'Single',
    };
    this.isFilteringAllowed = false;
    this.isMultiSortingAllowed = false;
    this.isMultiSelectingAllowed = false;
  }
  public beforeMenuItemRender(args: MenuEventArgs) {
    if (args.item.id === 'freeze_column') {
      args.element.innerHTML =
        '<span class="e-frame e-icons e-check"></span>Freeze';
    }
  }
  public addColumn() {
    let i,
      queryResult = this.treeGridObj.grid
        .getHeaderContent()
        .querySelectorAll('.e-headercell'),
      l = queryResult.length,
      style;
    this.columnStyles = [];
    for (i = 0; i < l; i++) {
      style = queryResult[i].getAttribute('style');
      this.columnStyles.push(style ? style.toString() : '');
      style = queryResult[i].children[0].getAttribute('style');
      this.columnStyles.push(style ? style.toString() : '');
    }
    this.columns = [
      ...this.columns,
      {
        field: this.columnName,
        headerText: this.columnName,
        minimumWidth: this.columnMinimumWidth,
        textAlign: this.columnAlignment,
        type: this.columnDataType,
      },
    ];
    setTimeout(() => {
      let queryResult = this.treeGridObj.grid
          .getHeaderContent()
          .querySelectorAll('.e-headercell'),
        i = 0,
        l = queryResult.length;
      while (i < l - 1) {
        queryResult.item(i).setAttribute('style', this.columnStyles[i * 2]);
        queryResult
          .item(i)
          .children[0].setAttribute('style', this.columnStyles[i * 2 + 1]);
        i++;
      }
      queryResult
        .item(l - 1)
        .setAttribute(
          'style',
          'background-color: ' + this.columnBackgroundColor
        );
      queryResult
        .item(l - 1)
        .children[0].setAttribute(
          'style',
          'color: ' +
            this.columnFontColor +
            '; font-size: ' +
            this.columnFontSize +
            'px; word-wrap:' +
            this.columnWrap
        );
    }, 100);

    // .setAttribute('style', '{color: red;}');
  }
  public deleteColumn(columnIndex: number) {
    this.columns = [
      ...this.columns.slice(0, columnIndex),
      ...this.columns.slice(columnIndex + 1),
    ];
    this.treeGridObj.autoFitColumns();
  }
  public freezeColumn(columnIndex: number) {
    this.treeGridObj.frozenColumns = columnIndex;
  }
  public unfreezeColumn() {
    this.treeGridObj.frozenColumns = 0;
  }
  contextMenuOpen(arg: BeforeOpenCloseEventArgs): void {
    let targetElement: Element = arg.event.target as Element;
    //arg.element.children[0].appendChild(this.switchObj.element);
    let headerElement = targetElement.closest('.e-headercell');
    let index: number = 0;
    headerElement?.parentElement?.childNodes.forEach((element, key) => {
      if (element === headerElement) {
        index = key;
        return;
      }
    });
    this.currentColumnIndex = index;
  }
  public contextMenuClick(args: MenuEventArgs): void {
    this.currentMenuItemID = args.item.id;
    switch (this.currentMenuItemID) {
      case 'new_column':
        this.dialog.show();
        break;
      case 'del_column':
        this.deleteColumn(this.currentColumnIndex);
        break;
      case 'freeze_column':
        if (!this.isFrozen) {
          this.freezeColumn(this.currentColumnIndex);
        } else {
          this.unfreezeColumn();
        }
        this.isFrozen = !this.isFrozen;
        break;
      case 'filter_column':
        this.isFilteringAllowed = !this.isFilteringAllowed;
        break;
      case 'sort_column':
        this.isMultiSortingAllowed = !this.isMultiSortingAllowed;
        break;
      case 'add_next_row':
        break;
      case 'add_child_row':
        break;
      case 'del_row':
        this.treeGridObj
          .getSelectedRowIndexes()
          .reverse()
          .forEach((index) => {
            this.treeGridObj.deleteRow(this.treeGridObj.getRows()[index]);
          });
        break;
      case 'copy_row':
        this.treeGridObj.copy();
        break;
      case 'multi_select_row':
        if (this.isMultiSelectingAllowed) {
          this.selectOptions = { type: 'Single' };
        } else {
          this.selectOptions = { type: 'Multiple' };
        }
        this.isMultiSelectingAllowed = !this.isMultiSelectingAllowed;
        break;
      case 'paste_next_row':
        let rowInd = this.treeGridObj.getSelectedRowIndexes();
        let data: string = this.treeGridObj.clipboardModule['copyContent'];
        this.insertfetchedData(data, rowInd[0] + 1);
        break;
      default:
        break;
    }
  }

  public insertfetchedData(data: string, InsertRow: number): void {
    var grid = this.treeGridObj.grid;
    var col;
    var value;

    var rows = data.split('\n');
    var cols;

    var dataRows = grid.getDataRows();
    var res: any = {};

    for (var r = 0; r < rows.length; r++) {
      cols = rows[r].split('\t');

      for (var c = 0; c < cols.length; c++) {
        col = grid.getColumnByIndex(c);
        value = col.getParser() ? col.getParser()(cols[c]) : cols[c];
        value = cols[c];
        res[col.field] = value;
      }
    }
    this.treeGridObj.addRecord(res, InsertRow);
  }
}
