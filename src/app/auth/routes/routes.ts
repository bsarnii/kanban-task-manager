import { Routes } from "@angular/router";

export const authRoutes:Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {
        path: 'login',
        loadComponent: () => import('src/app/auth/feature/log-in/log-in.component'),
        title: 'Log in',
    },
    {
        path: 'signup',
        loadComponent: () => import('src/app/auth/feature/sign-up/sign-up.component'),
        title: 'Sign up',
    }
]