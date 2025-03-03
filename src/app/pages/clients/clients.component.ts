import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import Swal from 'sweetalert2';  
import { Observable } from 'rxjs';
import { ClientModel } from '../../models/client.model';


@Component({
  selector: 'app-clients',
  standalone: false,
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements  OnInit  {
  
  dtOptions: any = {};
  dataClients: ClientModel[] = [];
  loading = false;

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.loading = true;

    this.clientService.getAllClients().subscribe(
      (response: any) => {
        if (Array.isArray(response)) { 
          this.dataClients = response.map(client => {
            const clientModel = new ClientModel();
            clientModel.idClient = client.id ? client.id.toString() : ''; 
            clientModel.firstname = client.firstname;
            clientModel.lastname = client.lastname;
            clientModel.email = client.email;
            clientModel.phone = client.phone;
            clientModel.status = client.status ?? true; 
            return clientModel;
          });
        } else {
          console.error('Expected an array but received:', response);
        }
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching clients:', error);
      }
      
    );

    this.dtOptions={
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      serverSide: true
    }
  }

  deleteClient( client: ClientModel, i: number) {
    Swal.fire({
      'title': 'Are you sure?',
      'text': 'Do you want to delete it?',
      'icon': 'question',
      showConfirmButton: true,
      showDenyButton: true
    }).then( resp => {
      if (resp.value) {
        this.dataClients.splice(i , 1);
        this.clientService.deleteClient(client.idClient).subscribe();
      }
    });

    
  }

}
