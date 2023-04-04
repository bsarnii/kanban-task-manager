import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent {
@Input() columnName:string = "TODO"
@Input() taskTitle:string = "Build UI for search"
@Input() completedSubtasks:number = 0;
@Input() totalSubtasks:number = 3;

}
