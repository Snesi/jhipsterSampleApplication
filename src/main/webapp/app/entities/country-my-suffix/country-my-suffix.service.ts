import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CountryMySuffix } from './country-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CountryMySuffix>;

@Injectable()
export class CountryMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/countries';

    constructor(private http: HttpClient) { }

    create(country: CountryMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(country);
        return this.http.post<CountryMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(country: CountryMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(country);
        return this.http.put<CountryMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CountryMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CountryMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<CountryMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CountryMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CountryMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CountryMySuffix[]>): HttpResponse<CountryMySuffix[]> {
        const jsonResponse: CountryMySuffix[] = res.body;
        const body: CountryMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CountryMySuffix.
     */
    private convertItemFromServer(country: CountryMySuffix): CountryMySuffix {
        const copy: CountryMySuffix = Object.assign({}, country);
        return copy;
    }

    /**
     * Convert a CountryMySuffix to a JSON which can be sent to the server.
     */
    private convert(country: CountryMySuffix): CountryMySuffix {
        const copy: CountryMySuffix = Object.assign({}, country);
        return copy;
    }
}
