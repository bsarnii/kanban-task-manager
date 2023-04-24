import { Injectable } from '@angular/core';
import { BoardsService } from './boards.service';
import { Task } from '../types/boards.interface';

@Injectable({
  providedIn: 'root'
})
export class DragDropService {

  constructor(public boardsService:BoardsService) { }

    // Drag & Drop
    public dragging: Task | undefined;

    dragStart(e:DragEvent, item:Task){
      this.dragging = item;
    }
  
    dragEnd(e:DragEvent, item: Task){
      this.dragging = undefined;
    }
  
    dragOver(e:DragEvent){
      if(this.dragging){
        e.preventDefault()
      }
    }
  
    drop(e:DragEvent){
      e.preventDefault()
      const index = this.boardsService.indexes.taskIndex;
      this.boardsService.currentBoard.columns[this.boardsService.indexes.columnIndex].tasks.splice(index, 1);
      if (this.dragging) {
        this.dragging.status = this.boardsService.currentBoard.columns[this.boardsService.indexes.dropColumnIndex].name;
      }
      this.boardsService.currentBoard.columns[this.boardsService.indexes.dropColumnIndex].tasks.unshift(this.dragging!);
      this.dragging = undefined;
      this.boardsService.setBoards(this.boardsService.boards);
    }
}
