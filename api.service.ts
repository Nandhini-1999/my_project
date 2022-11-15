import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  // username = 'vijayanandhini-v_infosys';
  // repo = 'Angular';
  token = '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'; //PAT

  
  
  reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Content-Type': 'text/plain',
    'Authorization': 'Bearer ' + this.token
  });
  
  getSha() {
    return this._http.get('https://api.github.com/repos/vijayanandhini-v_infosys/Angular/contents/sample.yaml', { headers: this.reqHeader });
  }
  save(body: any) {
    return this._http.put('https://api.github.com/repos/vijayanandhini-v_infosys/Angular/contents/sample.yaml', body, { headers: this.reqHeader })
  }
}  
