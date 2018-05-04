import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { JobHistoryMySuffix } from './job-history-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<JobHistoryMySuffix>;

@Injectable()
export class JobHistoryMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/job-histories';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(jobHistory: JobHistoryMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(jobHistory);
        return this.http.post<JobHistoryMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(jobHistory: JobHistoryMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(jobHistory);
        return this.http.put<JobHistoryMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<JobHistoryMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<JobHistoryMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<JobHistoryMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<JobHistoryMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: JobHistoryMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<JobHistoryMySuffix[]>): HttpResponse<JobHistoryMySuffix[]> {
        const jsonResponse: JobHistoryMySuffix[] = res.body;
        const body: JobHistoryMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to JobHistoryMySuffix.
     */
    private convertItemFromServer(jobHistory: JobHistoryMySuffix): JobHistoryMySuffix {
        const copy: JobHistoryMySuffix = Object.assign({}, jobHistory);
        copy.startDate = this.dateUtils
            .convertDateTimeFromServer(jobHistory.startDate);
        copy.endDate = this.dateUtils
            .convertDateTimeFromServer(jobHistory.endDate);
        return copy;
    }

    /**
     * Convert a JobHistoryMySuffix to a JSON which can be sent to the server.
     */
    private convert(jobHistory: JobHistoryMySuffix): JobHistoryMySuffix {
        const copy: JobHistoryMySuffix = Object.assign({}, jobHistory);

        copy.startDate = this.dateUtils.toDate(jobHistory.startDate);

        copy.endDate = this.dateUtils.toDate(jobHistory.endDate);
        return copy;
    }
}
