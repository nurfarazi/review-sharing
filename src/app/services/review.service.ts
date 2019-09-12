import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) {
  }

  insert(data) {
    return this.http.post<any>('/api/reviews', data);
  }

  fetch(): Observable<any> {
    return this.http.get('/api/reviews').pipe();
  }

  vote(id, vote): Observable<any> {
    return this.http.put(`/api/reviews/${id}/vote`, vote);
  }
}
