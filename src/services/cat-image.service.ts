// cat-image.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CatImageResponse } from '../model/cat-image.model';  // Import the response model

@Injectable({
  providedIn: 'root',
})
export class CatImageService {
  private apiUrl = 'http://localhost:8080/api/cat-images';

  constructor(private http: HttpClient) {}

  // Fetch all images, updated to return Observable<CatImageResponse>
  getAllImages(): Observable<CatImageResponse> {
    return this.http.get<CatImageResponse>(this.apiUrl);
  }

  // Upload an image
  uploadImage(file: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, file);
  }

  // Populate images
  populateImages(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/populate`, {});
  }

  // Delete an image
  deleteImage(imageId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${imageId}`);
  }
}

