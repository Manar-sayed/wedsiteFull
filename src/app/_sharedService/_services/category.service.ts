import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../_models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(public http: HttpClient) {}
  mainApi = environment.apiUrl;
  private apiUrl = `${this.mainApi}/Admin/ECommerce/Category`;

  token = environment.token;

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
  }

  getAllCategory(
    language: string,
    index?: number,
    size?: number
  ): Observable<any> {
    const url = `${this.mainApi}/${language}/ECommerce/Category/GetAll?index=${index}&size=${size}&message=${this.token}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }
  getById(id: any) {
    // http://companymoasassah.somee.com/Admin/ECommerce/Category/Get?ID=1
    return this.http.get<Category>(`${this.apiUrl}/Get?ID=${id}`);
  }

  deleteById(id: Number) {
    return this.http.delete(`${this.apiUrl}/Delete/${id}`, {
      headers: this.getHeaders(),
    });
  }

  create(data: Category): Observable<any> {
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

    return this.http.post(url, formData, { headers: this.getHeaders() });
  }

  updatecategory(id: number, product: Category): Observable<any> {
    const url = `${this.apiUrl}/Update/${id}`;
    const formData = new FormData();
    if (product.id !== undefined && product.id !== null) {
      formData.append('ID', product.id.toString());
    }
    formData.append('Name', product.name);
    formData.append('ArabicName', product.arabicName);
    formData.append('Describtion', product.describtion);
    formData.append('ArabicDescribtion', product.arabicDescribtion);
    formData.append('ImageOrFile', product.imageOrFile);

    return this.http.put(url, formData, { headers: this.getHeaders() });
  }
}
