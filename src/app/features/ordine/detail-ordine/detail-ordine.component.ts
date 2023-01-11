import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { DateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Cliente } from 'src/app/model/cliente';
import { Pizza } from 'src/app/model/pizza';
import { User } from 'src/app/model/user';
import { DataSearchService } from 'src/app/shared/services/data-search.service';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { ClienteService } from '../../cliente/cliente.service';
import { PizzaService } from '../../pizza/pizza.service';
import { OrdineService } from '../ordine.service';

// export interface OrdineForm extends FormGroup<{
//   id: FormControl<any>;
//   data: FormControl<any>;
//   codice: FormControl<string>;
//   costoTotale: FormControl<any>;
//   closed: FormControl<any>;
//   cliente: FormControl<any>;
//   fattorino: FormControl<any>;
//   pizzaIds: FormControl<any>
// }> { }

@Component({
  selector: 'app-detail-ordine',
  templateUrl: './detail-ordine.component.html',
  styleUrls: ['./detail-ordine.component.css']
})
export class DetailOrdineComponent {

  constructor(private ordineService: OrdineService,
    private clienteService: ClienteService,
    private pizzaService: PizzaService,
    private snackbarService: SnackbarService,
    private dataSearchService: DataSearchService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('IT');
  }

  clienti: Cliente[] = [];
  fattorini: User[] = [];
  pizze: Pizza[] = [];

