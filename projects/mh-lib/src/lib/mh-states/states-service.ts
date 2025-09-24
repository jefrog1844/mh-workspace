import { httpResource, HttpResourceRef } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { State } from './state';

@Injectable({
  providedIn: 'root',
})
export class StatesService {
  getStatesResource(): HttpResourceRef<State[]> {
    return httpResource<State[]>(
      () => ({
        url: 'https://member.magellanhealthcare.com/api/jsonws/invoke',
        method: 'POST',
        headers: {
          accept: 'application/json',
        },
        params: {},
        reportProgress: false,
        body: {
          '/region/get-regions': {
            active: true,
            countryId: 19,
          },
        },
        transferCache: false,
        withCredentials: false,
      }),
      {
        defaultValue: [],
        parse: (raw: any) => {
          return raw;
        },
      }
    );
  }
}
