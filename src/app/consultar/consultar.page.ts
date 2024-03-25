import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.page.html',
  styleUrls: ['./consultar.page.scss'],
})
export class ConsultarPage implements OnInit {

  constructor(
    private router: Router,
  ){} 
  


  ngOnInit() {
  }

  public data = ['0001', '0002', '0003', '0004', '0005', '0006', '0007', '0008', '0009', '0010'];
  public results = [...this.data];

  handleChange(event) {
    const query = event.target.value.toLowerCase();
    this.results = this.data.filter(d => d.toLowerCase().indexOf(query) > -1);
  }

  painel(){
    let navigationExtra: NavigationExtras = {
      replaceUrl: true
    }
    this.router.navigate(['painel'], navigationExtra)
  }
  
}

