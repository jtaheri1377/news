import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { TreeNode } from '../models/treeNode.model';
import { url } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class AdminProvinceService {
  Url = environment.ApiEndPoint;
  editingProvince$ = new BehaviorSubject<number | null>(null);
  constructor(private http: HttpClient) {}

  // save(body: NewsSave) {
  //   return this.http.post(`${this.Url}news/save`, body);
  // }

  getTree(): Observable<TreeNode[]> {
    return this.http.get<TreeNode[]>(`${this.Url}province/GetTree`);
  }

  ProvincesUpdate$: BehaviorSubject<TreeNode | null> = new BehaviorSubject<TreeNode | null>(
    null
  );

  getAll(): Observable<HttpResponse<TreeNode[]>> {
    return this.http.get<TreeNode[]>(
      `${this.Url}Book/GetAllSubjects`,
      {
        observe: "response",
      }
    );
  }

  delete(id:number): Observable<HttpResponse<void>> {
    return this.http.delete<void>(
      `${this.Url}province/${id}`,
      {
        observe: "response",
      }
    );
  }

  generateCode(): Observable<HttpResponse<string>> {
    return this.http.get<string>(`${this.Url}Book/newSubject`, {
      observe: "response",
    });
  }

  save(subject: TreeNode): Observable<HttpResponse<boolean>> {
    return this.http.post<boolean>(
      `${this.Url}province/save`,
      subject,
      {
        observe: "response",
      }
    );
  }

  getParentSubjects(): Observable<HttpResponse<TreeNode[]>> {
    return this.http.get<TreeNode[]>(
      `${this.Url}Book/GetParentSubjects`,
      {
        observe: "response",
      }
    );
  }

  getTreeSubjectById(
    SubjectId: number
  ): Observable<HttpResponse<TreeNode[]>> {
    return this.http.get<TreeNode[]>(
      `${this.Url}Book/TreesubjectsById/${SubjectId}`,
      {
        observe: "response",
      }
    );
  }
  getChildSubjectsById(id: number): Observable<HttpResponse<TreeNode[]>> {
    return this.http.get<TreeNode[]>(
      `${this.Url}Book/GetChildSubjectsById/${id}`,
      {
        observe: "response",
      }
    );
  }
}
