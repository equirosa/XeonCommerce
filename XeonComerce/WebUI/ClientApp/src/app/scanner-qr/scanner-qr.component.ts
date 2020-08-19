import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import {QrScannerComponent} from 'angular2-qrscanner';
import { InfoScannerComponent } from '../_components/info-scanner/info-scanner.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-scanner-qr',
  templateUrl: './scanner-qr.component.html',
  styleUrls: ['./scanner-qr.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ScannerQrComponent implements OnInit {

  @ViewChild(QrScannerComponent, {static: false}) qrScannerComponent: QrScannerComponent ;

  constructor(public dialog: MatDialog) { }
  
  ngOnInit() {
   
}

  ngAfterViewInit(): void {
    this.qrScannerComponent.getMediaDevices().then(devices => {
      console.log(devices);
      const videoDevices: MediaDeviceInfo[] = [];
      for (const device of devices) {
          if (device.kind.toString() === 'videoinput') {
              videoDevices.push(device);
          }
      }
      if (videoDevices.length > 0){
          let choosenDev;
          for (const dev of videoDevices){
              if (dev.label.includes('front')){
                  choosenDev = dev;
                  break;
              }
          }
          if (choosenDev) {
              this.qrScannerComponent.chooseCamera.next(choosenDev);
          } else {
              this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
          }
      }
  });

  this.qrScannerComponent.capturedQr.subscribe(result => {
      // console.log(result);
      const dialogRef = this.dialog.open(InfoScannerComponent, {
        width: '500px',
        height: '500px',
        data: {result}
      });
  
      dialogRef.afterClosed().subscribe(dialogResult => {
        // Cerrar el scanner tambien
      });
  });
  }
  
}
