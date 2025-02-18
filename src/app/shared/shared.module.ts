import { NgModule } from '@angular/core';
import { LoaderComponent } from './components/loader/loader.component';
import { CommonModule } from '@angular/common';
import { SuspiciousHighlightDirective } from './directives/suspicious-highlight.directive';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [LoaderComponent,NavbarComponent],
  imports: [CommonModule,SuspiciousHighlightDirective],
  exports: [LoaderComponent,CommonModule,SuspiciousHighlightDirective,NavbarComponent],
})
export class SharedModule {}
