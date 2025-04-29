import { CanActivateFn } from "@angular/router";
import { BoardsStore } from "../../+store/boards.store";
import { inject } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { filter } from "rxjs";

export const loadBoardsGuard: CanActivateFn = (route, state) => {
    const boardStore = inject(BoardsStore);
    const boardsLoaded$ = toObservable(boardStore.loaded);

    if(!boardStore.loaded()) {
        boardStore.loadBoards();
    }
    return boardsLoaded$.pipe(filter(Boolean)) ;
  };