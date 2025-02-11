import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) { }

  // Method to close the dialog without confirmation
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  // Method to confirm the action
  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
