import { inject } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { filter, map } from "rxjs";
import { UsersStore } from "../../users/+store/users.store";
import { AuthService } from "src/app/auth/services/auth.service";

export const loginNotRequiredGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) => {
    const authService = inject(AuthService);
    const usersStore = inject(UsersStore);
    const router = inject(Router);
    const userLoading$ = toObservable(usersStore.loading);

    // Check if there is an auth token
    if(!authService.getAuthToken()) {
        return true;
    }

    // If there is an auth token, check if the user is already loaded
    // If not, load the current user
    if(!usersStore.loaded()){
        usersStore.loadCurrentUser();
    }

    // Wait for the loading to finish
    // and check if the user exists
    return userLoading$.pipe(
        filter(loading => !loading),
        map(() => {
            if(usersStore.currentUser()){
                return router.createUrlTree(['/board']);
            }
            return true
        })
    )
  }