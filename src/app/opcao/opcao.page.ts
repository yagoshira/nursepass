import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-opcao',
  templateUrl: './opcao.page.html',
  styleUrls: ['./opcao.page.scss'],
})
export class OpcaoPage implements OnInit {
  public tipo: any;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.tipo = 'taxi'
  }
  async solicitante() {
    let navigationExtra: NavigationExtras = {
      replaceUrl: true
    }
    this.router.navigate(['solicitante'], navigationExtra)
  }
}
