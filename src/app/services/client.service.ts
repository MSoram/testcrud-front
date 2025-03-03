import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientModel } from '../models/client.model';
import { map , Observable, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor( private http: HttpClient) { }

  private urlservice = "http://127.0.0.1:8000/api/client";

  saveClient( client: ClientModel ) {
    return this.http.post(`${ this.urlservice} `, client ).pipe(
      map ( (resp: any) => {
        client.idClient = resp.idClient;
        return client;
      })
    );
  }

  deleteClient(idClient: string) {
    
    return this.http.delete(`${this.urlservice}/${idClient}`);
  }

  updateClient ( client: ClientModel) {

    const { idClient, ...ClienteTemp } = client;

    return this.http.put(`${ this.urlservice}/${ client.idClient }`, ClienteTemp)
  }

  getAllClients() {
    return this.http.get(`${ this.urlservice}/index`).pipe(
      delay(2000) 
    );
  }

  getClient( idClient: string ): Observable<ClientModel> {
    return this.http.get<ClientModel>(`${ this.urlservice}/${ idClient }`);
  }

  
  
}
