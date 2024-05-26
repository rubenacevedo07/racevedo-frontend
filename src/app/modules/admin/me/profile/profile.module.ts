import { NgModule, Component, ElementRef, Renderer2 } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { TextFieldModule } from '@angular/cdk/text-field';
import { NgClass } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { FuseCardComponent } from '@fuse/components/card';
import { ProfileComponent } from './profile.component';
import { SkillsComponent } from './../skills/skills.component';
import { CertificationsComponent } from './../certifications/certifications.component';
import { CVComponent } from './../cv/cv.component';
import { ContactComponent } from './../contact/contact.component';


const profileRoutes: Route[] = [
  {
      path     : '',
      component: ProfileComponent
  }
];

@NgModule({
    declarations: [
      ProfileComponent
    ],
    imports     : [
        RouterModule.forChild(profileRoutes),
        CVComponent, RouterLink, ContactComponent, CertificationsComponent, SkillsComponent, NgIf, FuseCardComponent, MatIconModule, MatButtonModule, MatMenuModule, MatFormFieldModule, MatInputModule, TextFieldModule, MatDividerModule, MatTooltipModule, NgClass
    ]
})
export class ProfileModule
{
}
