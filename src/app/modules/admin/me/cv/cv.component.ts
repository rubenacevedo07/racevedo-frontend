import { Component, ViewEncapsulation } from '@angular/core';
import { FuseLoadingService } from '@fuse/services/loading';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true
})
export class CVComponent {
  pdfLoaded = false;
  /**
   * Constructor
   */
  constructor(private _fuseLoadingService: FuseLoadingService) { }

  ngOnInit() {
    this._fuseLoadingService.show();
    const pdfObject = document.querySelector('.pdf') as HTMLObjectElement;
    pdfObject.onload = () => {
      this.pdfLoaded = true;
      this._fuseLoadingService.hide();
    };
  }
}
