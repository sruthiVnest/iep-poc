import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


   private apiUrl="http://localhost:3000/api/";
    constructor(private http:HttpClient){

    }
    _tree= signal<any>('');
      public selectedProjects: WritableSignal<string[]> = signal([]);
    readonly tree=this._tree;
    public selectedFilters: WritableSignal<any[]> = signal([]);
    setTreeData(nodes:any){
        let nodeArray: any[]=[]
        nodes.forEach((item:any)=>{
            nodeArray.push(item.text)
        })
        this.tree.set(nodeArray.toString());
    }
    getTreeData=this.tree;
    getGridData():Observable<any> {
        return this.http.get(this.apiUrl+'getISPO');
    }
    getCurrentProjects():Observable<any> {
        return this.http.get(this.apiUrl+'getCurrentProjects');
    }
      getNCRData():Observable<any> {
        return this.http.get(this.apiUrl+'getNCRData');
    }
    setFilterOptions(filterOptions:any){
        this.selectedFilters.set([filterOptions]);
    }


    getFilterOptions():any {
        return this.selectedFilters();
    }
    saveFilterOptions(filterOptions:any):Observable<any> {
        return this.http.post(this.apiUrl+'saveFilter', filterOptions);
    }
    getFilterList():Observable<any> {
        return this.http.get(this.apiUrl+'getFilterList');
    }
}
