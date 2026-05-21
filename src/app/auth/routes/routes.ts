import { Routes } from "@angular/router";

export const authRoutes:Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {
        path: 'login',
        loadComponent: () => import('app/auth/feature/log-in/log-in.component'),
        title: 'Log in',
    },
    {
        path: 'signup',
        loadComponent: () => import('app/auth/feature/sign-up/sign-up.component'),
        title: 'Sign up',
    },
    {
        path: 'verification/:token',
        loadComponent: () => import('app/auth/feature/verification/verification.component'),
        title: 'Email verification',
    }
]