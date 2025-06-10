import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  imports: [CommonModule, RouterModule],
  standalone: true,
  selector: 'copilot-iep-nx-operations-entry',
  template: `<router-outlet></router-outlet>`,
})
export class RemoteEntryComponent {}
