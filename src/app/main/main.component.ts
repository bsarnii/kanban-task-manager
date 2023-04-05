import { Component } from '@angular/core';
import { CurrentBoardService } from '../services/current-board.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  constructor(public currentBoardService: CurrentBoardService){
    console.log(currentBoardService.currentBoard.columns)
  }

  colors=["#49C4E5","#8471F2","#67E2AE","#d6d45a","#e09660","#e0635e","#de5fc7","#5d64de"]
}
