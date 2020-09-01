import React, { useState } from 'react';

const AlertBoxContext = React.createContext([{}, () => { }]);

const AlertBoxProvider = (props) => {
    const [state, setState] = useState({
        open: false,
        description: '',
        options: false,
        title: '',
        closeText: '',
        onSubmit: null,
        onClose: undefined
    });

    return (
        <AlertBoxContext.Provider value={[state, setState]}>
            {props.children}
        </AlertBoxContext.Provider>
    );
}

export { AlertBoxContext, AlertBoxProvider };