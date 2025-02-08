import { inject } from "@angular/core";
import { CanActivateFn} from "@angular/router";
import { BoardsStore } from "../../+store/boards.store";

export const activeBoardGuard: CanActivateFn = (route, state) => {
    const boardStore = inject(BoardsStore);
    const boardId = route.params['boardId'] as string;
    boardStore.setActiveBoardId(boardId);

    return true ;
  };