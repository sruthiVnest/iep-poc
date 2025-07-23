import {
  Component,
  effect,
  inject,
  ViewEncapsulation,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  KENDO_LAYOUT,
  KENDO_TABSTRIP,
  SelectEvent,
} from '@progress/kendo-angular-layout';
import {
  CheckableSettings,
  CheckMode,
  KENDO_TREEVIEW,
} from '@progress/kendo-angular-treeview';
import { filter, Observable, of } from 'rxjs';
import { starIcon } from '@progress/kendo-svg-icons';
import { KENDO_SVGICON } from '@progress/kendo-angular-icons';
import { KENDO_INPUTS } from '@progress/kendo-angular-inputs';
import { ApiService } from '@shared-service/data-service';
import { CommonModule } from '@angular/common';
import { KENDO_DROPDOWNS } from '@progress/kendo-angular-dropdowns';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'iep-filter-contract',
  standalone: true,
  imports: [
    KENDO_TABSTRIP,
    KENDO_TREEVIEW,
    KENDO_SVGICON,
    KENDO_INPUTS,
    KENDO_LAYOUT,
    KENDO_DROPDOWNS,
    CommonModule,
    FormsModule,
  ],

  templateUrl: './shared-ui-iep-filter-contract.component.html',
  styleUrl: './shared-ui-iep-filter-contract.component.scss',
})
export class SharedUiIepFilterContractComponent {
  public data: any = [];
  public expandedKeys: string[] = [];
  public myContracts: any = [];
  public favouriteProject: any = [];
  private dataService = inject(ApiService);
  public savedFIlteroptions: any;
  public filterlist: any[] = [];

  constructor() {
    this.dataService.getFilterList().subscribe(
      (data) => {
        this.filterlist = data.data;
        console.log('Filter list loaded:', this.filterlist);
      },
      (error) => {
        console.error('Error loading filter list:', error);
      }
    );
    this.dataService.getCurrentProjects().subscribe((data) => {
      this.data = data;
      this.filteredData = this.data;
      this.myContracts = this.data.filter(
        (item: any) => item.isMyContracts === 'True'
      );
      this.favouriteProject = this.data.filter(
        (item: any) => item.isFavourite === 'True'
      );
      // Expand all root nodes by default
      // this.expandedKeys = this.data.map((_: any, idx: number) =>
      //   idx.toString()
      // );
      // Set the first node as selected by default if available
      if (this.data && this.data.length > 0) {
        this.checkedKeys = ['0'];
        const selectedNode = this.data[0];
        const selectedText =
          selectedNode.contractName || selectedNode.trainName || '';
        if (selectedText) {
          this.dataService.selectedProjects.set([selectedText]);
          this.dataService.setTreeData([{ text: selectedText }]);
        }
      }
    });
  }

  public checkedKeys: string[] = ['0'];
  public filterTerm = '';
  public filteredData: any[] = [];
  public starIcon = starIcon;
  public enableCheck = true;
  public checkChildren = true;
  public checkDisabledChildren = false;
  public checkParents = true;
  public checkOnClick = false;
  public uncheckCollapsedChildren = false;
  public checkMode: CheckMode = 'multiple';
  public allChecked: boolean = false;
  public collapsed = false;
  public selectedProjects: WritableSignal<string[]> = signal([]);
  public favourites: any[] = [];
  public activeTabIndex = 0;
  public deliveryYears: string[] = ['2022', '2023', '2024', '2025','2000','2006','2010','1999'];
  public deliveryYearsFiltered:string[]=[];
  public racYears: string[] = ['2022', '2023', '2024', '2025'];
  public projectStatuses: string[] = ['Active', 'Completed', 'Pending'];
  public drivers: string[] = ['Driver A', 'Driver B', 'Driver C'];
  public connectors: string[] = ['Connector X', 'Connector Y', 'Connector Z'];
  public installationCountries: string[] = ['USA', 'Germany', 'India', 'UAE'];
  public emptyTagMapper = (item: any[]) => {
    return item.map(()=>null);
  };
  public selectYr:any;
  selectedDeliveryYears: string[] = [];
  selectedRacYears: string[] = [];
  selectedProjectStatuses: string[] = [];
  selectedDrivers: string[] = [];
  selectedConnectors: string[] = [];
  selectedInstallationCountries: string[] = [];

