import { SEARCH_RESULTS, CHANGE_TERM, CHANGE_CONDITION, CHANGE_PAGE } from './types'
import axios from 'axios'

export const searchResults = () => (dispatch, getState) => {
    const {searchTerm, searchCondition, pageNumber } = getState().search
    axios.get("https://api.fda.gov/device/510k.json", {
        params: {
            search : searchCondition+':'+searchTerm,
            limit : 10,
            skip: pageNumber*10
        }
    }).then(res => {
        dispatch({
            type: SEARCH_RESULTS,
            payload: {resultCount : res.data.meta.results.total, results : res.data.results, error: null}
        })
    }).catch(err => {
        dispatch({
            type: SEARCH_RESULTS,
            payload: {resultCount: 0, error: err}
        })
    })
}

export const changeTerm = (searchTerm) => (dispatch) => {
    dispatch({
        type: CHANGE_TERM,
        payload: { searchTerm, page:0 }
    }
    );
}

export const changeCondition = (searchCondition) => (dispatch) => {
    dispatch({
        type: CHANGE_CONDITION,
        payload: { searchCondition, page:0}
    })
}

export const changePage = (pageChange) => (dispatch) => {
    dispatch({
        type: CHANGE_PAGE,
        payload: { pageChange }
    })
}