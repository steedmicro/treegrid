import { Component, OnInit, ViewChild } from '@angular/core';
import { DataManager, JsonAdaptor } from '@syncfusion/ej2-data';
import {
  TreeGridComponent,
  ColumnModel,
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
import { sampleData } from './testjsondata';
import { Units } from '@syncfusion/ej2-charts';
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
  public columnName?: string = '';
  public columnDefaultValue?: any;
  public columnDataType?: string = 'string';
  public columnMinimumWidth?: number | string = 100;
  public columnFontSize?: number | string = 12;
  public columnFontColor?: string = '#767676ff';
  public columnBackgroundColor?: string = '#ffffffff';
  public columnAlignment?: string = 'Left';
  public columnWrap?: string = 'normal';
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
  public copyContent: any;
  public copiedRow: any;
  public cutMode: boolean = false;
  @ViewChild('treegrid')
  public treeGridObj!: TreeGridComponent;
  @ViewChild('dialog')
  public dialog!: DialogComponent;
  @ViewChild('switch')
  public switchObj!: SwitchComponent;

  getEditTypeFromType(type: string | undefined): string {
    switch (type) {
      case 'string':
        return '';
      case 'number':
        return 'numericedit';
      case 'date':
        return 'datepickeredit';
      case 'boolean':
        return 'checkboxedit';
      case 'dropdown':
        return 'dropdownedit';
    }
    return '';
  }
  ngOnInit(): void {
    /*
    this.data = new DataManager({
      url: 'testdata.json',
      adaptor: new WebApiAdaptor(),
      crossDomain: true,
      offline: true,
    });
    */
    this.data = new DataManager({
      json: sampleData,
    });

    this.contextMenuItems = [
      { text: 'New', id: 'new_column', target: '.e-headercell' },
      { text: 'Del ', id: 'del_column', target: '.e-headercell' },
      { text: 'Edit ', id: 'edit_column', target: '.e-headercell' },
      { text: 'Choose', id: 'choose_column', target: '.e-headercell' },
      { text: 'Freeze', id: 'freeze_column', target: '.e-headercell' },
      { text: 'Filter', id: 'filter_column', target: '.e-headercell' },
      {
        text: 'MultiSort',
        id: 'multi_sort_column',
        target: '.e-headercell',
      },
      { text: 'AddNext', id: 'Below', target: '.e-content' },
      { text: 'AddChild', id: 'Child', target: '.e-content' },
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
        isPrimaryKey: true,
      },
      {
        field: 'StartDate',
        headerText: 'Start Date',
        format: 'yMd',
        textAlign: 'Right',
        editType: 'datepickeredit',
        type: 'date',
      },
      {
        field: 'EndDate',
        headerText: 'End Date',
        format: 'yMd',
        textAlign: 'Right',
        editType: 'datepickeredit',
        type: 'date',
      },
      {
        field: 'Duration',
        headerText: 'Duration',
        textAlign: 'Right',
        editType: 'numericedit',
        type: 'number',
      },
      {
        field: 'Progress',
        headerText: 'Progress',
        type: 'dropdown',
        editType: 'dropdownedit',
      },
      {
        field: 'Priority',
        headerText: 'Priority',
        type: 'dropdown',
        editType: 'dropdownedit',
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
          } else {
            this.editColumn();
          }
          this.dialog.hide();
        },
      },
      {
        buttonModel: {
          isPrimary: false,
          content: 'Cancel',
          cssClass: 'e-flat',
        },
        click: () => {
          this.dialog.hide();
        },
      },
    ];
    this.dataTypes = ['string', 'number', 'date', 'boolean', 'dropdown'];
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
    this.columnStyles = [];
    let l = this.columns.length;
    while (l--) {
      this.columnStyles.push('');
      this.columnStyles.push('');
    }
  }
  public beforeMenuItemRender(args: MenuEventArgs) {
    if (args.item.id === 'freeze_column') {
      args.element.innerHTML =
        '<span class="e-frame e-icons e-check"></span>Freeze';
    }
  }
  public saveColumnStyles() {
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
  }
  public loadColumnStyles() {
    let queryResult = this.treeGridObj.grid
        .getHeaderContent()
        .querySelectorAll('.e-headercell'),
      i = 0,
      l = queryResult.length;

    while (i < l) {
      queryResult.item(i).setAttribute('style', this.columnStyles[i * 2]);
      queryResult
        .item(i)
        .children[0].setAttribute('style', this.columnStyles[i * 2 + 1]);
      i++;
    }
  }
  public addColumn() {
    this.saveColumnStyles();
    this.columns = [
      ...this.columns,
      {
        field: this.columnName,
        headerText: this.columnName,
        minWidth: this.columnMinimumWidth,
        textAlign: this.columnAlignment,
        type: this.columnDataType,
        editType: this.getEditTypeFromType(this.columnDataType),
        format: this.columnDataType === 'date' ? 'yMd' : '',
        displayAsCheckBox: this.columnDataType === 'boolean',
        defaultValue: this.columnDefaultValue,
      },
    ];
    this.currentColumnIndex = this.columns.length - 1;
  }
  public actionBegin($event: any) {
    //this.saveColumnStyles();
  }
  public actionComplete($event: any) {
    this.loadColumnStyles();
    this.resetMark2Row(this.copiedRow);
    let queryResult = this.treeGridObj.grid
      .getHeaderContent()
      .querySelectorAll('.e-headercell');
    queryResult
      .item(this.currentColumnIndex)
      .setAttribute('style', 'background-color: ' + this.columnBackgroundColor);

    this.saveColumnStyles();
  }
  public editColumn() {
    this.saveColumnStyles();
    this.columns = [
      ...this.columns.slice(0, this.currentColumnIndex),
      {
        field: (this.columns[this.currentColumnIndex] as ColumnModel).field,
        headerText: this.columnName,
        minWidth: this.columnMinimumWidth,
        textAlign: this.columnAlignment,
        type: this.columnDataType,
        editType: this.getEditTypeFromType(this.columnDataType),
        format: this.columnDataType === 'date' ? 'yMd' : '',
        displayAsCheckBox: this.columnDataType === 'boolean',
        defaultValue: this.columnDefaultValue,
      },
      ...this.columns.slice(this.currentColumnIndex + 1, this.columns.length),
    ];
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
    let headerElement = targetElement.closest('.e-headercell');
    let index: number = 0;
    headerElement?.parentElement?.childNodes.forEach((element, key) => {
      if (element === headerElement) {
        index = key;
        return;
      }
    });
    this.currentColumnIndex = index - 1;
  }
  public contextMenuClick(args: MenuEventArgs): void {
    this.currentMenuItemID = args.item.id;
    switch (this.currentMenuItemID) {
      case 'new_column':
        this.columnName = '';
        this.columnMinimumWidth = 100;
        this.columnFontSize = 12;
        this.columnFontColor = '#767676FF';
        this.columnBackgroundColor = '#FFFFFFFF';
        this.columnDataType = 'string';
        this.columnDefaultValue = '';
        this.columnWrap = 'normal';
        this.columnAlignment = 'Left';
        this.dialog.show();
        break;
      case 'edit_column':
        this.columnName = (
          this.columns[this.currentColumnIndex] as ColumnModel
        ).headerText;
        this.columnMinimumWidth = (
          this.columns[this.currentColumnIndex] as ColumnModel
        ).minWidth;
        if (this.columnStyles[this.currentColumnIndex * 2] !== '') {
          this.columnFontSize = this.columnStyles[this.currentColumnIndex]
            .split(';')[0]
            .split(':')[1];
          this.columnFontColor = this.columnStyles[this.currentColumnIndex]
            .split(';')[1]
            .split(':')[1];
          this.columnBackgroundColor =
            this.columnStyles[this.currentColumnIndex].split(':')[1];
        } else {
          this.columnFontSize = 12;
          this.columnFontColor = '#767676FF';
          this.columnBackgroundColor = '#FFFFFFFF';
        }
        this.columnDataType = (
          this.columns[this.currentColumnIndex] as ColumnModel
        ).type;
        this.columnDefaultValue = '';
        this.columnAlignment = (
          this.columns[this.currentColumnIndex] as ColumnModel
        ).textAlign;
        this.dialog.show();
        break;
      case 'del_column':
        this.deleteColumn(this.currentColumnIndex);
        break;
      case 'choose_column':
        this.treeGridObj.grid.columnChooserModule.openColumnChooser(0, 0);
        break;
      case 'freeze_column':
        if (!this.isFrozen) {
          args.element.innerHTML =
            'Freeze <input type="checkbox" checked class="e-control e-switch e-lib">';
          this.freezeColumn(this.currentColumnIndex + 1);
        } else {
          args.element.innerHTML = 'Freeze';
          this.unfreezeColumn();
        }
        this.isFrozen = !this.isFrozen;
        break;
      case 'filter_column':
        args.element.innerHTML = !this.isFilteringAllowed
          ? 'Filter <input type="checkbox" checked class="e-control e-switch e-lib">'
          : 'Filter';
        this.isFilteringAllowed = !this.isFilteringAllowed;
        break;
      case 'multi_sort_column':
        args.element.innerHTML = !this.isMultiSortingAllowed
          ? 'MultiSort <input type="checkbox" checked class="e-control e-switch e-lib">'
          : 'MultiSort';
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
        this.cutMode = false;
        this.resetMark2Row(this.copiedRow);
        this.copiedRow = this.treeGridObj.getSelectedRowIndexes();
        this.setCopyData(false);
        document.execCommand('copy');
        this.setMark2Row(this.treeGridObj.getSelectedRowIndexes());
        break;
      case 'cut_row':
        this.cutMode = true;
        this.resetMark2Row(this.copiedRow);
        this.copiedRow = this.treeGridObj.getSelectedRowIndexes();
        this.setCopyData(false);
        document.execCommand('copy');
        this.setMark2Row(this.treeGridObj.getSelectedRowIndexes());
        break;
      case 'multi_select_row':
        if (this.isMultiSelectingAllowed) {
          this.selectOptions = { type: 'Single' };
        } else {
          this.selectOptions = { type: 'Multiple' };
        }
        args.element.innerHTML = !this.isMultiSelectingAllowed
          ? 'MultiSelect <input type="checkbox" checked class="e-control e-switch e-lib">'
          : 'MultiSelect';
        this.isMultiSelectingAllowed = !this.isMultiSelectingAllowed;
        break;
      case 'paste_next_row':
        let rowInd2Paste = this.treeGridObj.getSelectedRowIndexes();
        //this.copyContent = ;
        this.resetMark2Row(this.copiedRow);
        this.insertFetchedData(this.copyContent, rowInd2Paste[0] + 1);
        if (this.cutMode == true) {
          // delete selected rows
          this.copiedRow.forEach((index: any) => {
            this.treeGridObj.deleteRow(this.treeGridObj.getRows()[index]);
          });
        }
        break;
      default:
        break;
    }
  }

  public setMark2Row(rowIndexes: any) {
    let i, style;
    let l = rowIndexes.length;
    for (i = 0; i < l; i++) {
      let queryResult = this.treeGridObj.grid
        .getRowByIndex(rowIndexes[i])
        .querySelectorAll('td');
      let cl = queryResult.length;
      for (let j = 0; j < cl; j++) {
        style = queryResult.item(j).getAttribute('style');
        queryResult
          .item(j)
          .setAttribute(
            'style',
            style == null
              ? 'background-color: pink'
              : style + 'background-color: pink'
          );
      }
    }
  }

  public resetMark2Row(rowIndexes: any) {
    if (rowIndexes == null) return;
    let i, style;
    let l = rowIndexes.length;
    for (i = 0; i < l; i++) {
      let queryResult = this.treeGridObj.grid
        .getRowByIndex(rowIndexes[i])
        .querySelectorAll('td');
      let cl = queryResult.length;
      for (let j = 0; j < cl; j++) {
        style = queryResult.item(j).getAttribute('style');
        if (style == null) continue;
        console.log(style);
        let stringInd = style.search('background-color');
        style = style.slice(0, stringInd);
        console.log(style);
        if (style == null) style = '';
        queryResult.item(j).setAttribute('style', style);
      }
    }
  }

  public getCopyData(
    cells: any,
    isCell: any,
    splitKey: any,
    withHeader: any
  ): void {
    var isElement = typeof cells[0] !== 'string';
    for (var j = 0; j < cells.length; j++) {
      if (withHeader && isCell) {
        var colIdx = parseInt(cells[j].getAttribute('aria-colindex'), 10);
        this.copyContent +=
          this.treeGridObj.grid.getColumns()[colIdx].headerText + '\n';
      }
      if (isElement) {
        if (!cells[j].classList.contains('e-hide')) {
          this.copyContent += cells[j].innerText;
        }
      } else {
        this.copyContent += cells[j];
      }
      if (j < cells.length - 1) {
        this.copyContent += splitKey;
      }
    }
  }

  public setCopyData(withHeader: Boolean): void {
    var isFrozen = this.treeGridObj.grid.isFrozenGrid();
    this.copyContent = '';
    let mRows: Element[] = [];
    let frRows;
    var rows = this.treeGridObj.grid.getRows();
    if (isFrozen) {
      mRows = this.treeGridObj.grid.getMovableDataRows();
      if (this.treeGridObj.grid.getFrozenMode() === 'Left-Right') {
        frRows = this.treeGridObj.grid.getFrozenRightRows();
      }
    }

    var selectedIndexes = this.treeGridObj.grid
      .getSelectedRowIndexes()
      .sort(function (a, b) {
        return a - b;
      });
    if (withHeader) {
      var headerTextArray = [];
      for (
        var i = 0;
        i < this.treeGridObj.grid.getVisibleColumns().length;
        i++
      ) {
        headerTextArray[i] =
          this.treeGridObj.grid.getVisibleColumns()[i].headerText;
      }
      this.getCopyData(headerTextArray, false, '\t', withHeader);
      this.copyContent += '\n';
    }
    for (var i = 0; i < selectedIndexes.length; i++) {
      if (i > 0) {
        this.copyContent += '\n';
      }
      var cells = [].slice.call(
        rows[selectedIndexes[i]].querySelectorAll('.e-rowcell:not(.e-hide)')
      );
      if (isFrozen) {
        cells.push.apply(
          cells,
          [].slice.call(
            mRows[selectedIndexes[i]].querySelectorAll(
              '.e-rowcell:not(.e-hide)'
            )
          )
        );
        if (frRows) {
          cells.push.apply(
            cells,
            [].slice.call(
              frRows[selectedIndexes[i]].querySelectorAll(
                '.e-rowcell:not(.e-hide)'
              )
            )
          );
        }
      }
      this.getCopyData(cells, false, '\t', withHeader);
    }
  }

  public insertFetchedData(data: string, InsertRow: number): void {
    var grid = this.treeGridObj.grid;
    var col;
    var value;

    var rows = data.split('\n');
    var cols;

    var res: any;

    for (var r = rows.length - 1; r >= 0; r--) {
      res = {};
      cols = rows[r].split('\t');

      for (var c = 0; c < cols.length; c++) {
        col = grid.getColumnByIndex(c);
        value = col.getParser() ? col.getParser()(cols[c]) : cols[c];
        value = cols[c];
        res[col.field] = value;
      }

      this.treeGridObj.addRecord(res, InsertRow);
    }
  }
}
