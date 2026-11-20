import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiResponse, Student, StudentPayload } from "./models";
import { environment } from "../environments/environment";
@Injectable({ providedIn: "root" })
export class StudentService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/students`;
  list(
    filters: {
      page?: number;
      limit?: number;
      search?: string;
      course?: string;
      year?: number;
    } = {},
  ): Observable<ApiResponse<Student[]>> {
    let params = new HttpParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "")
        params = params.set(key, String(value));
    });
    return this.http.get<ApiResponse<Student[]>>(this.base, { params });
  }
  get(id: number) {
    return this.http.get<ApiResponse<Student>>(`${this.base}/${id}`);
  }
  create(payload: StudentPayload, photo?: File) {
    return this.http.post<ApiResponse<Student>>(
      this.base,
      this.toForm(payload, photo),
    );
  }
  update(id: number, payload: StudentPayload, photo?: File) {
    return this.http.put<ApiResponse<Student>>(
      `${this.base}/${id}`,
      this.toForm(payload, photo),
    );
  }
  delete(id: number) {
    return this.http.delete<ApiResponse<never>>(`${this.base}/${id}`);
  }
  private toForm(payload: StudentPayload, photo?: File) {
    const form = new FormData();
    Object.entries(payload).forEach(([k, v]) => form.append(k, String(v)));
    if (photo) form.append("photo", photo);
    return form;
  }
}
