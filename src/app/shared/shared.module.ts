import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarsComponent } from './components/sidebars/sidebars.component';



@NgModule({
  declarations: [
    SideBarsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SideBarsComponent
  ]
})
export class SharedModule { }
