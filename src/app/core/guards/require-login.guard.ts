import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { UsersStore } from "../../users/+store/users.store";
import { inject } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { filter, map } from "rxjs";

export const requireLoginGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) => {
    const usersStore = inject(UsersStore);
    const router = inject(Router);
    const userLoading$ = toObservable(usersStore.loading);

    if(!usersStore.loaded()){
        usersStore.loadCurrentUser();
    }

    return userLoading$.pipe(
        filter(loading => !loading),
        map(() => {
            if(usersStore.currentUser()){
                return true;
            }
            return router.createUrlTree(['/auth']);
        })
    )

  }