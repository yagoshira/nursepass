import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { AlertController, AnimationController, IonModal, LoadingController } from '@ionic/angular';
import { ShareService } from '../service/share.service';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-solicitante',
  templateUrl: './solicitante.page.html',
  styleUrls: ['./solicitante.page.scss'],
})
export class SolicitantePage implements OnInit {
  @ViewChild(IonModal) modal:IonModal;
  message: String;
  name: String;
  isModalOpen = false;
  lista: any =[];
  opcao: any;
  titulo: any;
  ocorrencia: any;
  public level: number;
  browser: any;
  status: any;
  id_solicitacao: String;
  public usuario: string;
  public nome: String;
  public matricula: String;
  public json_response: any;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private shareservice: ShareService,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private animationCtrl: AnimationController,
    private loadingCtrl: LoadingController,
  ) {
    this.route.queryParams.subscribe(params => {
      let getNav = this.router.getCurrentNavigation();
      if (getNav.extras.state) {
        this.usuario = getNav.extras.state.usuario;
        this.saveState(this.usuario)
      }
    });
    this.matricula = this.shareservice.getUser();
    this.getSolicitacoes();
    console.log(this.matricula)
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }
  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };
  
  ngOnInit() {
  }

  
  saveState(user) {
    this.usuario = user

  }

  GoToReports() {
    let navigationExtra: NavigationExtras = {
      replaceUrl: true
    }
    this.router.navigate(['reports'], navigationExtra)
  }

  async solicitacao_cad() {
    let navigationExtras: NavigationExtras = {
      replaceUrl: true,
      state: {
        usuario: this.usuario,
        matricula: this.matricula,
        json_response: this.json_response  
      }
    }
    this.router.navigate(['solicitacao-cad'], navigationExtras)
    this.getSolicitacoes()
  }

  logout() {
    let navigationExtras: NavigationExtras = {
      state: {
      }
    }
    this.router.navigate(['login'], navigationExtras);
  }


  atendimento(id) {
    let navigationExtra: NavigationExtras = {
      replaceUrl: true,
    }
    this.router.navigate(['atendimento'], navigationExtra)
  }

  getSolicitacoes() {
    this.apiService.solicitacaoGetid(this.matricula).subscribe(data => {
      this.lista = data
      console.log(this.lista)
    })
  }

  getSolicitacoesID(id) {
    this.apiService.getAtendimento(id).subscribe(data => {
      this.lista = data
      console.log(this.lista)
    });
  }


  stopPag() {
    let navigationExtras: NavigationExtras = {
      state: {
      }
    }
    this.router.navigate(['login'], navigationExtras);
  }

  setOpen(isOpen: boolean, id) {
    this.isModalOpen = isOpen;
    this.getSolicitacoesID(id)
  }

  async getOcorrenciaID(id) {
    this.ocorrencia = await this.apiService.getOcorrenciaID(id)
    console.log(this.ocorrencia)
  }
}

