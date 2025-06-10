import { Component } from '@angular/core';
import { DrawerModule, DrawerSelectEvent } from '@progress/kendo-angular-layout';
import { Router, RouterModule } from '@angular/router';
import { IepHeaderComponent } from '../common/iep-header/iep-header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, DrawerModule, IepHeaderComponent,CommonModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
public items: Array<{ text: string; route: string; icon: string }>
    = [
      { text: 'Dashboard', icon:'widget_small' , route: '/dashboard' },
      { text: 'Settings', icon: 'folder', route: '/dashboard' },
      { text: 'Scheduler', icon: 'Settings', route: '/dashboard' }
    ];
  public selected = '/dashboard';
  public drawerOpened = false;
  public filterCollapsed = false;

  constructor(private router: Router) {}

  onSelect(ev: DrawerSelectEvent) {
    this.selected = ev.item.route;
    this.router.navigate([ev.item.route]);
  }

  onLogout() {
    localStorage.removeItem('auth_token');
    this.router.navigate(['/login']);
  }

  onDrawerToggle() {
    this.drawerOpened = !this.drawerOpened;
  }


}
