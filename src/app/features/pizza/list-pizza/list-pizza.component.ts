import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/model/cliente';
import { Pizza } from 'src/app/model/pizza';
import { DataSearchService } from 'src/app/shared/services/data-search.service';
import { DialogComponent } from '../dialog/dialog.component';
import { PizzaService } from '../pizza.service';

@Component({
  selector: 'app-list-pizza',
  templateUrl: './list-pizza.component.html',
  styleUrls: ['./list-pizza.component.css']
})
export class ListPizzaComponent {

  constructor(private pizzaService: PizzaService, private router: Router, public dialog: MatDialog, private route: ActivatedRoute, private dataSearchService: DataSearchService) {}
  dataSource: MatTableDataSource<Pizza> = new MatTableDataSource<Pizza>();
  displayedColumns: string[] = ['id', 'descrizione', 'ingredienti', 'prezzoBase', 'attivo', 'azioni'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  urlSearchOperationFlag: string | null = ""

  ngOnInit(): void {
    let operation = this.route.snapshot.queryParamMap.get('search');
    this.urlSearchOperationFlag = operation;
    if(operation == 'true') {
      this.dataSource.data = this.dataSearchService.getData();
    } else {
      this.getData();
    }
  }

  openDialog(idPizza: number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: 'auto',
      data: {idPizza}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.pizzaService.getAllPizze().subscribe(res => {
        this.dataSource.data = res;
      })
    });
  }


  getData() {
    this.pizzaService.getAllPizze().subscribe(res => {
      this.dataSource.data = res;
    });
  }
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  showDetail(id: number) {
    this.router.navigate(["pizza/", id], {queryParams: {operation:"readOnly"}});
  }

  onClickDelete(id: number) {
    this.openDialog(id);
  }

  onClickAddNew() {
    this.router.navigate(["pizza/create"], {queryParams: {operation:"add"}});
  }

  onClickUpdate(id: number) {
    this.router.navigate(["pizza/edit/", id], {queryParams: {operation:"edit"}});
  }

  resetDataSource() {
    this.getData();
    this.urlSearchOperationFlag = "";
  }

}
