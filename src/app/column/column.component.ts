import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent {
@Input() color:string = "#49C4E5";
@Input() columnName:string = "TODO";
@Input() taskNumber:number = 0;
@Input() tasks= [
  {
    description: "",
    status: "",
    subtasks: [
      {
        isCompleted: false,
        title: ""
      }
    ],
    title: ""
  }
]

filterCompletedTasks(subtasks: any):number{
  return subtasks.filter((subtask: { isCompleted: boolean; }) => subtask.isCompleted === true).length
}

}
