import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { PreCadastro } from '../../models/model.pre-cadastro';

@Injectable()
export class PreCadastroProvider {

  constructor(
    public http: HttpClient,
    public alertCtrl: AlertController
  ) {}

  gravar(preCadastro: PreCadastro){
    console.log(preCadastro);
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/preCadastro/gravar', preCadastro).subscribe(response => {
        resolve(response);
      });
    });
  }

  retornarEspecialidade(){    
    return this.http.get('http://localhost:3000/preCadastro/listarEspecialidade').toPromise();
  }

  retornarPacientes(){
    return this.http.get('http://localhost:3000/preCadastro/listarPacientes').toPromise();
  }
}
