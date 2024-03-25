import { ShareService } from './../service/share.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-solicitacao-cad',
  templateUrl: './solicitacao-cad.page.html',
  styleUrls: ['./solicitacao-cad.page.scss'],
})
export class SolicitacaoCadPage implements OnInit {
  public opcao: number;
  public cpfdiarista: String;
  cpf: String;
  nome: String;
  empresa: String;
  nome_colaborador: String;
  gestor : String;
  selectedDateTime: string;
  sintomas: String;
  empresaSelecionada: string;
  outra_empresa: string;
  gravidade: String;
  colaboradores: any[] = [];
  gestorMatricula: string = ''; // Matrícula do gestor
  saida;
  public json_response: any;
  list_colaboradores;
  name_users: String;
  public usuario: String;
  lider_matricula: any;
  solicitante: String;
  public matricula: String;
  listaColaboradores: any[];
  colaboradorSelecionado: number;

  constructor(
    private router: Router,
    private modalController: ModalController,
    private route: ActivatedRoute,
    private shareservice: ShareService,
    private http: HttpClient,
    private apiService: ApiService,
  ) {
    this.opcao = 1;
    this.gestor = null,
    this.cpf = null,
      this.nome = null,
      this.empresa = null,
      this.sintomas = null,
      this.gravidade = null,
      this.saida = null
      this.outra_empresa = null
      this.route.queryParams.subscribe(params => {
        var getNav = this.router.getCurrentNavigation();
        if (getNav.extras.state) {
          this.usuario = getNav.extras.state.usuario;
          this.lider_matricula = getNav.extras.state.lider_matricula;
          // this.nome = getNav.extras.state.nome;
        }
      });
      this.matricula = this.shareservice.getUser();
      console.log(this.matricula)
      this.saida = new Date().toLocaleString("en-US", {timeZone: "America/Sao_Paulo"})
      
  }

  ngOnInit() {
  }

  async salvar() {
    var save = {
      nome: this.nome,
      empresa: this.empresa,
      cpf: this.cpf,
      outra_empresa : this.outra_empresa,
      sintomas: this.sintomas,
      saida: this.saida,
      matricula : this.matricula

    };
    console.log('insert: ', save)

    var response = await this.apiService.solicitacaoPost(save).toPromise()
    console.log(response);

    let navigationExtra: NavigationExtras = {
      replaceUrl: true
    }
    this.router.navigate(['solicitante'], navigationExtra)

  }

  solicitaoPost(request) {
    this.apiService.solicitacaoPost(request).subscribe(data => {
      console.log(data)
    })
  }

  stopPag() {
    let navigationExtras: NavigationExtras = {
      state: {
      }
    }
    this.router.navigate(['login'], navigationExtras);
  }

  getUsers() {
    var json = {"matricula": this.matricula}
    console.log(json)
    this.apiService.getColaborador(json).subscribe(data => {
      this.list_colaboradores= data
      console.log(this.list_colaboradores)
    });
  }

  Solicitante(e) {
    this.solicitante = e.target.value['lider']
    this.matricula = e.target.value['LIDER_MATRICULA']
    this.getUsers();  
  }


  voltar() {
    let navigationExtras: NavigationExtras = {
      replaceUrl: true,
      state: {
        usuario: this.usuario,
        matricula: this.matricula,
        json_response: this.json_response  
      }
    }
    this.router.navigate(['solicitante'], navigationExtras)
  }

verificarEmpresaSelecionada() {
  if (this.empresaSelecionada !== 'Diarista') {
    this.outra_empresa = ''; // pra limprar o campo caso nao for selecionado diarista
    this.getUsers()
  }
}
}
