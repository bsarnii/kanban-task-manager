import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SidebarComponent} from './sidebar.component';
import { MessageService } from 'primeng/api';
import { provideRouter, Router } from '@angular/router';
import { BoardComponent } from "../../feature/board/board.component";
import { BoardsStore } from 'app/task-management/+store/boards.store';
import { signal } from '@angular/core';
import { Board } from 'app/task-management/types/boards.interface';
import { UsersStore } from 'app/users/+store/users.store';
import { AuthService } from 'app/auth/services/auth.service';
import { BoardAddEditModalComponent } from '../../feature/board-add-edit-modal/board-add-edit-modal.component';
import { ColorThemeService } from 'app/core/services/color-theme.service';
import { Mocked } from 'vitest';
import { SidebarToggleService } from './sidebar-toggle.service';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  const mockBoards = [
    { id: '1', name: 'Board 1' },
    { id: '2', name: 'Board 2' },
    { id: '3', name: 'Board 3' }
  ] as Board[];

  const colorThemeServiceStub: Partial<Mocked<ColorThemeService>> = {
    switchTheme: vi.fn()
  };
  const authServiceStub: Partial<Mocked<AuthService>> = {
    logOut: vi.fn()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent],
      providers: [
        provideRouter([
          {path: 'board/:boardId', component: BoardComponent},
          {path: 'board/:boardId/add-board', component: BoardAddEditModalComponent},
        ]), 
        MessageService,
        {provide: BoardsStore, useValue: { boards: signal(mockBoards), activeBoardId: signal('1') }},
        {provide: ColorThemeService, useValue: colorThemeServiceStub },
        UsersStore,
        {provide: AuthService, useValue: authServiceStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list all available boards', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const boardListItems = compiled.querySelectorAll('.btn.btn-list');
    expect(boardListItems.length).toBe(component.boardsStore.boards().length);
  });

  it('should navigate to the correct board on board click', async () => {
  const router = TestBed.inject(Router);
  fixture.detectChanges();
  const button = fixture.nativeElement.querySelector(
    '.btn.btn-list'
  ) as HTMLButtonElement;
  button.click();
  await fixture.whenStable();
  expect(router.url).toBe('/board/1');
  });

  it('should navigate to add-board page on create board click', async () => {
    const router = TestBed.inject(Router);
    fixture.detectChanges();
    const createBoardButton = fixture.nativeElement.querySelector(
      '.btn.btn-create'
    ) as HTMLButtonElement;
    createBoardButton.click();
    await fixture.whenStable();
    expect(router.url).toContain('/add-board');
  });

  it('should toggle color theme on theme toggle button click',async () => {
    fixture.detectChanges();
    const themeToggleElement = fixture.nativeElement.querySelector(
      '#theme-switcher-checkbox'
    ) as HTMLInputElement;
    themeToggleElement.click();
    await fixture.whenStable();
    expect(colorThemeServiceStub.switchTheme).toHaveBeenCalled();
  });

  it('should log out on logout button click', async () => {
    fixture.detectChanges();
    const logoutButton = fixture.nativeElement.querySelector(
      '[data-testid="logoutButton"]'
    ) as HTMLButtonElement;
    logoutButton.click();
    await fixture.whenStable();
    expect(authServiceStub.logOut).toHaveBeenCalled();
  });

  it('should hide the sidebar', async () => {
    const sidebarToggleService = TestBed.inject(SidebarToggleService);
    fixture.detectChanges();
    sidebarToggleService.open();
    const hideSidebarButton = fixture.nativeElement.querySelector(
      '.display-sidebar'
    ) as HTMLButtonElement;
    hideSidebarButton.click();
    await fixture.whenStable();
    expect(sidebarToggleService.sidebarOpened()).toBe(false);
  });

});