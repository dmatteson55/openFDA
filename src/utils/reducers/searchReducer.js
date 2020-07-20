import { SEARCH_RESULTS, CHANGE_TERM, CHANGE_CONDITION, CHANGE_PAGE } from '../actions/types'

const initialState = {
    results: [{}],
    resultCount: 0,
    searchCondition: "applicant",
    searchTerm: "BD",
    pageNumber: 0,
    error: null
}

//searchReducer: changes search variables and results
const searchReducer =  (state = initialState, action) =>{
    switch(action.type){
        case CHANGE_TERM:
            return {
                ...state,
                searchTerm: action.payload.searchTerm
            }
        case CHANGE_CONDITION:
            return {
                ...state,
                searchCondition: action.payload.searchCondition
            }
        case CHANGE_PAGE:
            return {
                ...state,
                pageNumber: state.pageNumber + parseInt(action.payload.pageChange)
            }
        case SEARCH_RESULTS:
            return{
                ...state,
                resultCount: action.payload.resultCount,
                results: action.payload.results,
                error: action.payload.error
            }
        default:
            return state;
    }
}

export default searchReducer;