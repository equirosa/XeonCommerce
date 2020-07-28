import { Component, OnInit, ViewChild } from '@angular/core';
import { View, EventSettingsModel, ScheduleComponent} from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-calendario-empleado',
  templateUrl: './calendario-empleado.component.html',
  styleUrls: ['./calendario-empleado.component.css']
})
export class CalendarioEmpleadoComponent implements OnInit {

  setView: View = 'Month';

  constructor() { }

  ngOnInit(): void {
    
  }

  title = 'my-scheduler-app';
//  setView: View = 'Month';
//  setDate: Date = new Date(2020, 6, 27);
//  eventObject: EventSettingsModel = {
//   dataSource: [{
//     Subject: "Prueba",
//     StartTime: new Date(2020, 6, 27, 9),
//     EndTime: new Date(2020, 6, 27, 11),
//     IsReadOnly: true,
//    // IsBlock: true,
//   }],
//   fields: {
//     subject: {name: 'EventTitle', default: "Hello Eviroment"},
//     startTime: { name: 'EventStart'},
//     endTime: { name: "EventEnd"}
//   }
// }

}
