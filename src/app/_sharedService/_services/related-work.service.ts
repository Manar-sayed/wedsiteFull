import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RelatedWork } from '../_models/related-work';

@Injectable({
  providedIn: 'root',
})
export class RelatedWorkService {
  constructor(public http: HttpClient) {}

  private apiUrl =
    'http://companymoasassah.somee.com/AdminECommerce/RelatedWork';

  token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJob3NzYW0uZmF0aGlAQnJhaW55U29mLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiYTM5MjkwMGEtMDUzNS00Y2ZkLWJkZTAtMWEyYTU2OWNiZTMzIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3MDU2OTczOTQsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcwMzYvIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzAzNi8ifQ.vZcy-Dj7cbVZdHUhejKNePLIAPLrmzXRyM0heF0JJio';

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
  }

  getAllRelatedWork(index?: number, size?: number): Observable<any> {
    const url = `${this.apiUrl}/GetAll?index=${index}&size=${size}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  getAllProduct(index?: number, size?: number): Observable<any> {
    const url = `http://companymoasassah.somee.com/Admin/ECommerce/Product/GetAll?index=${index}&size=${size}&message=${this.token}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  getById(id: any) {
    // http://companymoasassah.somee.com/Admin/ECommerce/Category/Get?ID=1
    return this.http.get<RelatedWork>(`${this.apiUrl}/get/${id}`);
  }

  deleteById(id: Number) {
    const url = `${this.apiUrl}/delete/${id}`;

    return this.http.delete(url, {
      headers: this.getHeaders(),
    });
  }

  create(data: RelatedWork): Observable<any> {
    const url = `${this.apiUrl}/add`;
    const formData = new FormData();
    if (data.id !== undefined && data.id !== null) {
      formData.append('ID', data.id.toString());
    }
    formData.append('Name', data.name);
    formData.append('ArabicName', data.arabicName);
    formData.append('Describtion', data.describtion);
    formData.append('ArabicDescribtion', data.arabicDescribtion);
    formData.append('ImageOrFile', data.imageOrFile);
    formData.append('ProductId', data.productId.toString());

    return this.http.post(url, formData, { headers: this.getHeaders() });
  }

  updateRelatedWork(id: number, relatedWork: RelatedWork): Observable<any> {
    const url = `${this.apiUrl}/Update/${id}`;
    const formData = new FormData();
    if (relatedWork.id !== undefined && relatedWork.id !== null) {
      formData.append('ID', relatedWork.id);
    }
    formData.append('Name', relatedWork.name);
    formData.append('ArabicName', relatedWork.arabicName);
    formData.append('Describtion', relatedWork.describtion);
    formData.append('ArabicDescribtion', relatedWork.arabicDescribtion);
    formData.append('ImageOrFile', relatedWork.imageOrFile);
    formData.append('ProductId', relatedWork.productId);

    return this.http.put(url, formData, { headers: this.getHeaders() });
  }
}
