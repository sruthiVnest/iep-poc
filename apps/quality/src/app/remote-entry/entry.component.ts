import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule,RouterModule],
  selector: 'copilot-iep-nx-quality-entry',
  template: `<router-outlet></router-outlet>`,
})
export class RemoteEntryComponent {}
