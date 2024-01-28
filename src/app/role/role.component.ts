import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CtmossService } from '../../../services/ctmoss.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { GetRoles, GetRolesApiResponse } from '../../types/GetRoles';

@Component({
  template: ''
})

export class NgbdModalContent {
  @Input() name: any;

  constructor(public activeModal: NgbActiveModal) { }
}

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgIf, NgFor, CommonModule],
  providers: [CtmossService],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent implements OnInit, OnDestroy {


  roleForm!: FormGroup;
  errorMessage!: string;
  allRoles!: Subscription;
  getUserRoles!: GetRoles[];
  edit = false
  setEdit!: string;
  constructor(private modalService: NgbModal, private fb: FormBuilder, private service: CtmossService) { }

  ngOnInit(): void {
    this.roleForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    })

    this.getRoles()

  }

  openConsolidate(content: any) {
    this.modalService.open(content, { size: 'md' });

  }
  dismiss() {
    this.modalService.dismissAll()
  }

  getRoles() {
    this.allRoles = this.service.getRoles('/roles').subscribe({
      next: (response: GetRolesApiResponse) => {
        this.getUserRoles = response.data
      },
      error: (error) => {
        alert(error['message'])
      }
    })
  }

  submitRole() {
    this.errorMessage = ''
    const payload = {
      name: this.roleForm.get("name")?.value,
      description: this.roleForm.get('description')?.value
    }
    this.service.addRoles('/roles/add', payload).subscribe({
      next: (response) => {
        if (response['message'] == 'success') {
          this.modalService.dismissAll();
          this.roleForm.get('name')?.setValue('')
          this.roleForm.get('description')?.setValue('')
        } else {
          this.errorMessage = response['message']
        }
      },
      error: (error) => {
        alert(error['message'])
      },
      complete: () => {
        this.getRoles()
      }
    })

  }

  editData(data: GetRoles, content: any) {
    this.edit = true
    this.modalService.open(content, { size: 'md' });
    this.roleForm.get('name')?.setValue(data.name)
    this.roleForm.get('description')?.setValue(data.description)
    this.setEdit = data._id
  }
  setUpdate() {
    this.errorMessage  = ''
    const payload = {
      id: this.setEdit,
      data: {
        name: this.roleForm.get("name")?.value,
        description: this.roleForm.get("description")?.value
      }
    }
    this.service.updateRoles('/roles/update', payload).subscribe({
      next: (response) => {
        if(response['success'] == true) {
          this.modalService.dismissAll();
          this.edit = false
        }
      },
      error: (error) => {
        alert(error['message'])
      },
      complete: () => {
        this.getRoles()
      }
    })
  }


  deleteData(id: string) {
    this.service.deleteRoles(`/roles/delete/${id}`).subscribe({
      next: (response) => {
        alert(response['message'])
      },
      error: (error) => {
        alert(error['message'])
      },
      complete: () => {
        this.getRoles()
      }
    })
  }

  ngOnDestroy(): void {
    this.allRoles.unsubscribe();
  }

}
