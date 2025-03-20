import { inject } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { CanActivateFn, Router } from "@angular/router";
import { BoardsStore } from "../../+store/boards.store";
import { filter, map } from "rxjs";

export const doesBoardExistsGuard: CanActivateFn = (route, state) => {
    const boardStore = inject(BoardsStore);
    const router = inject(Router);
  
    return toObservable(boardStore.loaded).pipe(
      filter(Boolean),
      map(() => {
        const boards = boardStore.boards();
        if (boards[0]) {
          const targetUrl = `/board/${boards[0].id}`;
          return router.parseUrl(targetUrl);
        }
        return true;
      })
    );
};