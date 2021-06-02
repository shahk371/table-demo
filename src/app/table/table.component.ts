import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { SortEvent } from 'primeng/api';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(private appService: AppService) { }

  employeeData;
  cols: any[];
  isEditable: Boolean;


  ngOnInit() {
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Name' },
      { field: 'email', header: 'Email' },
      { field: 'body', header: 'Body' }
    ];
    this.getTableData();
  }

  getTableData() {
    this.appService.getAPIData('https://jsonplaceholder.typicode.com/comments').subscribe(
      (res:any) => {
        this.employeeData = res;
      },
      err => {
        console.log('Error in getting Data') // can implement some library like toastr to diplay error message
      }
    );
  }

  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
        let value1 = data1[event.field];
        let value2 = data2[event.field];
        let result = null;

        if (value1 == null && value2 != null)
            result = -1;
        else if (value1 != null && value2 == null)
            result = 1;
        else if (value1 == null && value2 == null)
            result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string')
            result = value1.localeCompare(value2);
        else
            result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

        return (event.order * result);
    });
  }

  editData() {
    this.isEditable = true;
  }
  
  cancel() {
    this.isEditable = false;
  }
}
