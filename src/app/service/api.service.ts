import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url: string = "https://cevalogsv.com/rh/nursepass/api/";
  constructor(private http: HttpClient) {

  }
  //  buscar opcoes
  gsOpcao() {
    return this.http.get(`${this.url}opcoes.php`)
  }
  getAtendimento(request) {
    return this.http.post(`${this.url}atendimento.php`, request)
  }

  solicitacaoGet() {
    var response = this.http.get(`${this.url}solicitacoes.php`)
    return response
  }

  solicitacaoHr(request) {
    var response = this.http.post(`${this.url}solicitacoes_chegada.php`, request)
    return response
  }

  solicitacaoAtendimento(request) {
    var response = this.http.post(`${this.url}solicitacoes_atendimento.php`, request)
    return response
  }

  

  solicitacaoGetid(idmatricula) {
    var response = this.http.get(`${this.url}solicitacoesid.php?id=`+ idmatricula)
    return response
  }

  solicitacaoGetdetail(id) {
    var response = this.http.get(`${this.url}solicitacoesdetail.php?id=`+ id)
    return response
  }

  atendimentoGet(id) {
    var response = this.http.get(`${this.url}atendimento_resume.php?id=`+ id)
    return response
  }

  solicitacaoPost(request) {
    var response = this.http.post(`${this.url}solicitacoes.php`, request)
    return response
  }

  getGestor() {
    var response = this.http.get(`${this.url}gestor.php`)
    return response;
  }

  getLista_dados() {
    var response = this.http.get(`${this.url}listar_dados.php`)
    return response;
  }
  getLista_dados_gestor(request) {
    var response = this.http.post(`${this.url}dados_gestor.php`, request)
    return response;
  }
  
  getColaborador(request) {
    var response = this.http.post(`${this.url}get_colaborador.php`, request)
    return response;
  }

  getDados_solicitacao(request) {
    var response = this.http.post(`${this.url}dados_solicitacao.php`, request)
    return response;
  }

  async getOcorrenciaID(request) {
    var response = await this.http.post(`${this.url}ocorrenciaid.php`, {"id": request}).toPromise() 
    console.log('id', request, response)
    return response
  }
}