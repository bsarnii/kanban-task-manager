import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainComponent } from './main/main.component';
import { ColorThemeService } from './services/color-theme.service';
import { SidebarToggleService } from './services/sidebar-toggle.service';
import { ColumnComponent } from './column/column.component';
import { TaskModalComponent } from './task-modal/task-modal.component';
import { EditTaskModalComponent } from './edit-task-modal/edit-task-modal.component';
import { TaskModalFrameComponent } from './shared/task-modal-frame/task-modal-frame.component';
import { CreateTaskModalComponent } from './create-task-modal/create-task-modal.component';
import { ConfirmDeleteBoardComponent } from './confirm-delete-board/confirm-delete-board.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    MainComponent,
    ColumnComponent,
    TaskModalComponent,
    EditTaskModalComponent,
    TaskModalFrameComponent,
    CreateTaskModalComponent,
    ConfirmDeleteBoardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
