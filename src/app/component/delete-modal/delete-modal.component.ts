import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.css'
})
export class DeleteModalComponent {

  constructor(public dialogRef: MatDialogRef<DeleteModalComponent>,@Inject(MAT_DIALOG_DATA) public data: { id: number } ) {
  }


  // Close modal without action
  onNoClick(): void {
    this.dialogRef.close();
  }

  // Pass back ID when confirmed
  confirmDelete(): void {
    this.dialogRef.close(this.data.id);
  }


}
