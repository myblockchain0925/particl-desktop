import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { MarketService } from 'app/core/market/market.service';
import { MarketStateService } from 'app/core/market/market-state/market-state.service';

// TODO: addresses & favourites!
@Injectable()
export class ProfileService {

  constructor(
    private market: MarketService,
    private marketState: MarketStateService
  ) { }

  list() {
    return this.marketState.observe('profile')
    .distinctUntilChanged((a: any, b: any) => JSON.stringify(a) === JSON.stringify(b));
  }

  get(profileIdOrName: number | string): Observable<any> {
    return this.market.call('profile', ['get', profileIdOrName]);
  }

  // TODO: profileAddresses, 
  add(profileName: string, profileAddress?: string): Observable<any> {
    let params = ['add', profileName, profileAddress];
    if (profileAddress === null) {
      params.pop(); // if null pop parent
    }
    return this.market.call('profile', params);
  }

  update(profileId: number, profileName: string): Observable<any> {
    return this.market.call('profile', ['update', profileId, profileName]);
  }

  remove(profileIdOrName: number | string): Observable<any> {
    return this.market.call('profile', ['remove', profileIdOrName]);
  }

  search(searchString: string): Observable<any> {
    return this.market.call('profile', ['search', searchString]); 
  }
}