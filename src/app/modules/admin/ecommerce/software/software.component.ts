import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'software',
  templateUrl: './software.component.html',
  styleUrls: ['./software.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [MatIconModule, RouterLink, MatButtonModule, MatTabsModule],
})
export class SoftwareComponent {
  /**
   * Constructor
   */
  
  constructor() {
  }
}
