import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public usuario: string;
  public level: number;
  public nome: String;
  public matricula: String;
  public json_response: any;

  constructor(
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
        this.saveState(this.usuario,json)
      }
    });
  }

  ngOnInit() {
    console.log("collar do usuario", this.usuario)
  }

  saveState(user, json) {
    this.usuario = user
    this.json_response = json
    if (this.usuario == 'WHITE') {
      this.level = 2;
    } else if (this.usuario == 'BLUE') {
      this.level = 1;
    }
  }

  async solicitante() {
    let navigationExtras: NavigationExtras = {
      replaceUrl: true,
      state: {
        usuario: this.usuario,
        matricula: this.matricula,
        json_response: this.json_response  
      }
    }
    this.router.navigate(['teste'], navigationExtras)
  }
}
