import { Component, OnInit, ViewChild } from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { DataManager, JsonAdaptor, WebApiAdaptor } from '@syncfusion/ej2-data';
import {
  TreeGridComponent,
  ToolbarItems,
} from '@syncfusion/ej2-angular-treegrid';
import { MenuEventArgs } from '@syncfusion/ej2-navigations';
import { BeforeOpenCloseEventArgs } from '@syncfusion/ej2-inputs';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { SwitchComponent } from '@syncfusion/ej2-angular-buttons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  public data!: DataManager;
  public contextMenuItems!: Object[];
  public columns!: Object[];
  public dialogButtons!: Object[];
  public dataTypes!: Object[];
  public minimumWidth: Number = 0;
  public columnName: String = '';
  public columnDefaultValue: any;
  public columnDataType: String = 'string';
  public columnMinimumWidth: Number = 100;
  public columnFontSize: Number = 20;
  public columnFontColor: string = '#000000ff';
  public columnBackgroundColor: string = '#ffffffff';
  public currentMenuItemID: any = '';
  public currentColumnIndex: number = 0;
  public isFrozen: boolean = false;
  public isFilteringAllowed: boolean = false;
  public isMultiSortingAllowed: boolean = false;
  public isMultiSelecting: boolean = false;
  public selectOptions!: Object;
  public editSettings!: Object;
  public toolbar: ToolbarItems[] = [];
  @ViewChild('treegrid')
  public treeGridObj!: TreeGridComponent;
  @ViewChild('dialog')
  public dialog!: DialogComponent;
  @ViewChild('switch')
  public switchObj!: SwitchComponent;

  ngOnInit(): void {
    this.data = new DataManager({
      url: 'https://ej2services.syncfusion.com/production/web-services/api/SelfReferenceData',
      adaptor: new WebApiAdaptor(),
      crossDomain: true,
      offline: true,
    });
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
      },
      {
        field: 'EndDate',
        headerText: 'End Date',
        format: 'yMd',
        textAlign: 'Right',
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
    this.toolbar = ['Add', 'Update', 'Cancel'];
  }
  public beforeMenuItemRender(args: MenuEventArgs) {
    if (args.item.id === 'freeze_column') {
      args.element.innerHTML =
        '<span class="e-frame e-icons e-check"></span>Freeze';
    }
  }
  public addColumn() {
    this.columns = [
      ...this.columns,
      {
        field: this.columnName,
        headerText: this.columnName,
        minimumWidth: this.minimumWidth,
      },
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
    this.columns = this.columns.map((value, index) => {
      if (index <= columnIndex) {
        return Object.assign({ isFrozen: true }, value);
      } else {
        return Object.assign({ isFrozen: false }, value);
      }
    });
  }
  public unfreezeColumn() {
    this.columns = this.columns.map((value) => {
      return Object.assign({ isFrozen: false }, value);
    });
  }
  contextMenuOpen(arg: BeforeOpenCloseEventArgs): void {
    let targetElement: Element = arg.event.target as Element;
    arg.element.children[0].appendChild(this.switchObj.element);
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
        this.treeGridObj.allowFiltering = !this.treeGridObj.allowFiltering;
        this.isFilteringAllowed = !this.isFilteringAllowed;
        break;
      case 'sort_column':
        this.treeGridObj.allowMultiSorting =
          !this.treeGridObj.allowMultiSorting;
        this.isMultiSortingAllowed = !this.isMultiSortingAllowed;
        break;
      case 'del_row':
        break;
      case 'copy_row':
        this.treeGridObj.copy();
        break;
      case 'multi_select_row':
        if (!this.isMultiSelecting) {
          this.selectOptions = { type: 'Single' };
        } else {
          this.selectOptions = { type: 'Multiple' };
        }
        this.isMultiSelecting = !this.isMultiSelecting;
        break;
      default:
        break;
    }
  }
}
