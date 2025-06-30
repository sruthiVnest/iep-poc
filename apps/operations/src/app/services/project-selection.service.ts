import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProjectSelectionService {
  public selectedProjects: WritableSignal<string[]> = signal([]);

  public setSelectedProjects(projects: string[]): void {
    this.selectedProjects.set(projects);
  }
}
