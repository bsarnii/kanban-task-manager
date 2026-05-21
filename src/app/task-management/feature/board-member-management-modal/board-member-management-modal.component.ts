import { Component, inject, linkedSignal, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent } from "src/app/shared/ui/modal/modal.component";
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { BoardMember, BoardMemberRole, BoardMemberRoleLabels } from '../../types/board-member.interface';
import { TagModule } from 'primeng/tag';
import { form, FormField, submit, required, email, validate } from '@angular/forms/signals';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { FieldsetModule } from 'primeng/fieldset';
import { FieldWrapperComponent } from "src/app/shared/ui/form/field-wrapper/field-wrapper.component";
import { BoardsStore } from '../../+store/boards.store';
import { BoardMemberManagementStore } from '../../+store/board-member-management.store';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BoardMemberRoleChipComponent } from '../../ui/board-member-role-chip/board-member-role-chip.component';
import { BoardMemberRoleInfoComponent } from '../../ui/board-member-role-info/board-member-role-info.component';


@Component({
  selector: 'app-board-member-management-modal',
  imports: [FormsModule, BoardMemberRoleInfoComponent, BoardMemberRoleChipComponent, ConfirmDialogModule, TooltipModule, SelectModule, FieldsetModule, ModalComponent, ButtonModule, InputGroupModule, InputTextModule, InputGroupAddonModule, TagModule, FormField, FieldWrapperComponent],
  templateUrl: './board-member-management-modal.component.html',
  styleUrl: './board-member-management-modal.component.scss',
  providers: [ConfirmationService, BoardMemberManagementStore]
})
export class BoardMemberManagementModalComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  boardsStore = inject(BoardsStore);
  boardMemberStore = inject(BoardMemberManagementStore);
  confirmationService = inject(ConfirmationService);
  messageService = inject(MessageService);

  close(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  roleOptions = signal([
    { label: BoardMemberRoleLabels.editor, value: 'editor' },
    { label: BoardMemberRoleLabels.viewer, value: 'viewer' }
  ]);

  memberIdInEditMode = signal<string | null>(null);
  selectedMemberRoleToEdit = linkedSignal<BoardMemberRole>(() => {
    const memberId = this.memberIdInEditMode();
    if(!memberId) {
      return 'viewer';
    }
    const member = this.boardMemberStore.boardMembers().find(m => m.id === memberId);
    return member?.role || 'viewer';
  });
  editRoleModel = signal<{id: string, role: BoardMemberRole}>({id: '', role: 'viewer'});
  editRoleForm = form(this.editRoleModel, (schemaPath) => {
      required(schemaPath.role);
  });


  addMemberModel = signal<{email: string, role: BoardMemberRole | ''}>({email: '', role: ''});
  addMemberForm = form(this.addMemberModel, (schemaPath) => {
      required(schemaPath.email);
      email(schemaPath.email);
      validate(schemaPath.email, ({value}) => {
        if (this.boardMemberStore.boardMemberEmails().includes(value())) {
          return {
            kind: 'duplicate',
            message: 'This email is already a member of the board.',
          };
        }
        return null;
      });
      required(schemaPath.role);
  });

  onAddMemberSubmit() {
    const callback = (success:boolean) => {
      if(success){
        this.addMemberForm().reset({email: '', role: ''});
      }else{
        this.messageService.add({severity: 'error', summary: 'Error Adding Member', detail: 'There was an error adding the member.'});
      }
    }
    submit(this.addMemberForm, async () => {
      this.boardMemberStore.addMember({...this.addMemberModel(), callback} as { email: string; role: BoardMemberRole, callback: (success: boolean) => void });
    })
  }

  onEditRoleSubmit(){
    const memberId = this.memberIdInEditMode();
    const selectedRole = this.selectedMemberRoleToEdit();
    if(memberId && selectedRole){
      this.boardMemberStore.updateMemberRole({id: memberId, role: selectedRole});
    }

    this.memberIdInEditMode.set(null);
  }

  onDeleteMember(member: BoardMember){
    this.confirmationService.confirm({
      message: `Are you sure you want to remove ${member.email} from the board?`,
      header: 'Confirm Removal',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Remove',
        severity: 'danger'
      },
      accept: () => {
        this.boardMemberStore.deleteMember(member.id);
      }
    });
  }
}
