import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { LocationMySuffix } from './location-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<LocationMySuffix>;

@Injectable()
export class LocationMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/locations';

    constructor(private http: HttpClient) { }

    create(location: LocationMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(location);
        return this.http.post<LocationMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(location: LocationMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(location);
        return this.http.put<LocationMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<LocationMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<LocationMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<LocationMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<LocationMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: LocationMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<LocationMySuffix[]>): HttpResponse<LocationMySuffix[]> {
        const jsonResponse: LocationMySuffix[] = res.body;
        const body: LocationMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to LocationMySuffix.
     */
    private convertItemFromServer(location: LocationMySuffix): LocationMySuffix {
        const copy: LocationMySuffix = Object.assign({}, location);
        return copy;
    }

    /**
     * Convert a LocationMySuffix to a JSON which can be sent to the server.
     */
    private convert(location: LocationMySuffix): LocationMySuffix {
        const copy: LocationMySuffix = Object.assign({}, location);
        return copy;
    }
}
