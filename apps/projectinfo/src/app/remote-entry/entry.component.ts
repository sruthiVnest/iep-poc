import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  imports: [CommonModule, NxWelcomeComponent],
  selector: 'copilot-iep-nx-projectinfo-entry',
  template: `<copilot-iep-nx-nx-welcome></copilot-iep-nx-nx-welcome>`,
})
export class RemoteEntryComponent {}
