import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
  standalone:false
})
export class LoaderComponent {
  @Input() progress: number = 0;
}
