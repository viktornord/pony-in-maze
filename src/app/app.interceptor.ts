import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AppInterceptor implements HttpInterceptor  {
  static BASE_URL = 'https://ponychallenge.trustpilot.com/pony-challenge';

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({url: `${AppInterceptor.BASE_URL}${req.url}`});

    return next.handle(modifiedReq);
  }

}
