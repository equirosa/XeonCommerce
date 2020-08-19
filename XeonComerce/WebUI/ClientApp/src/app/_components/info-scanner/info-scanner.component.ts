import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-info-scanner',
  templateUrl: './info-scanner.component.html',
  styleUrls: ['./info-scanner.component.css']
})
export class InfoScannerComponent implements OnInit {

  info: string;
  
  constructor(public dialogRef: MatDialogRef<InfoScannerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    this.info = this.data.result; 
  }

}
