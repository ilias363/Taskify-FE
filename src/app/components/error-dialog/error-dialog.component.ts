import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-error-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    NgFor,
  ],
  template: `
    <div>
      <h2 mat-dialog-title>{{ data.errorType }} Error</h2>
      <mat-dialog-content>
        <p *ngFor="let message of data.message.split('\n')">{{ message }}</p>
      </mat-dialog-content>
      <mat-dialog-actions>
        <button mat-button (click)="onClose()">OK</button>
      </mat-dialog-actions>
    </div>
  `,
  styles: ``,
})
export class ErrorDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string; errorType: string }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
