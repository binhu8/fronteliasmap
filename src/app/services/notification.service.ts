import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private snackbar: MatSnackBar
  ) { }

  showNotification(message){
    this.snackbar.open(message, 'Fechar')
  }
}
