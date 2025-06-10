import { Component, effect, inject, ViewEncapsulation, signal, WritableSignal } from '@angular/core';
import { KENDO_LAYOUT, KENDO_TABSTRIP, SelectEvent } from '@progress/kendo-angular-layout';
import { CheckableSettings, CheckMode, KENDO_TREEVIEW } from '@progress/kendo-angular-treeview';
import { filter, Observable, of } from 'rxjs';
import { starIcon } from '@progress/kendo-svg-icons';
import { KENDO_SVGICON } from '@progress/kendo-angular-icons';
import { KENDO_INPUTS } from '@progress/kendo-angular-inputs';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { ProjectSelectionService } from '../../services/project-selection.service';
@Component({
  selector: 'app-filter-projects',
  standalone: true,
  templateUrl: './filter-projects.component.html',
  styleUrls: ['./filter-projects.component.scss'],
  imports:[KENDO_TABSTRIP, KENDO_TREEVIEW, KENDO_SVGICON, KENDO_INPUTS, KENDO_LAYOUT,CommonModule]
})
export class FilterProjectsComponent {
public data: any = [];
private dataService = inject(DataService);
private projectSelectionService = inject(ProjectSelectionService);
constructor() {
  this.dataService.getCurrentProjects().subscribe((data) => {
    this.data = data[0]?.data?.favourites;
  });
}

  public checkedKeys: string[] = [];
  public filterTerm = "";
  public starIcon = starIcon;
  public enableCheck = true;
  public checkChildren = true;
  public checkDisabledChildren = false;
  public checkParents = true;
  public checkOnClick = false;
  public uncheckCollapsedChildren = false;
  public checkMode: CheckMode = "multiple";
  public allChecked: boolean = false;
  public collapsed = false;
  public selectedProjects: WritableSignal<string[]> = signal([]);
  public favourites: any[] = [];
  public get checkableSettings(): CheckableSettings {
    return {
      checkChildren: this.checkChildren,
      checkDisabledChildren: this.checkDisabledChildren,
      checkParents: this.checkParents,
      enabled: this.enableCheck,
      mode: this.checkMode,
      checkOnClick: this.checkOnClick,
      uncheckCollapsedChildren: this.uncheckCollapsedChildren,
    };
  }

    public children = (dataItem: any): Observable<any[]> => of(dataItem.favourites);
    public hasChildren = (dataItem: any): boolean => !!dataItem.favourites;
    onFilter(e: any) {
      return this.data.filter((o: any) =>
        Object.keys(o).some((k) =>
          o[k].toString().toLowerCase().includes(e.toLowerCase())
        )
      );
    };

  onNodeSelect(keys: any) {
    this.checkedKeys = keys;
    const fullNodes = this.getCheckedNodesByPaths(this.data, keys);
    const selectedTexts = fullNodes.map((n: any) => n.groupName ? n.groupName : n.contractName);
  
    this.projectSelectionService.selectedProjects.set(selectedTexts);
    this.dataService.setTreeData(selectedTexts.map(text => ({ text })));


  }
  
  // Called when "Select All" checkbox is toggled
  onSelectAllChange(event: any): void {
    this.allChecked = event.target.checked;
    if (this.allChecked) {
      this.checkedKeys = this.getAllNodeKeys(this.data);
        const fullNodes = this.getCheckedNodesByPaths(this.data, this.checkedKeys);
    const selectedTexts = fullNodes.map((n: any) => n.groupName ? n.groupName : n.contractName);
  
    this.projectSelectionService.selectedProjects.set(selectedTexts);
    } else {
      this.checkedKeys = [];
        this.projectSelectionService.selectedProjects.set([]);
    }
  }
  addToFavourites(itemText: string) {
    // Find the node and its parent chain in the tree
    const findNodeAndParents = (nodes: any[], targetText: string, path: any[] = []): any[] | null => {
      for (const node of nodes) {
        const newPath = [...path, node];
        if (node.text === targetText) {
          return newPath;
        }
        if (node.favourites && node.favourites.length > 0) {
          const result = findNodeAndParents(node.favourites, targetText, newPath);
          if (result) return result;
        }
      }
      return null;
    };
    const chain = findNodeAndParents(this.data, itemText);
    if (!chain) return;
    // Add to favourites tree, preserving parent structure
    const addToFavouritesTree = (tree: any[], chain: any[]): any[] => {
      if (chain.length === 0) return tree;
      const [current, ...rest] = chain;
      let existing = tree.find((n: any) => n.text === current.text);
      if (!existing) {
        existing = { ...current, favourites: [] };
        tree.push(existing);
      }
      existing.favourites = addToFavouritesTree(existing.favourites, rest);
      return tree;
    };
    this.favourites = addToFavouritesTree([...this.favourites], chain);
  }
  public onTabSelect(e: SelectEvent): void {
    console.log(e);

  }

  findCheckedNodeTexts(treeData: any[], checkedKeys: any[], checkKey = 'key'): string[] {
    const result: string[] = [];

    const traverse = (nodes: any[]) => {
      for (const node of nodes) {
        if (checkedKeys.includes(node[checkKey])) {
          result.push(node.text);
        }
        if (node.favourites && node.favourites.length > 0) {
          traverse(node.favourites);
        }
      }
    };

    traverse(treeData);
    return result;
  }
  getNodeByPath(treeData: any[], path: string): any | null {
    const indexes = path.split('_').map(index => +index);
    let node = null;
    let currentLevel = treeData;

    for (const idx of indexes) {
      if (!currentLevel || !currentLevel[idx]) return null;
      node = currentLevel[idx];
      currentLevel = node.favourites || [];
    }

    return node;
  }

  getCheckedNodesByPaths(treeData: any[], checkedKeys: string[]): any[] {
    return checkedKeys
      .map(path => this.getNodeByPath(treeData, path))
      .filter(node => node !== null);
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }

  getAllNodeKeys(treeData: any[]): string[] {
    const keys: string[] = [];
    const traverse = (nodes: any[], path: string = '') => {
      nodes.forEach((node, idx) => {
        const currentPath = path ? `${path}_${idx}` : `${idx}`;
        keys.push(currentPath);
        if (node.favourites && node.favourites.length > 0) {
          traverse(node.favourites, currentPath);
        }
      });
    };
    traverse(treeData);
    return keys;
  }
}
