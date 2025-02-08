import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { BoardsStore } from "../../+store/boards.store";

export const doesBoardExistsGuard: CanActivateFn = (route, state) => {
    const boardStore = inject(BoardsStore);
    const router = inject(Router);
    const boards = boardStore.boards();
  
    if (boards[0]) {
      const targetUrl = `/board/${boards[0].id}`;
      return router.parseUrl(targetUrl);
    }
  
    return true;
  };