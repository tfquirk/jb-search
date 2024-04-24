import { Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";

export interface DialogData {
  primaryBtnText: string;
  text: string;
  title: string;
}

@Component({
  selector: "app-dialog",
  templateUrl: "dialog.component.html",
  standalone: true,
  imports: [MatButtonModule, MatDialogTitle, MatDialogContent, MatIconModule],
  styleUrl: "./dialog.component.css",
})
export class Dialog {
  constructor(
    public dialogRef: MatDialogRef<Dialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  handleClose(): void {
    this.dialogRef.close();
  }
}
