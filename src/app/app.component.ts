import { Component, OnInit, ViewChild } from '@angular/core';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { MenuEventArgs } from '@syncfusion/ej2-navigations';
import { BeforeOpenCloseEventArgs } from '@syncfusion/ej2-inputs';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { isNull } from '@angular/compiler/src/output/output_ast';

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
  public currentMenuItemID: string = '';
  @ViewChild('treegrid')
  public treeGridObj!: TreeGridComponent;
  @ViewChild('dialog')
  public dialog!: DialogComponent;

  ngOnInit(): void {
    this.data = new DataManager({
      url: 'https://ej2services.syncfusion.com/production/web-services/api/SelfReferenceData',
      adaptor: new WebApiAdaptor(),
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
          this.columns = [
            ...this.columns,
            {
              field: this.columnName,
              headerText: this.columnName,
              minimumWidth: this.minimumWidth,
            },
          ];
          this.dialog.hide();
        },
      },
    ];
    this.dataTypes = ['string', 'number', 'date', 'boolean', 'dropdownlist'];
  }
  public beforeMenuItemRender(args: MenuEventArgs) {
    if (args.item.id === 'freeze_column') {
      args.element.innerHTML =
        '<span class="e-frame e-icons e-check"></span>Freeze';
    }
  }
  contextMenuOpen(arg: BeforeOpenCloseEventArgs): void {
    let targetElement: Element = arg.event.target as Element;
    let headerElement = targetElement.closest('.e-headercell');
    let index: Number = 0;
    headerElement?.parentElement?.childNodes.forEach((element, key) => {
      if (element === headerElement) {
        index = key;
        return;
      }
    });
  }
  public contextMenuClick(args: MenuEventArgs): void {
    if (args.item.id === 'new_column') {
      this.dialog.show();
    }
  }
}
