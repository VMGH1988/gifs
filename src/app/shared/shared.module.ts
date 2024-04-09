import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarsComponent } from './components/sidebars/sidebars.component';
import { LazyImageComponent } from './components/lazy-image/lazy-image.component';



@NgModule({
  declarations: [
    SideBarsComponent,
    LazyImageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SideBarsComponent,
    LazyImageComponent
  ]
})
export class SharedModule { }
