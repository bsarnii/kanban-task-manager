import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent } from "src/app/shared/ui/modal/modal.component";
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { BoardMember, BoardMemberRole, BoardMemberRoleLabels } from '../../types/board-member.interface';
import { TagModule } from 'primeng/tag';
import { form, Field, submit, required, email } from '@angular/forms/signals';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { FieldsetModule } from 'primeng/fieldset';
import { FieldWrapperComponent } from "src/app/shared/ui/form/field-wrapper/field-wrapper.component";
import { BoardsStore } from '../../+store/boards.store';
import { BoardMemberManagementStore } from '../../+store/board-member-management.store';

@Component({
  selector: 'app-board-member-management-modal',
  imports: [FormsModule, SelectModule, FieldsetModule, ModalComponent, ButtonModule, InputGroupModule, InputTextModule, InputGroupAddonModule, TagModule, Field, FieldWrapperComponent],
  templateUrl: './board-member-management-modal.component.html',
  styleUrl: './board-member-management-modal.component.scss',
})
export class BoardMemberManagementModalComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  boardsStore = inject(BoardsStore);
  boardMemberStore = inject(BoardMemberManagementStore);

  close(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  roleOptions = [
    { label: BoardMemberRoleLabels.editor, value: 'editor' },
    { label: BoardMemberRoleLabels.viewer, value: 'viewer' }
  ];

  addMemberModel = signal<{email: string, role: BoardMemberRole | null}>({email: '', role: null});
  addMemberForm = form(this.addMemberModel, (schemaPath) => {
      required(schemaPath.email);
      email(schemaPath.email);
      required(schemaPath.role);
  });

  boardMembers: BoardMember[] = [
    {
      id: '12345',
      email: 'this@example.com',
      role: 'owner'
    },
    {
      id: '12346',
      email: 'that@example.com',
      role: 'editor'
    },
    {
      id: '12347',
      email: 'another@example.com',
      role: 'viewer'
    },
  ]

    onAddMemberSubmit() {
      submit(this.addMemberForm, async () => {
        this.boardMemberStore.addMember(this.addMemberModel() as { email: string; role: BoardMemberRole });
        alert(this.addMemberModel().email + ' - ' + this.addMemberModel().role)
      })
  }
}
