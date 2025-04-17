import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { User } from "../types/user.interface";
import { UsersDataService } from "./users-data.service";
import { inject } from "@angular/core";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, tap, switchMap } from "rxjs";
import { tapResponse } from '@ngrx/operators';
import { Router } from "@angular/router";

type UsersState = { 
    currentUser: User | null,
    loading: boolean,
    loaded: boolean
};

const initialState: UsersState = {
    currentUser: null,
    loading: false,
    loaded: false
 };

 export const UsersStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store, usersDataService = inject(UsersDataService), router = inject(Router)) => {
        const clearCurrentUser = () => patchState(store, () => ({ currentUser: null, loading: false, loaded: false }));
        const loadCurrentUser = rxMethod<void>(pipe(
            tap(() => patchState(store, () => ({ loading: true }))),
            switchMap(() => usersDataService.getUser().pipe(
                tapResponse({
                    next: (user:User) =>patchState(store, () => ({ currentUser: user, loading: false, loaded: true })),
                    error: () => {
                        clearCurrentUser();
                    }
                })
            ))
        ))
        return { loadCurrentUser, clearCurrentUser };
    })
 )