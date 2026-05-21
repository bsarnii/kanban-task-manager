# Kanban Task Manager (Frontend)

Frontend application for managing boards, tasks, and board members in the Kanban project.

This app is built with Angular 21 and connects to the NestJS backend API.

## Tech Stack

- Angular 21
- TypeScript
- SCSS
- PrimeNG + PrimeIcons
- NgRx Signals (`@ngrx/signals`, `@ngrx/operators`) for state management

## Main Features

- User authentication:
	- Sign up
	- Log in
	- Email verification
- Board management:
	- Create board
	- Edit board
	- Delete board
- Task management:
	- Create task
	- Edit task
	- Task details modal
- Board member management:
	- View/add/update members and roles
- Route guards for:
	- Requiring authentication for task management routes
	- Restricting auth pages when user is already logged in
	- Loading and validating active board/task context

## Requirements

- Node.js 20+
- npm 10+

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

3. Open the app:

```text
http://localhost:4200
```

## Environment Configuration

Environment files are located in `src/environments`.

Angular uses file replacement for development configuration in `angular.json`.

## Project Structure

```text
src/
	app/
		auth/                  # authentication features, routes, services
		core/                  # guards, interceptors, app-level services
		shared/                # reusable UI elements (form, modal)
		task-management/       # board/task/member features and state stores
		users/                 # user state/data abstractions
	environments/            # environment configs
	styles.scss              # global styles
	theme-preset.ts          # PrimeNG theme preset
```

## Backend Dependency

This frontend expects the backend API to be running and reachable through `environment.apiUrl`.

Related backend project:
- `https://github.com/bsarnii/kanban-backend`
