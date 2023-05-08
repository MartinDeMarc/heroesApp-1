import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../interfaces/hero.interface';
import {  Observable, catchError, map, of } from "rxjs";
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

  getSuggestions(query:string):Observable<Hero[]>{
    return this.httpClient.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`)
  }


  addHero(hero:Hero):Observable<Hero>  {
return this.httpClient.post<Hero>(`${this.baseUrl}/heroes`, hero);
  }   //addHero regresa un observable y un Hero al final con el id o con la data del objeto

  updateHero(hero:Hero):Observable<Hero>  {
    if (!hero.id) throw Error ("Hero id is required")
    return this.httpClient.post<Hero>(`${this.baseUrl}/{hero.id}`, hero);
      }

  deleteHeroById(id:string ):Observable<boolean>{
    return this.httpClient.delete(`${this.baseUrl}/{hero.id}`)
    .pipe(
      catchError(err => of(false) ),
      map( resp => true)
    )

  }
}
