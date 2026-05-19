import { Component, input } from '@angular/core';
import { ChipModule } from 'primeng/chip';
import { BoardMemberRole } from '../../types/board-member.interface';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-board-member-role-chip',
  imports: [ChipModule, TooltipModule],
  template: `
    @switch (role()) {
      @case ('owner') { 
        <p-chip icon="pi pi-crown" label="Owner" pTooltip="Full access to boards, members, and tasks."/> 
      }
      @case ('editor') {
        <p-chip icon="pi pi-pencil" label="Editor" pTooltip="Can create and manage tasks."/>
      }
      @case ('viewer') {
        <p-chip icon="pi pi-eye" label="Viewer" pTooltip="View-only access to tasks."/>
      }
      @default { <p>{{role()}}</p> }
    }
  `,
  styles: ``
})
export class BoardMemberRoleChipComponent {
  role = input.required<BoardMemberRole>();
}