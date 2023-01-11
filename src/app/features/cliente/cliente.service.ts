import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/model/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiServer = 'http://localhost:8080/api/cliente';
    private httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
      constructor(private http: HttpClient) {}


    getAllClienti(): Observable<Cliente[]> {
        return this.http.get<Cliente[]>(this.apiServer);
    }

    findById(id: number): Observable<Cliente> {
      return this.http.get<Cliente>(this.apiServer + "/" + id);
    }

    delete(id: number): Observable<boolean> {
      return this.http.get<boolean>(this.apiServer + "/changeAbilitation/" + id);
     }

     create(clienteInput: Cliente): Observable<Cliente> {
      return this.http.post<Cliente>(this.apiServer, clienteInput, this.httpOptions);
    }

    update(clienteInput: Cliente): Observable<Cliente> {
      return this.http.put<Cliente>(this.apiServer + "/" + clienteInput.id, clienteInput, this.httpOptions);
    }

    search(example: Cliente): Observable<Cliente[]> {
      return this.http.post<Cliente[]>(this.apiServer + "/search", example, this.httpOptions);
    }
}
