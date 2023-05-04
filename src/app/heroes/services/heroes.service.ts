import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../interfaces/hero.interface';
import {  Observable, catchError, of } from "rxjs";
import { environments } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class HeroesService {

private baseUrl: string = environments.baseUrl;

  constructor(private httpClient: HttpClient) { }


  getHeroes():Observable<Hero[]>{
    return this.httpClient.get<Hero[]>(`${this.baseUrl}/heroes`);     //myentpoint http

  }

  getHeroById( id:string):Observable<Hero | undefined>  {
    return this.httpClient.get<Hero>(`${this.baseUrl}/heroes/${id}`)
    .pipe( catchError(error => of(undefined)));
  }

  queetSuggestion(query:string):Observable<Hero[]>{
    return this.httpClient.get<Hero[]>(`/heroes/q=${query}&_limit=6`)
  }
}
