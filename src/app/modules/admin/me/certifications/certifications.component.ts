import { Component, ViewEncapsulation } from '@angular/core';
import { FuseCardComponent } from '@fuse/components/card';

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone   : true,
  imports        : [FuseCardComponent]
})
export class CertificationsComponent {

}
