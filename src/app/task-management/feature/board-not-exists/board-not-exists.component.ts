import { Component, inject, OnInit } from '@angular/core';
import { BoardsStore } from '../../+store/boards.store';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-board-not-exists',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './board-not-exists.component.html',
  styleUrl: './board-not-exists.component.scss'
})
export class BoardNotExistsComponent implements OnInit {
  boardsStore = inject(BoardsStore);

  ngOnInit(){
    this.boardsStore.setActiveBoardId(null);
  }
}
