import { Component, DestroyRef, inject, viewChild } from '@angular/core';
import { ChipModule } from 'primeng/chip';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { Popover, PopoverModule } from 'primeng/popover';

@Component({
  selector: 'app-board-member-role-info',
  imports: [ChipModule, TooltipModule, ButtonModule, PopoverModule],
  template: `
    <p-button (click)="op.toggle($event)" icon="pi pi-info-circle" size="small" variant="outlined" severity="info" label="Roles" />
    <p-popover #op>
      <div style="display: flex; flex-direction: column; gap: 0.5rem; max-width: 280px;">
        <div style="display: flex; align-items: flex-start; gap: 0.5rem;">
          <i class="pi pi-crown" style="color: var(--p-primary-color); margin-top: 2px;"></i>
          <div><strong>Owner</strong><br><span style="font-size: 0.85rem; opacity: 0.8;">Manage board, manage tasks, and manage board members.</span></div>
        </div>
        <div style="display: flex; align-items: flex-start; gap: 0.5rem;">
          <i class="pi pi-pen-to-square" style="color: var(--p-primary-color); margin-top: 2px;"></i>
          <div><strong>Editor</strong><br><span style="font-size: 0.85rem; opacity: 0.8;">Manage tasks, but cannot manage board and board members.</span></div>
        </div>
        <div style="display: flex; align-items: flex-start; gap: 0.5rem;">
          <i class="pi pi-eye" style="color: var(--p-primary-color); margin-top: 2px;"></i>
          <div><strong>Viewer</strong><br><span style="font-size: 0.85rem; opacity: 0.8;">Can only view board content.</span></div>
        </div>
      </div>
    </p-popover>

  `,
  styles: ``
})
export class BoardMemberRoleInfoComponent {
  destroyRef = inject(DestroyRef);
  popover = viewChild<Popover>('op');
  constructor(){
    this.destroyRef.onDestroy(() => {
      this.popover()?.hide();
    });
  }
}