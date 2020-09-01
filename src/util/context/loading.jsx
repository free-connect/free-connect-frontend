import React, { useState } from 'react';
import { Loading } from '../../components/loading-icon/loading.component';

const LoadingContext = React.createContext([{}, () => { }]);

const LoadingContextProvider = (props) => {
    const [state, setState] = useState(false);

    React.useEffect(() => console.log(state))

    return (
        <LoadingContext.Provider value={[state, setState]}>
            {props.children}
        </LoadingContext.Provider>
    );
}

export { LoadingContext, LoadingContextProvider };