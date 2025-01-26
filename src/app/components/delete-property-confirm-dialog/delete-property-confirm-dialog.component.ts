import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-property-confirm-dialog',
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogTitle,
    MatDialogContent,
  ],
  templateUrl: './delete-property-confirm-dialog.component.html',
  styleUrl: './delete-property-confirm-dialog.component.css',
})
export class DeletePropertyConfirmDialogComponent {
  readonly dialogRef = inject(
    MatDialogRef<DeletePropertyConfirmDialogComponent>,
  );

  @Inject(MAT_DIALOG_DATA) public data: any;

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
