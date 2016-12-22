import {Injectable} from '@angular/core';
import {Hero} from './hero';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise'; 
// import {HEROES} from './mock-heroes';

@Injectable()
export class HeroService{
    private headers = new Headers({'content-type': 'application/json'});
    private heroesUrl = 'api/heroes'; //URL to web api

    constructor(private http: Http){}
    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl)
          .toPromise()
          .then(response => response.json().data as Hero[])
          .catch(this.handleError);
        // return Promise.resolve(HEROES).then(function(value){
        //   return Promise.resolve(value);
        // });
    }

    private handleError(error: any): Promise<any>{
      console.log('An error occurred', error); //for demo purpose only
      return Promise.reject(error.message || error);
    }

    getHeroesSlowly(): Promise<Hero[]> {
      return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.getHeroes()), 2000);
  });
  }

  getHero(id: number): Promise<Hero> {
    const url =  `${this.heroesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Hero)
      .catch(this.handleError);
      
    // return this.getHeroes()
    //   .then(heroes => heroes.find(hero => hero.id === id));
  }

  update(hero: Hero): Promise<Hero>{
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http.put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  create(name: string): Promise<Hero>{
    return this.http.post(this.heroesUrl, JSON.stringify({name: name}), {headers : this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url =  `${this.heroesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
}