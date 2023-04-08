import { Component } from '@angular/core';
import { BoardsService } from '../services/boards.service';
import { Boards, Subtask } from '../types/boards.interface';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent {

  constructor(public boardsService: BoardsService) {}

  indexes = this.boardsService.indexes;
  showEditDeleteContainer = false;

  openEditDeleteContainer(){
    this.showEditDeleteContainer = !this.showEditDeleteContainer;
  }

  handleCheckboxClick(i:number){
    this.boardsService.currentTask.subtasks[i].isCompleted = !this.boardsService.currentTask.subtasks[i].isCompleted
    this.boardsService.setBoards(this.boardsService.boards)
  }

  consoleLog(){
    console.log(this.boardsService.currentTask.status)
  }

  filterCompletedTasks(subtasks: Array<Subtask>):number{
    return subtasks.filter(subtask => subtask.isCompleted === true).length
  }
}


