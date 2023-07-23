import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '../../providers/config.provider';
import { AppConfig } from '../../types/AppConfig';
import { Observable, catchError } from 'rxjs';
import { IsAdminMasterData } from '../../types/IsAdminMasterData';

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {
  constructor(private http: HttpClient, @Inject(APP_CONFIG) private config: AppConfig) { }

  getIsAdminSelection(): Observable<IsAdminMasterData> {
    return this.http.get<IsAdminMasterData>(`${this.config.apiEndpoint}/masterdata/isadminselection`).pipe(
      catchError((error) => {
        console.error('Error fetching isAdminSelection data', error);
        throw error;
      })
    );
  }
}
