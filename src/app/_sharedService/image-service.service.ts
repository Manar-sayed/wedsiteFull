import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  private backendUrl = 'your_backend_api_url';

  constructor(private http: HttpClient) {}

  getImagePath(): Observable<any> {
    return this.http.get<any>(${this.backendUrl}/get-image-path);
  }}


