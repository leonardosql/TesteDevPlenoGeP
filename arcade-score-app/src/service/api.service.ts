import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Player } from '../model/player';
import { Match } from '../model/match';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const API = 'https://localhost:44365/api';
const PLAYER_API = `${API}/Player`;
const RANKING_API = `${API}/Ranking`;
const REGISTERSCORE_API = `${API}/RegisterScore`;


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  getAllPlayers (): Observable<Player[]> {
    return this.http.get<Player[]>(PLAYER_API)
      .pipe(
        tap(players => console.log('trouxe todos players')),
        catchError(this.handleError('getAllPlayers', []))
      );
  }

  getPlayer(id: number): Observable<Player> {
    const url = `${PLAYER_API}/${id}`;
    return this.http.get<Player>(url).pipe(
      tap(_ => console.log('trouxe o Player id=${id}')),
      catchError(this.handleError<Player>('getPlayer id=${id}'))
    );
  }

  getRankingList (): Observable<Player[]> {
    return this.http.get<Player[]>(RANKING_API)
      .pipe(
        tap(ranking => console.log('trouxe ranking de players')),
        catchError(this.handleError('getRankingList', []))
      );
  }

  registerScore (match): Observable<Match> {
    return this.http.post<Match>(REGISTERSCORE_API, match, httpOptions).pipe(
      tap((match: Match) => console.log('registrou score com w/ id=${match.Id}')),
      catchError(this.handleError<Match>('registerScore'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
