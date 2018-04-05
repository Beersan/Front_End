import { HttpClient } from '@angular/common/http';
import { Injectable, Component, ViewChild } from '@angular/core';
import { Especialidade } from '../../models/model.cadastrar-especialidade';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { Nav, Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { HomePage } from '../../pages/home/home';

@Injectable()
export class CadastrarEspecialidadeProvider {

  descricaoespecialidade: any;
  //codigoespecialidade: any;

  push(arg0: any): any {
    throw new Error("Method not implemented.");
  }

  @ViewChild(Nav) nav: Nav;
  constructor(
    private http: HttpClient, 
    public alertCtrl: AlertController
  ) {}

  create(especialidade: Especialidade) {
    var rota = "cadastrar";
    //testes pau no cod espec
    //console.log(especialidade.codigoEspecialidade);
    //console.log(especialidade.descricaoEspecialidade);
    if (especialidade.codigoEspecialidade != ""){
      rota = "editar";
    }
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/especialidade/' + rota, especialidade).subscribe(response => {
        resolve(response);
      });
    });
  }

  retornarEspecialidade(){
    return this.http.get('http://localhost:3000/especialidade/listar').toPromise();
  }

  excluirEspecialidade(codigoEspecialidade){
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/especialidade/excluir', codigoEspecialidade).subscribe(response => {
        //console.log(codigoEspecialidade + "Esse cara");
        resolve(response);
      });
    });
  }

  /*create(especialidade: Especialidade) {
    //const data = JSON.stringify(especialidade);
    //console.log(especialidade);

    this.http.post('http://localhost:3000/especialidade/cadastrar', especialidade).subscribe(response => {
      //console.log(especialidade);
    });

    /*this.http.get('http://localhost:8100/cadastrarEspecialidade' + this.name).subscribe(response => {
      console.log('GET Response:', response);
    });


    //console.log(this.descricaoEspecialidade);
  }*/
}
