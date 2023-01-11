import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/model/cliente';
import { Ordine } from 'src/app/model/ordine';
import { Stats } from 'src/app/model/stats';
import { User } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class OrdineService {

  private apiServer = 'http://localhost:8080/api';
    private httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
      constructor(private http: HttpClient) {}


    getAllOrdini(): Observable<Ordine[]> {
        return this.http.get<Ordine[]>(this.apiServer + "/ordine");
    }

    findById(id: number): Observable<Ordine> {
      return this.http.get<Ordine>(this.apiServer + "/ordine/" + id);
    }

    delete(id: number): Observable<boolean> {
      return this.http.get<boolean>(this.apiServer + "/ordine/changeAbilitation/" + id);
     }

     create(ordineInput: Ordine): Observable<Ordine> {
      return this.http.post<Ordine>(this.apiServer + "/ordine", ordineInput, this.httpOptions);
    }

    update(ordineInput: Ordine): Observable<Ordine> {
      return this.http.put<Ordine>(this.apiServer + "/ordine/" + ordineInput.id, ordineInput, this.httpOptions);
    }

    search(example: Ordine): Observable<Ordine[]> {
      return this.http.post<Ordine[]>(this.apiServer + "/ordine/search", example, this.httpOptions);
    }

    getAllFattorini() : Observable<User[]> {
      return this.http.get<User[]>(this.apiServer + "/utente/fattorini");
    }

    getRicaviTotali(dateInput: Stats): Observable<number> {
      return this.http.post<number>(this.apiServer + "/ordine/ricaviTotaliBetween", dateInput, this.httpOptions );
    }

    getOrdiniTotali(dateInput: Stats): Observable<number> {
      return this.http.post<number>(this.apiServer + "/ordine/ordiniTotaliBetween", dateInput, this.httpOptions );
    }

    getPizzeTotali(dateInput: Stats): Observable<number> {
      return this.http.post<number>(this.apiServer + "/ordine/pizzeTotaliOrderedBetween", dateInput, this.httpOptions );
    }

    getClientiVirtuosi(dateInput: Stats): Observable<Cliente[]> {
      return this.http.post<Cliente[]>(this.apiServer + "/ordine/clientiVirtuosiWithOrdineBetween", dateInput, this.httpOptions );
    }

    getOrdiniPerFattorino(): Observable<Ordine[]> {
      return this.http.get<Ordine[]>(this.apiServer + "/ordine/fattorino");
    }
}
