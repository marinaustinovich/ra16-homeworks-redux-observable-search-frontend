import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeSearchField } from './actions/actionCreators';

export default function Skills() {
    const { items, loading, error, search } = useSelector(state => state.skills);
    const dispatch = useDispatch();

    const handleSearch = evt => {
        const { value } = evt.target;
        dispatch(changeSearchField(value));
    };

    const hasQuery = search.trim() !== '';
    return (
        <Fragment>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="w-50 p-3 bg-light rounded shadow-sm text-center">
                    <div className="mb-3">
                        <input type="search" value={search} onChange={handleSearch} className="form-control" />
                    </div>
                    {!hasQuery && <div className="text-muted">Type something to search</div>}
                    {hasQuery && loading && <div className="text-success">searching...</div>}
                    {error 
                        ? <div className="text-danger">Error occured</div>
                        : <ul className="list-group mt-3">
                            {items.map(o => 
                                <li key={o.id} className="list-group-item">
                                    {o.name}
                                </li>
                            )}
                        </ul>
                    }
                </div>
            </div>
        </Fragment>
    )
}
