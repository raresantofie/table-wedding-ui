import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AggregatedTableDto, Table} from './model';
import {Observable} from 'rxjs';
import {TaskLogger} from 'protractor/built/taskLogger';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  API = 'https://rares-wedding-backend.herokuapp.com/';

  constructor(private httpClient: HttpClient) { }

  create(table: Table): void {
    console.log('creating...');
    this.httpClient.post(this.API, table).subscribe(response => {
      console.log(response);
    });
  }

  getByName(name: string): Observable<Table[]> {
    return this.httpClient.get<Table[]>(this.API + 'search?name=' + name);
  }

  update(obj: any): Observable<Table> {
    console.log(obj);
    return this.httpClient.put<Table>(this.API, obj);
  }

  getAll(): Observable<AggregatedTableDto[]> {
    return this.httpClient.get<AggregatedTableDto[]>(this.API + 'all');
  }

}
