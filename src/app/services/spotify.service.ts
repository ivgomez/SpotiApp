import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(
    private http: HttpClient) { 
    console.log('sprotify Listo')
  }

  getQuery( query:string ){

    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization':'Bearer BQCesVlGS-9f0ztl6wkqyDE14V2DpJwNGzCRIUYjWjUPZUtsebUX6bMMk7Ysv72UEWpz0W_Vb9RMoHFRPVY'
    });

    return this.http.get( url, { headers });
  }

  getNewReleases(){

    return this.getQuery('browse/new-releases?limit=20')
            .pipe( map( data => data['albums'].items ));

  }

  getArtistas( termino: string ){

    return this.getQuery(`search?query=e${ termino }&type=artist&market=CO&offset=0&limit=15`)
    .pipe(map( data => data['artists'].items));
  }

  getArtista( id: string ){

    return this.getQuery(`artists/${ id }`);
    //.pipe(map( data => data['artists'].items));
  }

  getTopTracks( id: string ){
    return this.getQuery(`artists/${ id }/top-tracks?country=us`)
      .pipe( map( data => data['tracks']));
  }
  
}
