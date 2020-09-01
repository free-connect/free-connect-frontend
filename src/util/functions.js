const siftPhone = (val) => {
    val = val.split(/[^\d]/gi).join('');
    return val
};

const quickAlert = (message, initState, cb) => {
    cb({
        ...initState, 
        options: false, 
        open: true, 
        description: message,
        closeText: 'Close'
    });
}

const handleEnterKey = (e, cb) => {
    if (e.key !== 'Enter') {
        return;
    } else {
        cb(e)
    }
}

export { siftPhone, quickAlert, handleEnterKey }