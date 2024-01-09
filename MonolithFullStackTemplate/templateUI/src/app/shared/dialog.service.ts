import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatConfirmDialogComponent } from './components/mat-confirm-dialog/mat-confirm-dialog.component';
import { Link } from './response/link';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) {
  }

  openConfirmDialog(msg: string) {
    return this.dialog.open(MatConfirmDialogComponent, {
      width: '390px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      position: { top: '60px' },
      data: {
        message: msg
      }
    });
  }
}

export enum DialogClosedActionType {
  CREATED = 'Created',
  UPDATED = 'Updated',
  DELETED = 'Deleted',
  DISMISSED = 'Dismissed'
}

export interface DialogLinkData {
  link: Link | null | undefined;
}
