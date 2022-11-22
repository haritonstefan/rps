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

import { CreateMatchDto } from '../models/create-match-dto';
import { GameModel } from '../models/game-model';
import { MatchModel } from '../models/match-model';
import { SubmitMoveDto } from '../models/submit-move-dto';

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
   * Lists the possible game types
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `gameControllerListGames()` instead.
   *
   * This method doesn't expect any request body.
   */
  gameControllerListGames$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<GameModel>>> {

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
        return r as StrictHttpResponse<Array<GameModel>>;
      })
    );
  }

  /**
   * Lists the possible game types
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `gameControllerListGames$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  gameControllerListGames(params?: {
    context?: HttpContext
  }
): Observable<Array<GameModel>> {

    return this.gameControllerListGames$Response(params).pipe(
      map((r: StrictHttpResponse<Array<GameModel>>) => r.body as Array<GameModel>)
    );
  }

  /**
   * Path part for operation matchControllerGetUserMatches
   */
  static readonly MatchControllerGetUserMatchesPath = '/game/match';

  /**
   * Retrieves the list of matches where the user is involved.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matchControllerGetUserMatches()` instead.
   *
   * This method doesn't expect any request body.
   */
  matchControllerGetUserMatches$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<MatchModel>>> {

    const rb = new RequestBuilder(this.rootUrl, GameService.MatchControllerGetUserMatchesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<MatchModel>>;
      })
    );
  }

  /**
   * Retrieves the list of matches where the user is involved.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `matchControllerGetUserMatches$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  matchControllerGetUserMatches(params?: {
    context?: HttpContext
  }
): Observable<Array<MatchModel>> {

    return this.matchControllerGetUserMatches$Response(params).pipe(
      map((r: StrictHttpResponse<Array<MatchModel>>) => r.body as Array<MatchModel>)
    );
  }

  /**
   * Path part for operation matchControllerCreateMatch
   */
  static readonly MatchControllerCreateMatchPath = '/game/match';

  /**
   * Creates a new match.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matchControllerCreateMatch()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  matchControllerCreateMatch$Response(params: {
    context?: HttpContext
    body: CreateMatchDto
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, GameService.MatchControllerCreateMatchPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Creates a new match.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `matchControllerCreateMatch$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  matchControllerCreateMatch(params: {
    context?: HttpContext
    body: CreateMatchDto
  }
): Observable<void> {

    return this.matchControllerCreateMatch$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation matchControllerGetMatch
   */
  static readonly MatchControllerGetMatchPath = '/game/match/{id}';

  /**
   * Retrieves an existing match.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matchControllerGetMatch()` instead.
   *
   * This method doesn't expect any request body.
   */
  matchControllerGetMatch$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<MatchModel>> {

    const rb = new RequestBuilder(this.rootUrl, GameService.MatchControllerGetMatchPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MatchModel>;
      })
    );
  }

  /**
   * Retrieves an existing match.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `matchControllerGetMatch$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  matchControllerGetMatch(params: {
    id: string;
    context?: HttpContext
  }
): Observable<MatchModel> {

    return this.matchControllerGetMatch$Response(params).pipe(
      map((r: StrictHttpResponse<MatchModel>) => r.body as MatchModel)
    );
  }

  /**
   * Path part for operation matchControllerSubmitMove
   */
  static readonly MatchControllerSubmitMovePath = '/game/match/{id}';

  /**
   * Submit the player's move
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matchControllerSubmitMove()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  matchControllerSubmitMove$Response(params: {
    id: string;
    context?: HttpContext
    body: SubmitMoveDto
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, GameService.MatchControllerSubmitMovePath, 'post');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Submit the player's move
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `matchControllerSubmitMove$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  matchControllerSubmitMove(params: {
    id: string;
    context?: HttpContext
    body: SubmitMoveDto
  }
): Observable<void> {

    return this.matchControllerSubmitMove$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation matchControllerJoinMatch
   */
  static readonly MatchControllerJoinMatchPath = '/game/match/{id}';

  /**
   * Joins an existing match.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matchControllerJoinMatch()` instead.
   *
   * This method doesn't expect any request body.
   */
  matchControllerJoinMatch$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, GameService.MatchControllerJoinMatchPath, 'patch');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Joins an existing match.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `matchControllerJoinMatch$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  matchControllerJoinMatch(params: {
    id: string;
    context?: HttpContext
  }
): Observable<void> {

    return this.matchControllerJoinMatch$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation matchControllerGetJoinAbleMatches
   */
  static readonly MatchControllerGetJoinAbleMatchesPath = '/game/match/joinable';

  /**
   * Retrieves a list of matches that could be joined
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matchControllerGetJoinAbleMatches()` instead.
   *
   * This method doesn't expect any request body.
   */
  matchControllerGetJoinAbleMatches$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<MatchModel>>> {

    const rb = new RequestBuilder(this.rootUrl, GameService.MatchControllerGetJoinAbleMatchesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<MatchModel>>;
      })
    );
  }

  /**
   * Retrieves a list of matches that could be joined
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `matchControllerGetJoinAbleMatches$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  matchControllerGetJoinAbleMatches(params?: {
    context?: HttpContext
  }
): Observable<Array<MatchModel>> {

    return this.matchControllerGetJoinAbleMatches$Response(params).pipe(
      map((r: StrictHttpResponse<Array<MatchModel>>) => r.body as Array<MatchModel>)
    );
  }

}
