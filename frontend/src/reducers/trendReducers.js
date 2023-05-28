const initialState = {
    result: [
        []
    ],
    sending: false,
    keyArr: [],
    dailyTrending: true
};

export default function(state = initialState, action) {
    const {
        type,
        payload
    } = action;
    switch (type) {

        case 'SENDING':
            return {
                ...state,
                sending: true
            }
            case 'TREND_RECEIVED':
                return {
                    ...state,
                    sending: false,
                        result: payload
                }

                case 'TREND_ERROR':
                    return {
                        ...state,
                        sending: false
                    }

                    case 'RTRENDING':
                        return {
                            ...state,
                            rtrending: true
                        }
                        case 'RTRENDING_RECEIVED':
                            return {
                                ...state,
                                rtrending: false,
                                result1: payload
                            }

                            case 'RTRENDING_ERROR':
                                return {
                                    ...state,
                                    rtrending: false
                                }
                                case 'QTRENDING':
                                    return {
                                        ...state,
                                        qtrending: true
                                    }
                                    case 'QTRENDING_RECEIVED':
                                        return {
                                            ...state,
                                            qtrending: false,
                                            result2: payload
                                        }
            
                                        case 'QTRENDING_ERROR':
                                            return {
                                                ...state,
                                                qtrending: false
                                            }
                                            case 'TRENDING':
                                                return {
                                                    ...state,
                                                    dailyTrending: true
                                                }
                                                case 'TRENDING_RECEIVED':
                                                    return {
                                                        ...state,
                                                        dailyTrending: false,
                                                            keyArr: payload
                                                    }
                        
                                                    case 'TRENDING_ERROR':
                                                        return {
                                                            ...state,
                                                            dailyTrending: false
                                                        }
                                                        case 'CTRENDING':
                                                return {
                                                    ...state,
                                                    cdailyTrending: true
                                                }
                                                case 'CTRENDING_RECEIVED':
                                                    return {
                                                        ...state,
                                                        cdailyTrending: false,
                                                            result4: payload
                                                    }
                        
                                                    case 'CTRENDING_ERROR':
                                                        return {
                                                            ...state,
                                                            dailyTrending: false
                                                        }
                                                        default:
                                                            return state

                   
    }
}