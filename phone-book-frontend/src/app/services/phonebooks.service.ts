import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IContact } from '../types/types';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PhonebookService {
  private apiUrl = 'http://localhost:3000/api/phonebook';

  private contacts: IContact[] = [];

  constructor(private http: HttpClient) {}

  private getAuthHeader(): HttpHeaders {
    const token = localStorage.getItem('token');
    const parsedToken = token ? JSON.parse(token).token : '';
    return new HttpHeaders().set('Authorization', `Bearer ${parsedToken}`);
  }

  getAllPhonebooks(): Observable<IContact[]> {
    console.log('Getting all phoneboks...')
    const headers = this.getAuthHeader();
    return this.http
      .get<IContact[]>(this.apiUrl, { headers })
      .pipe(catchError(this.handleError));
  }

  createPhonebook(phonebook: IContact): Observable<IContact> {
    const headers = this.getAuthHeader().set('Content-Type', 'application/json');
    return this.http.post<IContact>(this.apiUrl, phonebook, { headers }).pipe(
      catchError(this.handleError),
      tap((newContact) => {
        this.contacts.push(newContact);
      })
    );
  }

  updatePhonebook(phonebook: IContact): Observable<IContact> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.apiUrl}/${phonebook._id}`;
    return this.http
      .put<IContact>(url, phonebook, { headers })
      .pipe(catchError(this.handleError));
  }

  deletePhonebook(id: string): Observable<IContact> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<IContact>(url).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred', error);
    return new Observable<never>(() => {});
  }
}
