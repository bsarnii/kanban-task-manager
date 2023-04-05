import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentBoardService {

  constructor() { }

  currentBoard = {
    columns: [{
      name:"",
      tasks: [
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
    }],
    name:""
  }
  setCurrentBoard(board:any){
    this.currentBoard = board;
  }
}
