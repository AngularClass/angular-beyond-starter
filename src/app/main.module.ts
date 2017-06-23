import { NgModule, ApplicationRef, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// import {
//   removeNgStyles,
//   createNewHosts,
//   createInputTransfer
// } from '@angularclass/hmr';
// import {
//   RouterModule,
//   PreloadAllModules
// } from '@angular/router';


@Component({
  selector: 'app',
  template: `
  <div>
  Hello App
  </div>
  `
})
export class AppComponent {
  constructor() {

  }
}


@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
  ]
})
export class MainModule {
  constructor() {

  }
}
