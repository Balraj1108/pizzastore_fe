import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pizza } from 'src/app/model/pizza';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { PizzaService } from '../pizza.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  pizzaToDelete?: Pizza;

  constructor(private pizzaService: PizzaService, private snackBarService: SnackbarService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { idPizza: number }) {
    if (data) {
      this.getPizza(data.idPizza);
    }
  }

  getPizza(idPizza: number) {
    this.pizzaService.findById(idPizza).subscribe(res => {
      if (res) {
        this.pizzaToDelete = { ...res }
      }
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  save() {
    this.pizzaService.delete(this.data.idPizza).subscribe(res => {
      this.snackBarService.openSnackBar('Operazione effettuata correttamente.', ["blue"])
    });
    this.dialogRef.close();
  }

}
