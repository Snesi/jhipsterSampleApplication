import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { RegionMySuffix } from './region-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<RegionMySuffix>;

@Injectable()
export class RegionMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/regions';

    constructor(private http: HttpClient) { }

    create(region: RegionMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(region);
        return this.http.post<RegionMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(region: RegionMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(region);
        return this.http.put<RegionMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<RegionMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<RegionMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<RegionMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RegionMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RegionMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<RegionMySuffix[]>): HttpResponse<RegionMySuffix[]> {
        const jsonResponse: RegionMySuffix[] = res.body;
        const body: RegionMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to RegionMySuffix.
     */
    private convertItemFromServer(region: RegionMySuffix): RegionMySuffix {
        const copy: RegionMySuffix = Object.assign({}, region);
        return copy;
    }

    /**
     * Convert a RegionMySuffix to a JSON which can be sent to the server.
     */
    private convert(region: RegionMySuffix): RegionMySuffix {
        const copy: RegionMySuffix = Object.assign({}, region);
        return copy;
    }
}
