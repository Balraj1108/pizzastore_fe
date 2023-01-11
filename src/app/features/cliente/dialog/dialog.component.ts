import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from 'src/app/model/cliente';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  clienteToDelete?: Cliente;

  constructor(private clienteService: ClienteService, private snackBarService: SnackbarService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { idCliente: number }) {
    if (data) {
      this.getCliente(data.idCliente);
    }
  }

  getCliente(idCliente: number) {
    this.clienteService.findById(idCliente).subscribe(res => {
      if (res) {
        this.clienteToDelete = { ...res }
      }
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  save() {
    this.clienteService.delete(this.data.idCliente).subscribe(res => {
      this.snackBarService.openSnackBar('Operazione effettuata correttamente.', ["blue"])
    });
    this.dialogRef.close();
  }
}