  ordineReactive: FormGroup = this.fb.group({
    id: this.fb.control(null),
    data: this.fb.nonNullable.control('', [Validators.required]),
    codice: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(4)]),
    costoTotale: this.fb.nonNullable.control(''),
    closed: this.fb.nonNullable.control(''),
    cliente: this.fb.nonNullable.control('', [Validators.required]),
    fattorino: this.fb.nonNullable.control('', [Validators.required]),
    pizzaIds: this.fb.nonNullable.array([], [Validators.required])
  });

  statsOrdineReactive: FormGroup = this.fb.group({
    dataInizio: this.fb.nonNullable.control('', [Validators.required]),
    dataFine: this.fb.nonNullable.control('', [Validators.required])
  });



  urlFlag: string = "";
  errorMessage: string = "";
  date: any;

  ngOnInit(): void {
    let operation = this.route.snapshot.queryParamMap.get('operation');
    let id: number = Number(this.route.snapshot.paramMap.get('id'));
    if (operation?.includes("readOnly")) {
      this.ordineReactive.disable();
      this.urlFlag = "readOnlyActivated";
    }
    if (operation?.includes("edit")) {
      this.urlFlag = "editActivated";
    }
    if (operation?.includes("add") || this.router.url.includes('create')) {
      this.urlFlag = "addActivated";
    }
    if (operation?.includes("search")) {
      this.urlFlag = "searchActivated";
      this.ordineReactive.get('data')?.removeValidators([Validators.required]);
      this.ordineReactive.get('codice')?.removeValidators([Validators.required, Validators.minLength(4)]);
      this.ordineReactive.get('cliente')?.removeValidators([Validators.required]);
      this.ordineReactive.get('fattorino')?.removeValidators([Validators.required])
      this.ordineReactive.get('pizzaIds')?.removeValidators([Validators.required])

    }

    if (this.router.url.includes('report')) {
      this.urlFlag = "reportActivated";
      this.ordineReactive.get('data')?.removeValidators([Validators.required]);
      this.ordineReactive.get('codice')?.removeValidators([Validators.required, Validators.minLength(4)]);
      this.ordineReactive.get('cliente')?.removeValidators([Validators.required]);
      this.ordineReactive.get('fattorino')?.removeValidators([Validators.required])
      this.ordineReactive.get('pizzaIds')?.removeValidators([Validators.required])
    }

    if (this.router.url.includes('statistiche')) {
      this.urlFlag = "statsActivated";
    }

    if (operation && !operation?.includes("add") && !operation?.includes("search")) {
      const add: FormArray = this.ordineReactive.get('pizzaIds') as FormArray;
      this.ordineReactive.get('id')?.setValue(id);
      this.ordineService.findById(id).subscribe(res => {
        this.date = res.data;
        this.ordineReactive.patchValue(res);

        res.pizzaIds?.forEach(element => {
          add.push(new FormControl(element))
        });

      });
    }

    this.clienteService.getAllClienti().subscribe(res => {
      this.clienti = res;
    });

    this.ordineService.getAllFattorini().subscribe(res => {
      this.fattorini = res;
    });

    this.pizzaService.getAllPizze().subscribe(res => {
      this.pizze = res;
    });

  }

  handleFormRequest(): void {

    if (this.urlFlag == "addActivated") {

      let date = this.ordineReactive.get('data')?.value.toISOString();
      let dateForm = date?.split('T')[0]!;
      this.ordineReactive.get('data')?.setValue(dateForm);

      this.ordineService.create(this.ordineReactive.getRawValue()).subscribe({
        next: ordineItem => this.ordineReactive.patchValue(ordineItem),
        complete: () => this.router.navigate([`/ordine/list`], this.snackbarService.openSnackBar('Operazione effettuata correttamente.', ["blue"])!)
      });
    }

    if (this.urlFlag == "editActivated") {

      if (this.date != this.ordineReactive.get('data')?.value) {

        let date = this.ordineReactive.get('data')?.value.toISOString();
        let dateForm = date?.split('T')[0]!;
        this.ordineReactive.get('data')?.setValue(dateForm);

      }

      this.ordineService.update(this.ordineReactive.value).subscribe({
        next: ordineItem => this.ordineReactive.patchValue(ordineItem),
        complete: () => this.router.navigate([`/ordine/list`], this.snackbarService.openSnackBar('Operazione effettuata correttamente.', ["blue"])!)
      });
    }

    if (this.urlFlag == "searchActivated" || this.urlFlag == "reportActivated") {

      if (this.ordineReactive.get('data')?.value != '') {

        let date = this.ordineReactive.get('data')?.value.toISOString();
        let dateForm = date?.split('T')[0]!;
        this.ordineReactive.get('data')?.setValue(dateForm);

      }

      if (this.ordineReactive.get('cliente')?.value == '') {
        this.ordineReactive.get('cliente')?.setValue(null);
      }

      if (this.ordineReactive.get('fattorino')?.value == '') {
        this.ordineReactive.get('fattorino')?.setValue(null);

      }

      this.ordineService.search(this.ordineReactive.value).subscribe({
        next: ordineItem => this.dataSearchService.setData(ordineItem),
        complete: () => this.router.navigate(['/ordine/list'], { queryParams: { search: "true" } })
      });

    }

    if (this.urlFlag == "statsActivated") {

      let dateStart = this.statsOrdineReactive.get('dataInizio')?.value.toISOString();
      let dateFormStart = dateStart?.split('T')[0]!;
      this.statsOrdineReactive.get('dataInizio')?.setValue(dateFormStart);

      let dateEnd = this.statsOrdineReactive.get('dataFine')?.value.toISOString();
      let dateFormEnd = dateEnd?.split('T')[0]!;
      this.statsOrdineReactive.get('dataFine')?.setValue(dateFormEnd);


      this.ordineService.getRicaviTotali(this.statsOrdineReactive.value).subscribe({
        next: ricaviItem => this.dataSearchService.setRicavi(ricaviItem),
        complete: () => this.router.navigate(['/ordine/list'], { queryParams: { search: "false" } })
      });

      this.ordineService.getOrdiniTotali(this.statsOrdineReactive.value).subscribe({
        next: ordiniItem => this.dataSearchService.setOrdini(ordiniItem),
        complete: () => this.router.navigate(['/ordine/list'], { queryParams: { search: "false" } })
      });

      this.ordineService.getPizzeTotali(this.statsOrdineReactive.value).subscribe({
        next: pizzeItem => this.dataSearchService.setPizze(pizzeItem),
        complete: () => this.router.navigate(['/ordine/list'], { queryParams: { search: "false" } })
      });

      this.ordineService.getClientiVirtuosi(this.statsOrdineReactive.value).subscribe({
        next: clienti => this.dataSearchService.setData(clienti),
        complete: () => this.router.navigate(['/ordine/list'], { queryParams: { search: "false" } })
      });

    }
  }

  onChange(event: MatCheckboxChange) {
    const add: FormArray = this.ordineReactive.get('pizzaIds') as FormArray;
    if (event.source.checked) {
      add.push(new FormControl(event.source.value));
    } else {
      add.removeAt(add.value.indexOf(event.source.value))
    }
  }

  compareObjects(o1: any, o2: any): boolean {
    if (o1 && o2) {
      return o1.name === o2.name && o1.id === o2.id;
    }
    return false;
  }

  doCheck(pizzaId: number): boolean {

    const add: FormArray = this.ordineReactive.get('pizzaIds') as FormArray;
    if (add.value.find((e: number) => e != null)) {
      return add.value.find((element: number) => element == pizzaId);
    }
    return false;
  }
}

