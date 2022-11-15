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

import { LoginDto } from '../models/login-dto';
import { LoginResponseDto } from '../models/login-response-dto';
import { LoginValidateResponseDto } from '../models/login-validate-response-dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation authControllerLogin
   */
  static readonly AuthControllerLoginPath = '/auth/login';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authControllerLogin()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authControllerLogin$Response(params: {
    context?: HttpContext
    body: LoginDto
  }
): Observable<StrictHttpResponse<LoginResponseDto>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.AuthControllerLoginPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<LoginResponseDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `authControllerLogin$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authControllerLogin(params: {
    context?: HttpContext
    body: LoginDto
  }
): Observable<LoginResponseDto> {

    return this.authControllerLogin$Response(params).pipe(
      map((r: StrictHttpResponse<LoginResponseDto>) => r.body as LoginResponseDto)
    );
  }

  /**
   * Path part for operation authControllerValidate
   */
  static readonly AuthControllerValidatePath = '/auth/validate';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authControllerValidate()` instead.
   *
   * This method doesn't expect any request body.
   */
  authControllerValidate$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<LoginValidateResponseDto>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.AuthControllerValidatePath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<LoginValidateResponseDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `authControllerValidate$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  authControllerValidate(params?: {
    context?: HttpContext
  }
): Observable<LoginValidateResponseDto> {

    return this.authControllerValidate$Response(params).pipe(
      map((r: StrictHttpResponse<LoginValidateResponseDto>) => r.body as LoginValidateResponseDto)
    );
  }

}
