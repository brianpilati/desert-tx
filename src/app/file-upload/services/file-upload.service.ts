import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private apiFileUploadUrl = 'http://localhost:3000/api/file-upload'; 

  constructor(
    private http: HttpClient
  ) {}

  uploadFile(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/upload-photos`, data);
  }

  saveFile(data: any): Observable<any> {
    return this.http.post(`${this.apiFileUploadUrl}`, data);
  }
}