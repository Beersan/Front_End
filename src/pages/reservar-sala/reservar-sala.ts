import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, DateTime } from 'ionic-angular';
import { ReservaSalaProvider} from './../../providers/reserva-sala/reserva-sala';
import { NgForm, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { ReservarSala } from './../../models/model.reservar-sala';
import { HttpClient } from '@angular/common/http';
import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-reservar-sala',
  templateUrl: 'reservar-sala.html',
})
export class ReservarSalaPage {
  
  reservaForm = {};
  reservas: any[];
  reserva: ReservarSala;
  solicitante: string;
  salaReserva: string;
  dataReserva: Date;
  dataReservas: any;
  idReserva = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private http: HttpClient,
    public formBuilder: FormBuilder,
    public provider: ReservaSalaProvider
  ) {
    if (this.navParams.data.reserva) {      
      this.reservas = this.navParams.data.reserva;
      console.log(this.reservas);
      var text = JSON.stringify(this.reservas);
      var obj = JSON.parse(text);
      this.solicitante = obj.solicitante;
      this.salaReserva = obj.salareserva;
      this.listarDatasReservadas();
      this.dataReserva = obj.datareserva;
      this.idReserva = obj.idreserva;
    }
    this.reservaForm = formBuilder.group ({
      solicitante:['', Validators.required],
      salaReserva:['', Validators.required],
      dataReserva:['', Validators.required]
    })  
  }

  reservarSala(){
    if (this.dataValida()){
      this.provider.create({
        solicitante: this.solicitante,
        salaReserva: this.salaReserva,
        dataReserva: this.dataReserva,
        idReserva: this.idReserva
      }).then((result) => {
        this.showAlert();    
      }); 
    }
  }

  dataValida(){
    var valido = true;
    for(var i = 0; i < this.dataReservas.length; i++){
      if(moment(this.dataReserva).format("YYYY-MM-DD") == moment(this.dataReservas[i].datareserva).format("YYYY-MM-DD")){
        valido = false;
      }
    }
    if(!valido){
      let alert = this.alertCtrl.create({
        title: 'Falha!',
        subTitle: 'Data já reservada.',
        buttons: ['Ok']
      });
      alert.present();
    }
    return valido;
  }
  
  listarDatasReservadas() {
    this.provider.listarDatasReservadas({sala: this.salaReserva}).then(
      data => {
        this.dataReservas = data;
      }
    )
    .catch(error => alert(error));
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      subTitle: 'Reserva gravada.',
      buttons: ['Ok']
    });
    alert.present();
    this.navCtrl.pop();
  }

  cancelar(){
    this.navCtrl.pop();
  }
}
