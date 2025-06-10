import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppBarModule } from '@progress/kendo-angular-navigation';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { Router } from '@angular/router';

@Component({
  selector: 'iep-header',
  standalone: true,
  imports: [AppBarModule, ButtonModule],
  templateUrl: './iep-header.component.html',
  styleUrls: ['./iep-header.component.scss']
})
export class IepHeaderComponent {
  constructor(private router: Router) {}
  @Output() logout = new EventEmitter<void>();
  @Input() drawerOpened = true;
  @Output() drawerToggle = new EventEmitter<void>();
 
  onLogout() {
    this.logout.emit();
  }
  toggleDrawer() {
    this.drawerToggle.emit();
  }
}
