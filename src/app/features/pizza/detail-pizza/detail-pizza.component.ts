import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { DataSearchService } from 'src/app/shared/services/data-search.service';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { ClienteService } from '../../cliente/cliente.service';
import { PizzaService } from '../pizza.service';

export interface PizzaForm extends FormGroup<{
  id: FormControl<any>;
  descrizione: FormControl<string>;
  ingredienti: FormControl<string>;
  prezzoBase: FormControl<any>;
  attivo: FormControl<any>;
}> { }

@Component({
  selector: 'app-detail-pizza',
  templateUrl: './detail-pizza.component.html',
  styleUrls: ['./detail-pizza.component.css']
})
export class DetailPizzaComponent {

  constructor(private pizzaService: PizzaService,
    private authService: AuthService,
    private snackbarService: SnackbarService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private dataSearchService: DataSearchService) {
  }

  pizzaReactive: PizzaForm = this.fb.group({
    id: this.fb.control(null),
    descrizione: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(4)]),
    ingredienti: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(4)]),
    prezzoBase: this.fb.nonNullable.control('', [Validators.required]),
    attivo: this.fb.nonNullable.control('', [Validators.required])
  });

  urlFlag: string = "";

  ngOnInit(): void {
    let operation = this.route.snapshot.queryParamMap.get('operation');
    let id: number = Number(this.route.snapshot.paramMap.get('id'));
    if (operation?.includes("readOnly")) {
      this.pizzaReactive.disable();
      this.urlFlag = "readOnlyActivated";
    }
    if (operation?.includes("edit")) {
      this.urlFlag = "editActivated";
    }
    if (operation?.includes("add")) {
      this.urlFlag = "addActivated";
    }
    if(operation?.includes("search")) {
      this.urlFlag = "searchActivated";
    }
    if (!operation?.includes("add") && !operation?.includes("search")) {
      this.pizzaReactive.get('id')?.setValue(id);
      this.pizzaService.findById(id).subscribe(res => {
        this.pizzaReactive.patchValue(res);
      });
    }

  }

  handleFormRequest(): void {
    if (this.urlFlag == "addActivated") {

      this.pizzaService.create(this.pizzaReactive.getRawValue()).subscribe({
        next: clienteItem => this.pizzaReactive.patchValue(clienteItem),
        complete: () => this.router.navigate([`/pizza/list`], this.snackbarService.openSnackBar('Operazione effettuata correttamente.', ["blue"])!)
      });
    }

    if (this.urlFlag == "editActivated") {
      this.pizzaService.update(this.pizzaReactive.value).subscribe({
        next: clienteItem => this.pizzaReactive.patchValue(clienteItem),
        complete: () => this.router.navigate([`/pizza/list`], this.snackbarService.openSnackBar('Operazione effettuata correttamente.', ["blue"])!)
      });
    }

    if(this.urlFlag == "searchActivated") {
      this.pizzaService.search(this.pizzaReactive.value).subscribe({
        next: clienteItem => this.dataSearchService.setData(clienteItem),
        complete: () => this.router.navigate(['/pizza/list'], {queryParams: {search:"true"}})
      });
    }
  }

}
