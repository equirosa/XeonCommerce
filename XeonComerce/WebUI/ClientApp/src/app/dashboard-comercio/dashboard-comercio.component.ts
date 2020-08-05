import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-comercio',
  templateUrl: './dashboard-comercio.component.html',
  styleUrls: ['./dashboard-comercio.component.css']
})
export class DashboardComercioComponent implements OnInit {

  title = 'app';
  widthPorcentajeCitasRealizadas: number = 5;

  constructor() { }

  ngOnInit(): void {
  }

}