  public isAdvancedSearchExpanded = false;

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

  public children = (dataItem: any): Observable<any[]> =>
    of(dataItem.trains || dataItem.jobNumber);
  public hasChildren = (dataItem: any): boolean =>
    !!dataItem.trains || !!dataItem.jobNumber;
  onFilter(e: any) {
    return this.data.filter((o: any) =>
      Object.keys(o).some((k) =>
        o[k].toString().toLowerCase().includes(e.toLowerCase())
      )
    );
  }
  ngOnInit(){
    this.deliveryYearsFiltered=[...this.deliveryYears];
  }
  onNodeSelect(keys: any) {
    console.log(keys);
    this.checkedKeys = keys;
    const tree = this.activeTabIndex === 1 ? this.favourites : this.data;
    const fullNodes = this.getCheckedNodesByPaths(tree, this.checkedKeys);
    const selectedTexts = fullNodes.map((n: any) => n.contractName);
    this.dataService.selectedProjects.set(selectedTexts);
    this.dataService.setTreeData(selectedTexts.map((text) => ({ text })));
    this.dataService.setSelectedProjects(selectedTexts);
    console.log('Selected projects:', selectedTexts);
    // Update allChecked for current tab
    const allKeys = this.getAllNodeKeys(tree);
    this.allChecked =
      allKeys.length > 0 && allKeys.every((k) => this.checkedKeys.includes(k));
  }

  // Called when "Select All" checkbox is toggled
  onSelectAllChange(event: any): void {
    this.allChecked = event.target.checked;
    if (this.allChecked) {
      this.checkedKeys = this.getAllNodeKeys(this.data);
      // Also check all nodes in favourites if in Favourites tab
      if (this.activeTabIndex === 2) {
        this.checkedKeys = this.getAllNodeKeys(this.favourites);
      }
      const fullNodes = this.getCheckedNodesByPaths(
        this.activeTabIndex === 2 ? this.favourites : this.data,
        this.checkedKeys
      );
      const selectedTexts = fullNodes.map((n: any) => n.contractName);
      this.dataService.selectedProjects.set(selectedTexts);
    } else {
      this.checkedKeys = [];
      this.dataService.selectedProjects.set([]);
    }
  }
  addToFavourites(itemText: string) {
    // Recursively search for a node by trainName or contractName (including children)
    const findNodeAndParents = (
      nodes: any[],
      targetText: string,
      path: any[] = []
    ): any[] | null => {
      for (const node of nodes) {
        const newPath = [...path, node];
        if (node.trainName === targetText || node.contractName === targetText) {
          return newPath;
        }
        if (node.favourites && node.favourites.length > 0) {
          const result = findNodeAndParents(
            node.favourites,
            targetText,
            newPath
          );
          if (result) return result;
        }
      }
      return null;
    };

    // Deep clone a node and all its children
    const deepCloneNode = (node: any): any => {
      const { favourites, ...rest } = node;
      return {
        ...rest,
        ...(favourites && favourites.length > 0
          ? { favourites: favourites.map(deepCloneNode) }
          : {}),
      };
    };

    // Helper to merge a chain into the favourites tree without duplicating nodes
    const addChainToFavourites = (tree: any[], chain: any[]): any[] => {
      if (chain.length === 0) return tree;
      const [current, ...rest] = chain;
      let existing = tree.find(
        (n: any) =>
          (n.trainName && n.trainName === current.trainName) ||
          (n.contractName && n.contractName === current.contractName)
      );
      if (!existing) {
        existing = deepCloneNode(current);
        tree.push(existing);
      }
      if (rest.length > 0) {
        existing.favourites = addChainToFavourites(
          existing.favourites || [],
          rest
        );
      }
      return tree;
    };

    const chain = findNodeAndParents(this.data, itemText);
    if (!chain) return;

    // Only add the last node in the chain (the selected node and its children), but preserve parent structure
    const addSelectedNodeToFavourites = (tree: any[], chain: any[]): any[] => {
      if (chain.length === 1) {
        // Only the selected node, add if not present
        const selected = chain[0];
        let existing = tree.find(
          (n: any) =>
            (n.trainName && n.trainName === selected.trainName) ||
            (n.contractName && n.contractName === selected.contractName)
        );
        if (!existing) {
          tree.push(deepCloneNode(selected));
        }
        return tree;
      } else {
        // Recursively build the parent structure
        const [parent, ...rest] = chain;
        let existing = tree.find(
          (n: any) =>
            (n.trainName && n.trainName === parent.trainName) ||
            (n.contractName && n.contractName === parent.contractName)
        );
        if (!existing) {
          existing = { ...parent, favourites: [] };
          tree.push(existing);
        }
        existing.favourites = addSelectedNodeToFavourites(
          existing.favourites || [],
          rest
        );
        return tree;
      }
    };

    this.favourites = addSelectedNodeToFavourites([...this.favourites], chain);
  }
  public onTabSelect(e: SelectEvent): void {
    this.activeTabIndex = e.index;
    // Recalculate allChecked when switching tabs
    if (this.activeTabIndex === 0) {
      const allKeys = this.getAllNodeKeys(this.data);
      this.allChecked =
        allKeys.length > 0 &&
        allKeys.every((k) => this.checkedKeys.includes(k));
    } else if (this.activeTabIndex === 1) {
      const allKeys = this.getAllNodeKeys(this.favourites);
      this.allChecked =
        allKeys.length > 0 &&
        allKeys.every((k) => this.checkedKeys.includes(k));
    }
  }

