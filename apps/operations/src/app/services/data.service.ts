import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { Observable } from "rxjs";
@Injectable({
    providedIn: 'root'
})
export class DataService {
    private apiUrl="http://localhost:3000/api/";
    constructor(private http:HttpClient){

    }
    _tree= signal<any>('');
    readonly tree=this._tree;
    setTreeData(nodes:any){
        let nodeArray: any[]=[]
        nodes.forEach((item:any)=>{
            nodeArray.push(item.text)
        })
        // Fix: set as array, not string
        this.tree.set(nodeArray);
    }
    getTreeData=this.tree;
    getGridData():Observable<any> {
        return this.http.get(this.apiUrl+'getISPO');
    }
    getCurrentProjects():Observable<any> {
        return this.http.get(this.apiUrl+'getCurrentProjects');
    }
}