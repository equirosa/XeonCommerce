import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../_models/config';
import { Observable, Subject } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private urlAPI = `${environment.apiUrl}/api/config`;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { }

  get(): Observable<Config[]> {
    return this.http.get<Config[]>(this.urlAPI);
  }

  getById(id: string): Observable<Config> {
    return this.http.get<Config>(this.urlAPI + `${id}`);
  }

  create(config: Config): any {
    return this.http.post(this.urlAPI, config);
  }

  update(config: Config): any {
    return this.http.put(this.urlAPI + '/' + config.id, config);
  }

  delete(id: string): any {
    return this.http.delete(this.urlAPI + '/' + `${id}`);
}
}
