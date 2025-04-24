import { CanActivateFn } from "@angular/router";
import { BoardsStore } from "../../+store/boards.store";
import { inject } from "@angular/core";

export const loadBoardsGuard: CanActivateFn = (route, state) => {
    const boardStore = inject(BoardsStore);
    if(!boardStore.loaded()) {
        boardStore.loadBoards();
    }
    return true ;
  };