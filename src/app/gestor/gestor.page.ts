import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NavController, SearchbarCustomEvent } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { ApiService } from '../service/api.service';
import { AnimationController } from '@ionic/angular';
import { interval } from 'rxjs';
import { ShareService } from '../service/share.service';

@Component({
  selector: 'app-gestor',
  templateUrl: './gestor.page.html',
  styleUrls: ['./gestor.page.scss'],
})
export class gestorPage implements OnInit {
  lista: any = [];
  lista_solicitacao_id: any = [];
  listabackup: any = [];
  autocomplete: { input: string; };
  public results = [];
  public usuario: string;
  public level: number;
  public nome: String;
  public matricula: String = '';
  public json_response: any;

  constructor(
    public navCtrl: NavController,
    private menu: MenuController,
    private apiService: ApiService,
    private shareservice: ShareService,
    private animationCtrl: AnimationController,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      let getNav = this.router.getCurrentNavigation();
      var json;
      if (getNav.extras.state) {
        this.usuario = getNav.extras.state.usuario;
        this.nome = getNav.extras.state.nome;
        this.matricula = getNav.extras.state.matricula;
        json = getNav.extras.state.json_response;
        this.saveState(this.usuario, json)
      }
    });
    this.matricula = this.shareservice.getUser();
    console.log('matricula do adm', this.matricula)
    this.getSolicitacoes()
  }

  async ngOnInit() {
    // intervalo a cada 60 segundos (60000)
    const intervalo = interval(60000);

    // intervalo e chama a funcao 
   await intervalo.subscribe(() => {
      this.getSolicitacoes();
    });
  }


  saveState(user, json) {
    this.usuario = user
    this.json_response = json
  }

  async getSolicitacoes() {
    if (this.matricula == undefined) {
      this.stopPag();
    }
    else {
      await this.apiService.solicitacaoGet().subscribe(data => {
        this.lista = data
        this.listabackup = this.lista
        console.log(this.lista)
      });
      console.log('A função getSolicitacoes foi chamada.');
    }
  }

  getSolicitacao_id(id) {
    console.log(id)
    let navigationExtra: NavigationExtras = {
      replaceUrl: true,
      state: {
        idGestor: id
      }
    }
    this.router.navigate(['atendimento'], navigationExtra)
  }


  onSearchChange(searchText: SearchbarCustomEvent): void {
    console.log('searchlog', searchText);
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  updateSearchResults() {
    console.log(this.autocomplete.input) 
  }


  ionChange(event) {
    console.log(event.detail.value)
  }

  handleChange(event) {
    const query = event.target.value.toLowerCase();
    this.results = this.lista;
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  logout() {
    let navigationExtra: NavigationExtras = {
      replaceUrl: true
    }
    this.router.navigate(['login'], navigationExtra)
  }

  consultar() {
    let navigationExtra: NavigationExtras = {
      replaceUrl: true
    }
    this.router.navigate(['consultar'], navigationExtra)
  }

  GoToReports() {
    let navigationExtra: NavigationExtras = {
      replaceUrl: true
    }
    this.router.navigate(['reports'], navigationExtra)
  }

  atendimento() {
    let navigationExtra: NavigationExtras = {
      replaceUrl: true
    }
    this.router.navigate(['atendimento'], navigationExtra)
  }


    searchGravidade(ev: Event) {
      this.lista = this.listabackup;
      const val = (<CustomEvent>ev).detail.value;
      if (val && val.trim() !== '') {
        this.lista = this.lista.filter((term) => {
          return (term.nome.toLowerCase().indexOf(val.trim().toLowerCase()) > -1);
        });
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