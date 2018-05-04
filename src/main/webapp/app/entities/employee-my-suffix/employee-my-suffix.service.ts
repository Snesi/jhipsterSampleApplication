import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { EmployeeMySuffix } from './employee-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<EmployeeMySuffix>;

@Injectable()
export class EmployeeMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/employees';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(employee: EmployeeMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(employee);
        return this.http.post<EmployeeMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(employee: EmployeeMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(employee);
        return this.http.put<EmployeeMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<EmployeeMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<EmployeeMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<EmployeeMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<EmployeeMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: EmployeeMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<EmployeeMySuffix[]>): HttpResponse<EmployeeMySuffix[]> {
        const jsonResponse: EmployeeMySuffix[] = res.body;
        const body: EmployeeMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to EmployeeMySuffix.
     */
    private convertItemFromServer(employee: EmployeeMySuffix): EmployeeMySuffix {
        const copy: EmployeeMySuffix = Object.assign({}, employee);
        copy.hireDate = this.dateUtils
            .convertDateTimeFromServer(employee.hireDate);
        return copy;
    }

    /**
     * Convert a EmployeeMySuffix to a JSON which can be sent to the server.
     */
    private convert(employee: EmployeeMySuffix): EmployeeMySuffix {
        const copy: EmployeeMySuffix = Object.assign({}, employee);

        copy.hireDate = this.dateUtils.toDate(employee.hireDate);
        return copy;
    }
}
