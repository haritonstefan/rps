/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Game } from '../models/game';

@Injectable({
  providedIn: 'root',
})
export class GameService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation gameControllerListGames
   */
  static readonly GameControllerListGamesPath = '/game';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `gameControllerListGames()` instead.
   *
   * This method doesn't expect any request body.
   */
  gameControllerListGames$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Game>> {

    const rb = new RequestBuilder(this.rootUrl, GameService.GameControllerListGamesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Game>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `gameControllerListGames$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  gameControllerListGames(params?: {
    context?: HttpContext
  }
): Observable<Game> {

    return this.gameControllerListGames$Response(params).pipe(
      map((r: StrictHttpResponse<Game>) => r.body as Game)
    );
  }

}
