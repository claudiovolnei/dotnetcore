import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
 // tslint:disable-next-line: variable-name
 _filtroLista: string;
  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  eventosFiltrados: any = [];
  eventos: any = [];
  imagemWidth = 50;
  ImagemMargin = 2;
  mostrarImgem = false;


  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getEventos();
  }

  alternarImagem() {
    this.mostrarImgem = !this.mostrarImgem;
  }

  filtrarEventos(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  getEventos() {
   this.http.get('http://localhost:5000/api/values').subscribe( response => {
     this.eventos = response;
     console.log(response);
    }, error => {
      console.log(error);
    });
  }
}