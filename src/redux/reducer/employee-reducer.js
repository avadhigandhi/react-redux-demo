import { WATCH_EMPLOYEE_HISTORY } from '../Action/employee-action'

const employeeInfo = (state = {
    employeeData :[]
}, action) => {
    switch (action.type) {
        
        case WATCH_EMPLOYEE_HISTORY:
            state = { ...state , employeeData: [...action.data] };
            break;
        default:
            break;
    }
    return state
}

export default employeeInfo