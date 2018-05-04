import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TaskMySuffix } from './task-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TaskMySuffix>;

@Injectable()
export class TaskMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/tasks';

    constructor(private http: HttpClient) { }

    create(task: TaskMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(task);
        return this.http.post<TaskMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(task: TaskMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(task);
        return this.http.put<TaskMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TaskMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TaskMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<TaskMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TaskMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TaskMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TaskMySuffix[]>): HttpResponse<TaskMySuffix[]> {
        const jsonResponse: TaskMySuffix[] = res.body;
        const body: TaskMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TaskMySuffix.
     */
    private convertItemFromServer(task: TaskMySuffix): TaskMySuffix {
        const copy: TaskMySuffix = Object.assign({}, task);
        return copy;
    }

    /**
     * Convert a TaskMySuffix to a JSON which can be sent to the server.
     */
    private convert(task: TaskMySuffix): TaskMySuffix {
        const copy: TaskMySuffix = Object.assign({}, task);
        return copy;
    }
}
