import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CadastrarGrupoEstagiario } from '../../models/model.cadastrar-grupo-estagiario';

@Injectable()
export class GrupoEstagiarioProvider {

  constructor(public http: HttpClient) {}

  retornarGrupo(){
    return this.http.get('http://localhost:3000/grupoestagiario/listargrupo').toPromise();
  }

  retornarEstagiario(){
    return this.http.get('http://localhost:3000/grupoestagiario/listarestagiario').toPromise();
  }

  retornarEstagio(){
    return this.http.get('http://localhost:3000/grupoestagiario/listarestagio').toPromise();
  }

  alterarEstagio(idgrupo) {
    console.log(idgrupo);
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/grupoestagiario/alterarestagio', idgrupo).subscribe(response => {
        resolve(response);
      });
    });
  }

  /*retornarProfessor(professor: any){
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/grupoestagiario/listarprofessor', professor).subscribe(response => {
        resolve(response);
      });
    });
  }*/

  retornarGrupoEstagiario(){
    return this.http.get('http://localhost:3000/grupoestagiario/listargrupoestagiario').toPromise();
  }

  create(codigos) {
    
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/grupoestagiario/cadastrar', codigos).subscribe(response => {
        resolve(response);
      });
    });
  }

  excluirGrupoEstagiario(idgrupo){
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/grupoestagiario/excluir', idgrupo).subscribe(response => {
        resolve(response);
      });
    });
  }

  retornarEstagiarioEditar(idGrupo){
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/grupoestagiario/listarestagiarioseditar', idGrupo).subscribe(response => {
        resolve(response);
      });
    });
  }

  
}
