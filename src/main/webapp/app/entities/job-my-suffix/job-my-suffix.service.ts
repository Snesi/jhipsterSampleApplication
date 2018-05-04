import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JobMySuffix } from './job-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<JobMySuffix>;

@Injectable()
export class JobMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/jobs';

    constructor(private http: HttpClient) { }

    create(job: JobMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(job);
        return this.http.post<JobMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(job: JobMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(job);
        return this.http.put<JobMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<JobMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<JobMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<JobMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<JobMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: JobMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<JobMySuffix[]>): HttpResponse<JobMySuffix[]> {
        const jsonResponse: JobMySuffix[] = res.body;
        const body: JobMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to JobMySuffix.
     */
    private convertItemFromServer(job: JobMySuffix): JobMySuffix {
        const copy: JobMySuffix = Object.assign({}, job);
        return copy;
    }

    /**
     * Convert a JobMySuffix to a JSON which can be sent to the server.
     */
    private convert(job: JobMySuffix): JobMySuffix {
        const copy: JobMySuffix = Object.assign({}, job);
        return copy;
    }
}
