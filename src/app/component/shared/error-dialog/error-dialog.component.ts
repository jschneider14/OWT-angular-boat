import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

export interface DialogData {
    title: string;
    message: string;
}

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialogComponent implements OnInit {

  dialogData: DialogData;
    title: string;
    message: string;

    constructor(
        public dialogRef: MatDialogRef<ErrorDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
                ) {}

    ngOnInit() {

    }

    onConfirm(): void {
        // Close the dialog, return true
        this.dialogRef.close(true);
    }

}
