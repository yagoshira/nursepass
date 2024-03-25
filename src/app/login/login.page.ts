import { ShareService } from './../service/share.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  matricula: number;
  public usuario: any;
  exibirSenhaADMIN: boolean = false;
  senhaADMIN: string;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private modalController: ModalController,
    private http: HttpClient,
    private shareservice: ShareService
  ) {
    if (this.matricula <= 0) {
      this.stopPag();
    }
  }

  ngOnInit() {
  }


  async presentAlert(title, body) {
    const alert = await this.alertController.create({
      header: title,
      message: body,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  async login() {
    var response = await this.http.get('https://cevalogsv.com/rh/nursepass/api/getLogin.php?matricula=' + this.matricula).toPromise()
    console.log()

    this.shareservice.setUser(response[0].MATRICULA);
    if (response == null) {
      await this.presentAlert('Erro!', 'Matricula não encontrada');
      this.matricula = null
      console.log()

    } else if (response[0].COLLAR == 'RED') {
      await this.presentAlert('Alerta!', 'Você não tem acesso.');
      this.matricula = null


    } else if (response[0].COLLAR == 'WHITE') {
      const password = prompt('ADMIN, senha solicitada.');
      if (password == 'cev4@nursepass') { 
        await this.presentAlert('', 'Você está acessando como: ADMIN.');
        let navigationExtras: NavigationExtras = {
          state: {
            usuario: response[0].COLLAR,
            nome: response[0].NOME,
            matricula: response[0].MATRICULA,
            json_response: response
          }
        }
        this.router.navigate(['painel'], navigationExtras)
      } else {
        await this.presentAlert('','Senha incorreta, acesso negado');
      }
    
    
    
    } else if (response[0].COLLAR == 'GREEN') {
      await this.presentAlert('', 'Você está acessando como: RH.');
      let navigationExtras: NavigationExtras = {
        state: {
          usuario: response[0].COLLAR,
          nome: response[0].NOME,
          matricula: response[0].MATRICULA,
          lider_matricula: response[0].LIDER_MATRICULA,
          json_response: response
        }
      }
      this.router.navigate(['solicitante'], navigationExtras)


    } else if (response[0].COLLAR == 'BLUE') {
      await this.presentAlert('', 'Você está acessando como: Gestor');
      let navigationExtras: NavigationExtras = {
        state: {
          usuario: response[0].COLLAR,
          nome: response[0].NOME,
          lider_matricula: response[0].LIDER_MATRICULA,
          matricula: response[0].MATRICULA,
          json_response: response
        }
      }
      this.router.navigate(['solicitante'], navigationExtras)
    }
  }
  
  stopPag() {
    let navigationExtras: NavigationExtras = {
      state: {
      }
    }
    this.router.navigate(['login'], navigationExtras);
  }
}
