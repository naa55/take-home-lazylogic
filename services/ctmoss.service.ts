import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../environment/environment';
import { Observable } from 'rxjs';
import { AddRole, UpdateRole } from '../src/types/AddRole';
import { GetRolesApiResponse } from '../src/types/GetRoles';


const config = new HttpHeaders({
  'Content-Type': 'application/json'
})

@Injectable({
  providedIn: 'root'
})
export class CtmossService {
  server = enviroment.baseURL;

  constructor(private http: HttpClient) { }

  getRoles(url: string): Observable<GetRolesApiResponse> {
    return this.http.get<GetRolesApiResponse>(`${this.server}${url}`).pipe((response) => response)
  }
  addRoles(url: string, payload: AddRole): Observable<any> {
    return this.http.post<any>(`${this.server}${url}`, payload, { headers: config })
  }
  updateRoles(url: string, payload: UpdateRole): Observable<any> {
    return this.http.put<any>(`${this.server}${url}`, payload, { headers: config })
  }
  deleteRoles(url: string): Observable<any> {
    return this.http.delete<any>(`${this.server}${url}`)
  }




}
