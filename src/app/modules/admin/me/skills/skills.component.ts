import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { I18nPluralPipe, NgClass, NgFor, NgIf, PercentPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FuseFindByKeyPipe } from '@fuse/pipes/find-by-key/find-by-key.pipe';
import { BehaviorSubject, combineLatest, Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports        : [CdkScrollable, MatFormFieldModule, MatSelectModule, MatOptionModule, NgFor, MatIconModule, MatInputModule, MatSlideToggleModule, NgIf, NgClass, MatTooltipModule, MatProgressBarModule, MatButtonModule, RouterLink, FuseFindByKeyPipe, PercentPipe, I18nPluralPipe],

})
export class SkillsComponent implements OnInit {

  sanitizedIframeUrl: SafeHtml | null = null;

  urlCredly: SafeResourceUrl = "https://www.credly.com";
  urlEmbed: SafeResourceUrl = "//cdn.credly.com/assets/utilities/embed.js";
  constructor(private sanitizer: DomSanitizer) { }
  iframeContent = "";

  ngOnInit() {
   
  }

}
