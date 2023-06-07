import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { map, tap, retry, filter, debounceTime, switchMap, catchError, takeUntil } from 'rxjs/operators';
import { CANCEL_SEARCH_SKILLS_REQUEST, CHANGE_SEARCH_FIELD, SEARCH_SKILLS_REQUEST } from '../actions/actionTypes';
import { searchSkillsRequest, searchSkillsSuccess, searchSkillsFailure, resetSearchField, cancelSearchSkillsRequest } from '../actions/actionCreators';
import { of } from 'rxjs';

export const changeSearchEpic = action$ => action$.pipe(

    ofType(CHANGE_SEARCH_FIELD),
    map(o => o.payload.search.trim()),
    debounceTime(100),
    switchMap(searchTerm => {
        if (searchTerm === '') {
            return of(resetSearchField(), cancelSearchSkillsRequest());
        }
        
        return of(searchSkillsRequest(searchTerm));
    })
)

export const searchSkillsEpic = action$ => action$.pipe(
    ofType(SEARCH_SKILLS_REQUEST),
    filter(({payload}) => payload.search.trim() !== ''),
    map(o => o.payload.search),
    map(o => new URLSearchParams({ q: o })),
    tap(o => console.log(o)),
    switchMap(o => 
        ajax.getJSON(`${process.env.REACT_APP_SEARCH_URL}?${o}`).pipe(
            retry(3),
            map(o => searchSkillsSuccess(o)),
            takeUntil(action$.pipe(ofType(CANCEL_SEARCH_SKILLS_REQUEST))),
            catchError(e => of(searchSkillsFailure(e))),
        )
    ),
);