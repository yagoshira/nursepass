import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {

  public opcao: number
  constructor(
    private router: Router
  ) {
    this.opcao = 1
  }

  ngOnInit() {
    console.log(this.opcao)
  }

  painel() {
    let navigationExtra: NavigationExtras = {
      replaceUrl: true
    }
    this.router.navigate(['painel'], navigationExtra)
  }

  salvar() {
    let navigationExtra: NavigationExtras = {
      replaceUrl: true
    }
    this.router.navigate(['reports'], navigationExtra)
  }

}