import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ActivatedRouteSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { iif, Observable, of } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { CognitoToken } from './cognito-token.model';

@Injectable()
export class SecurityService {
  private cognitoToken: CognitoToken | null;

  constructor(private httpClient: HttpClient) {
    this.cognitoToken = null;
  }

  isAuthenticated(route: ActivatedRouteSnapshot): Observable<boolean> {
    return of(this.cognitoToken).pipe(
      mergeMap((accessToken) =>
        iif(
          () => !!accessToken,
          of(true),
          this.getAccessToken(route.queryParamMap.get('code'))
        )
      )
    );
  }

  redirectToLoginPage(): void {
    window.location.href = `${environment.awsCognitoConfig.loginEndpoint}\
?response_type=${environment.awsCognitoConfig.loginFlowType}\
&client_id=${environment.awsCognitoConfig.clientId}\
&redirect_uri=${environment.awsCognitoConfig.loginRedirectUri}`;
  }

  getAccessToken(authenticationCode: string | null): Observable<boolean> {
    if (authenticationCode) {
      const headers = new HttpHeaders()
        .append('Content-Type', 'application/x-www-form-urlencoded')
        .append(
          'Authorization',
          `Basic ${btoa(
            `${environment.awsCognitoConfig.clientId}:${environment.awsCognitoConfig.clientSecret}`
          )}`
        );

      const requestBody = new HttpParams()
        .set('code', authenticationCode)
        .set('grant_type', 'authorization_code')
        .set('redirect_uri', environment.awsCognitoConfig.loginRedirectUri);

      return this.httpClient
        .post(environment.awsCognitoConfig.tokenEndpoint, requestBody, {
          headers,
        })
        .pipe(
          tap((response) => console.log(response)),
          tap(getTokenResponse => this.cognitoToken = (getTokenResponse as CognitoToken)),
          map(() => true)
        );
    } else {
      return of(false).pipe(tap(() => this.redirectToLoginPage()));
    }
  }
}
