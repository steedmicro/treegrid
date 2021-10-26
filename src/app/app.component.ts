import { Component, OnInit } from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { MenuEventArgs, MenuItemModel } from '@syncfusion/ej2-navigations';
import {
  TreeGridComponent,
  PageService,
} from '@syncfusion/ej2-angular-treegrid';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  public data: Object[] = [];
  public editSettings: Object = {};
  public rowHeaderMenuItems: MenuItemModel[] = [];
  public columnHeaderMenuItems: MenuItemModel[] = [];
  ngOnInit(): void {
    this.data = sampleData;
    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: 'Row',
    };
    this.rowHeaderMenuItems = [
      { text: 'New', id: 'new_column' },
      { text: 'Del', id: 'del_column' },
      { text: 'Edit', id: 'edit_column' },
      { text: 'Choose', id: 'choose_column' },
      { text: 'Freeze', id: 'freeze_column' },
      { text: 'Filter', id: 'filter_column' },
      { text: 'MultiSort', id: 'multi_sort_column' },
    ];
    this.columnHeaderMenuItems = [
      { text: 'AddNext', id: 'add_next_row' },
      { text: 'AddChild', id: 'add_child_row' },
      { text: 'MultiSelect', id: 'multi_select_row' },
      { text: 'Copy', id: 'copy_row' },
      { text: 'Cut', id: 'cut_row' },
      { text: 'PasteNext', id: 'paste_next_row' },
      { text: 'PasteChild', id: 'paste_child_row' },
    ];
  }
  public menuItemRender(args: MenuEventArgs) {
    if (args.item.id === 'freeze_column') {
      args.element.innerHTML =
        '<span class="e-frame e-icons e-check"></span> Freeze';
    }
  }
}