  findCheckedNodeTexts(
    treeData: any[],
    checkedKeys: any[],
    checkKey = 'key'
  ): string[] {
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
  getNodeByPath(
    treeData: Array<{ favourites?: any[] }>,
    path: string
  ): any | null {
    const indexes = path.split('_').map((index) => +index);
    let node: any = null;
    let currentLevel: Array<{ favourites?: any[] }> = treeData;

    for (const idx of indexes) {
      if (!currentLevel || !currentLevel[idx]) return null;
      node = currentLevel[idx];
      currentLevel = node && node.favourites ? node.favourites : [];
    }

    return node;
  }

  getCheckedNodesByPaths(treeData: any[], checkedKeys: string[]): any[] {
    return checkedKeys
      .map((path) => this.getNodeByPath(treeData, path))
      .filter((node) => node !== null);
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
    // Emit an event or use a shared service to notify the parent (ISPO) to expand/collapse
    const event = new CustomEvent('filterProjectsCollapse', {
      detail: { collapsed: this.collapsed },
    });
    window.dispatchEvent(event);
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

  // Filter tree recursively by contractName or trainName, including children
  filterTree(tree: any[], term: string): any[] {
    if (!term) return tree;
    const lowerTerm = term.toLowerCase();
    return tree
      .map((node) => {
        let children = node.favourites
          ? this.filterTree(node.favourites, term)
          : [];
        const match =
          (node.contractName &&
            node.contractName.toLowerCase().includes(lowerTerm)) ||
          (node.trainName && node.trainName.toLowerCase().includes(lowerTerm));
        if (match || children.length > 0) {
          return {
            ...node,
            favourites: children,
          };
        }
        return null;
      })
      .filter(Boolean);
  }

  onFilterTermChange(term: string) {
    this.filterTerm = term;
    this.filteredData = this.filterTree(this.data, term);
  }

  public clearAdvanceFilters() {
    this.selectedDeliveryYears = [];
    this.selectedRacYears = [];
    this.selectedProjectStatuses = [];
    this.selectedDrivers = [];
    this.selectedConnectors = [];
    this.selectedInstallationCountries = [];
  }

  showFilterOptions() {}
  filterMenuOpen = false;
  activeSubMenu: string | null = null;
  lastUploadedDate = '2025-06-10';
  lastUploadedBy = 'Jane Doe';

  toggleFilterMenu(event: MouseEvent) {
    event.stopPropagation();
    this.filterMenuOpen = !this.filterMenuOpen;
    if (this.filterMenuOpen) {
      document.addEventListener('click', this.closeFilterMenuOnOutsideClick);
    } else {
      document.removeEventListener('click', this.closeFilterMenuOnOutsideClick);
    }
  }

  closeFilterMenuOnOutsideClick = () => {
    this.filterMenuOpen = false;
    this.activeSubMenu = null;
    document.removeEventListener('click', this.closeFilterMenuOnOutsideClick);
  };

  exportContract(type: string) {
    // Implement export logic here
    this.filterMenuOpen = false;
    this.activeSubMenu = null;
  }
  saveFilter() {
    // Implement save filter logic here
    this.savedFIlteroptions = {
      deliveryYears: this.selectedDeliveryYears,
      racYears: this.selectedRacYears,
      projectStatuses: this.selectedProjectStatuses,
      drivers: this.selectedDrivers,
      connectors: this.selectedConnectors,
      installationCountries: this.selectedInstallationCountries,
    };
    // this.dataService.setFilterOptions(this.savedFIlteroptions);;
    this.dataService.saveFilterOptions(this.savedFIlteroptions).subscribe(
      (response) => {
        console.log('Filter saved successfully:', response);
        this.dataService.getFilterList().subscribe((data) => {
          this.filterlist = data.data;
        });
      },
      (error) => {
        console.error('Error saving filter:', error);
      }
    );
    this.filterMenuOpen = false;
    this.activeSubMenu = null;
  }
  loadFilter(filter: any) {
    // Implement load filter logic here
    this.filterMenuOpen = false;
    this.activeSubMenu = null;
    this.savedFIlteroptions = filter;
    // this.savedFIlteroptions = this.dataService.getFilterOptions();
    if (this.savedFIlteroptions) {
      this.selectedDeliveryYears = this.savedFIlteroptions?.deliveryYears || [];
      this.selectedRacYears = this.savedFIlteroptions?.racYears || [];
      this.selectedProjectStatuses =
        this.savedFIlteroptions?.projectStatuses || [];
      this.selectedDrivers = this.savedFIlteroptions?.drivers || [];
      this.selectedConnectors = this.savedFIlteroptions?.connectors || [];
      this.selectedInstallationCountries =
        this.savedFIlteroptions?.installationCountries || [];
    }
  }

  // Utility to get selected values as a string for display
  getSelectedValuesText(values: string[]): string {
    return values && values.length > 0 ? values.join(', ') : '';
  }
  deselect(e:any) {
    e.preventDefault();
    e.stopPropagation();
    this.selectedDeliveryYears = [];
    this.selectedRacYears = [];
    this.selectedProjectStatuses = [];
    this.selectedDrivers = [];
    this.selectedConnectors = [];
    this.selectedInstallationCountries = [];
  }
    onUserSearch(term: string) {
    const lower = term.toLowerCase();
    if(lower!=null)
      this.deliveryYearsFiltered = this.deliveryYears.filter(u => u.toLowerCase().includes(lower));
  }
    toggleUserSelection(user: string) {
    const idx = this.selectedDeliveryYears.indexOf(user);
    if (idx > -1) {
      this.selectedDeliveryYears.splice(idx, 1);
    } else {
      this.selectedDeliveryYears.push(user);
    }
  }

  isUserSelected(user: string): boolean {
    return this.selectedDeliveryYears.includes(user);
  }

}
