import { Component, EventEmitter, Output } from '@angular/core';
import { DrawerModule, DrawerSelectEvent } from '@progress/kendo-angular-layout';
import { Router, RouterModule } from '@angular/router';
import { IepHeaderComponent } from '../iep-header/iep-header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, DrawerModule, IepHeaderComponent,CommonModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  @Output() dashboardExpandChange = new EventEmitter<boolean>();
public items: Array<{ text: string; route: string; icon: string }>
    = [
      { text: '', icon:'network_node' , route: '#' },
      { text: 'Dashboard', icon:'widget_small' , route: '/dashboard' },
      { text: 'Dashboard', icon:'folder_managed' , route: '/dashboard' },
      { text: 'Dashboard', icon:'folder' , route: '/dashboard' },
      { text: 'Quality', icon: 'verified', route: '/quality-dashboard' },
       { text: 'engineering', icon:'engineering' , route: '/quality-dashboard' },
      { text: 'Scheduler', icon: 'Settings', route: '/dashboard' }
    ];
  public selected = '/dashboard';
  public drawerOpened = false;
  public filterCollapsed = false;

  constructor(private router: Router) {}

  onSelect(ev: DrawerSelectEvent) {
    this.selected = ev.item.route;
  if( ev.item.route === '#') {
      this.dashboardExpandChange.emit(!this.filterCollapsed);
            const event = new CustomEvent('filterProjectsCollapse', { detail: { collapsed: false } });
    window.dispatchEvent(event);

  }
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
