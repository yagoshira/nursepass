import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { ShareService } from '../service/share.service';

@Component({
  selector: 'app-atendimento',
  templateUrl: './atendimento.page.html',
  styleUrls: ['./atendimento.page.scss'],
})
export class AtendimentoPage implements OnInit {
  public level: number;
  lista: any = [];
  idGestor: any;
  prin_qx: string;
  medicamentos: string;
  public results = [];
  sublista : any = [];
  otherlista : any = [];
  listresume : any = [];
  matricula: any;
  idsolicitacao: any;
  disabled: any;
  public nome: String;
  encerrado: String;
  chegada: any;
  ocorrencia: any;
  status: String;
  tratativa: String;
  qualificacao: String;
  inf_adc: String;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private shareservice: ShareService,
    private apiService: ApiService
  ) {
    this.ocorrencia = null,
      this.chegada = null,
      this.tratativa = null,
      this.qualificacao = null,
      this.prin_qx = null,
      this.medicamentos = null,
      this.inf_adc = null,
      this.level = 1;
    this.route.queryParams.subscribe(params => {
      let getNav = this.router.getCurrentNavigation();
      var idlocal;
      if (getNav.extras.state) {
        idlocal = getNav.extras.state.idGestor
        this.nome = getNav.extras.state.nome;
        this.saveState(idlocal)
      }
    });
    this.matricula = this.shareservice.getUser();
  }



  ngOnInit() {
  }

  async salvar() {
    var save = {
      ocorrencia: this.ocorrencia,
      tratativa: this.tratativa,
      qualificacao: this.qualificacao,
      inf_adc: this.inf_adc,
      prin_qx: this.prin_qx,
      medicamentos: this.medicamentos,
      id_solicitacao: this.idGestor

    };
    console.log('insert: ', save)

    var response = await this.apiService.solicitacaoAtendimento(save).toPromise()
    console.log(response);

    let navigationExtra: NavigationExtras = {
      replaceUrl: true
    }
    this.router.navigate(['painel'], navigationExtra)

  }

  AddMarker() {
    this.disabled = "true";
  }



  saveState(id) {
    this.idGestor = id
    this.nome = this.nome
    console.log("id em solicitante", this.idGestor)
    this.getSolicitacoes_id()
    this.getAtendimento_resume()
  }

  voltar() {
    let navigationExtra: NavigationExtras = {
      replaceUrl: true
    }
    this.router.navigate(['painel'], navigationExtra)
  }

  async savechegada() {
    var save = {
      id: this.idGestor
    };
    console.log('insert: ', save)
    var response = await this.apiService.solicitacaoHr(save).toPromise()
    console.log(response);
  }


  salvarGestor() {
    let navigationExtra: NavigationExtras = {
      replaceUrl: true
    }
    this.router.navigate(['solicitante'], navigationExtra)
  }

  getSolicitacoes_id() {
    this.apiService.solicitacaoGetdetail(this.idGestor).subscribe(data => {
      this.lista = data
      this.chegada = data[0].chegada
      this.status = data[0].status
      console.log("detalhe da linha", this.lista, this.chegada)

    })
  }

  getAtendimento() {
    this.apiService.getAtendimento(this.sublista).subscribe(data => {
      this.sublista = data
      console.log("sublista", this.sublista)

    })
  }
  getAtendimento_resume() {
    this.apiService.atendimentoGet(this.idGestor).subscribe(data => {
      this.otherlista = data
      console.log("lista", this.otherlista)
    })
  }


}
