import { Component } from '@angular/core';
import { BoardsService } from '../services/boards.service';
import { Subtask } from '../types/boards.interface';
import { ModalShowService } from '../services/modal-show.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-task-modal',
    templateUrl: './task-modal.component.html',
    styleUrls: ['./task-modal.component.scss'],
    imports: [CommonModule]
})
export class TaskModalComponent {


  constructor(
    public boardsService: BoardsService,
    public modalShowService: ModalShowService
    ) {}

  indexes = this.boardsService.indexes;
  showEditDeleteContainer = false;

  openEditDeleteContainer(){
    this.showEditDeleteContainer = !this.showEditDeleteContainer;
  }

  handleCheckboxClick(i:number){
    this.boardsService.currentTask.subtasks[i].isCompleted = !this.boardsService.currentTask.subtasks[i].isCompleted
    this.boardsService.setBoards(this.boardsService.boards)
  }

  changeStatus(value:string){
    this.boardsService.currentBoard.columns[this.indexes.columnIndex].tasks[this.indexes.taskIndex].status = value;
    this.boardsService.currentBoard.columns.find(column => column.name === value)?.tasks.unshift(this.boardsService.currentBoard.columns[this.indexes.columnIndex].tasks[this.indexes.taskIndex]);
    this.boardsService.currentBoard.columns[this.indexes.columnIndex].tasks.splice(this.indexes.taskIndex,1);
    this.boardsService.setBoards(this.boardsService.boards);
    this.modalShowService.closeModal();
  }

  openDeleteTaskModal(){
    this.modalShowService.openDeleteTaskModal()
  }


  filterCompletedTasks(subtasks: Array<Subtask>):number{
    return subtasks.filter(subtask => subtask.isCompleted === true).length
  }
}


