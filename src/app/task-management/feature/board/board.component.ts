import { Component, computed, inject, input, signal } from '@angular/core';
import { ColumnComponent } from "../../ui/column/column.component";
import { BoardsStore } from '../../+store/boards.store';
import { TasksStore } from '../../+store/tasks.store';
import { Task } from '../../types/task.interface';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { ActiveBoardNotFoundComponent } from "../../ui/active-board-not-found/active-board-not-found.component";
import { FormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss'],
    imports: [ColumnComponent, RouterOutlet, RouterLink, ActiveBoardNotFoundComponent, ToolbarModule, IconFieldModule, InputIconModule, InputTextModule, FormsModule]
})
export class BoardComponent {
  boardsStore = inject(BoardsStore);
  tasksStore = inject(TasksStore);
  router = inject(Router);
  route = inject(ActivatedRoute);

  boardId = input.required<string>();
  searchTerm = signal("");

  columnsVM = computed(() => {
    const statuses = this.boardsStore.activeBoard()?.statuses || [];
    const searchTerm = this.searchTerm().toLowerCase();
    return statuses.map((status, index) => ({
      statusId: status.id,
      columnName: status.name,
      tasks: this.tasksStore.tasks().filter(task => 
        task.statusId === status.id && task.name.toLowerCase().includes(searchTerm)
      ),
      color: this.colors[index]
    }))
  })
  draggedTask = signal<Task|null>(null);

  onTaskClick(id:string){
    this.tasksStore.setActiveTaskId(id);
    this.router.navigate(['task', id], {relativeTo: this.route});
  }


  colors=["#49C4E5","#8471F2","#67E2AE","#d6d45a","#e09660","#e0635e","#de5fc7","#5d64de"]
}
