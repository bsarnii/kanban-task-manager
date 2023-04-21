import { Component } from '@angular/core';
import { BoardsService } from '../services/boards.service';
import { ModalShowService } from '../services/modal-show.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  constructor(public boardsService: BoardsService,public modalShowService:ModalShowService){}

  onNewColumnClick(){
    this.modalShowService.openEditBoardModal()
  }

  onNewBoardClick(){
    this.modalShowService.openCreateBoardModal()
  }
  colors=["#49C4E5","#8471F2","#67E2AE","#d6d45a","#e09660","#e0635e","#de5fc7","#5d64de"]
}
