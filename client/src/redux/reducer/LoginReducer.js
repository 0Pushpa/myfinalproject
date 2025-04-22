const initialData = {
    //0
    details: [],
    isLoggedIn: false,
};

export const loginReducers = (state = initialData, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESSFULL":
            let myState1 = {
                //1
                details: action.payload,
                isLoggedIn: true,
            };
            state = myState1;
            return state;
        case "LOGIN_ERROR":
            let myState2 = {
                details: [],
                isLoggedIn: false,
            };
            state = myState2;

            return {
                ...state,
                error: action.payload,
            };
        case "LOGOUT":
            let myState3 = {
                details: [],
                isLoggedIn: false,
            };
            state = myState3;
            return state;
        default:
            return state;
    }
};