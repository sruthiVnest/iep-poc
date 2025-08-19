import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@shared-utils/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  _tree = signal<any>('');
  public selectedProjects: WritableSignal<string[]> = signal([]);
  readonly tree = this._tree;
  public selectedFilters: WritableSignal<any[]> = signal([]);

  public setSelectedProjects(projects: string[]): void {
    this.selectedProjects.set(projects);
  }
  setTreeData(nodes: any) {
    let nodeArray: any[] = [];
    nodes.forEach((item: any) => {
      nodeArray.push(item.text);
    });
    this.tree.set(nodeArray.toString());
  }
  getTreeData = this.tree;
  getGridData(): Observable<any> {
    return this.http.get(this.apiUrl + 'getISPO');
  }
  getCurrentProjects(): Observable<any> {
    return this.http.get(this.apiUrl + 'getCurrentProjects');
  }
  getNCRData(): Observable<any> {
    return this.http.get(this.apiUrl + 'getNCRData');
  }
  getNCRDataBymonth(inputParam: any): Observable<any> {
    return this.http.post(this.apiUrl + 'getNCRDataBymonth', inputParam);
  }
  setFilterOptions(filterOptions: any) {
    this.selectedFilters.set([filterOptions]);
  }

  getFilterOptions(): any {
    return this.selectedFilters();
  }

  saveFilterOptions(filterOptions: any, filterName: any): Observable<any> {
    const filter = {
      name: filterName,
      option: filterOptions,
    };
    return this.http.post(this.apiUrl + 'saveFilter', filter);
  }

  getSearchOptions(): Observable<any> {
    return this.http.get(this.apiUrl + 'advancesearch');
  }
  getFilterList(): Observable<any> {
    return this.http.get(this.apiUrl + 'getFilterList');
  }
  getOtrDrData(): Observable<any> {
    return this.http.get(this.apiUrl + 'getotrdr');
  }
  getECNChartData(): Observable<any> {
    return this.http.get(this.apiUrl + 'getECNChart');
  }
  getECNData(): Observable<any> {
    return this.http.get(this.apiUrl + 'getECNData');
  }
  getECRData(): Observable<any> {
    return this.http.get(this.apiUrl + 'getECRData');
  }
  getECRRiskData(): Observable<any> {
    return this.http.get(this.apiUrl + 'getECRRiskData');
  }
  getECNdovsbuyData(): Observable<any> {
    return this.http.get(this.apiUrl + 'getECNdovsbuy');
  }
  getCurrentOffices(): Observable<any> { 
    return this.http.get(this.apiUrl + 'officeData');
  }
}
