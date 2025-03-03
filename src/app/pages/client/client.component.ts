import { Component, OnInit } from '@angular/core';
import { ClientModel } from '../../models/client.model';
import { NgForm } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import Swal from 'sweetalert2';  
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-client',
  standalone: false,
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements  OnInit{

  client: ClientModel = new ClientModel();

  constructor(private clientService: ClientService, private route: ActivatedRoute) { }

  ngOnInit() {

    const id= this.route.snapshot.paramMap.get('id');
    
    if (id && id !== 'new') {
      this.clientService.getClient(id).subscribe( (resp: ClientModel) => {
        this.client = resp;
        this.client.idClient = id;

      },
      (error) => {
        console.error('Error Client', error);
        Swal.fire({
          title: 'Error',
          text: 'Client Not Found. Try Again.',
          icon: 'error',
        });
      });
     
    }

  }

  saveClient( form: NgForm) {
        
    if(form.invalid) {
      //console.log('formulario no valido');
       Object.values(form.controls).forEach( control => {
        control.markAsTouched();
       });

      return;
    }

    Swal.fire({
      'title': 'Wait',
      'text': 'saving data',
      'icon': 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let clientRunSave: Observable<any>;

    if (this.client.idClient) {
      clientRunSave = this.clientService.updateClient( this.client);
    }
    else {
      clientRunSave = this.clientService.saveClient( this.client);
    }
    
    clientRunSave.subscribe(
      resp => {
        Swal.fire({
          title: this.client.firstname,
          text: 'Updated',
          icon: 'success'
        });
        
      })
  }

   
}
