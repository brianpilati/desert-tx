import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { FileModel } from '../../models/file.model';

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

  saveFile(data: FileModel): Observable<any> {
    return this.http.post(`${this.apiFileUploadUrl}`, data);
  }

  getFiles(): Observable<FileModel[]> {
    return this.http.get<FileModel[]>(`${this.apiFileUploadUrl}`).pipe(
      map(files => {
        return files.map( file => {
          file.fileName = 
          `https://s3.amazonaws.com/desert-tx/${file.fileName}`;
          return file;
        })
      })
    );
  }
}