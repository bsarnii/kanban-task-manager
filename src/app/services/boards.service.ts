import { Injectable } from '@angular/core';
import { Board, Boards, Task } from '../types/boards.interface';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  constructor() { }

  boards!:Boards;
  currentBoard!:Board
  currentTask:Task = {description: "string",
    status: "string",
    subtasks: [],
    title: "string",
  }
  indexes = {
    boardIndex: 0,
    columnIndex: 0,
    taskIndex: 0,
    subtaskIndex: 0,
    dropColumnIndex: 0,
    dropTaskIndex: 0
  }

  getBoards(){
    this.boards =JSON.parse(localStorage['boards'])
  }

  setBoards(boards:Boards){
    localStorage.setItem("boards", JSON.stringify(boards))
  }

  setCurrentBoard(board:Board){
    this.currentBoard = board;
  }

  setCurrentTask(task:Task){
    this.currentTask = task;
  }
}
