import React from 'react';
import { AlertBoxProvider, AlertBoxContext } from '../../util/context/alertContext';

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";

const ConfirmationDialog = () => {

  const [state, setState] = React.useContext(AlertBoxContext);

  return (
    <AlertBoxProvider>
      <Dialog open={state.open}>
        <DialogTitle>{state.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{state.description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          {state.options ?
            <Button disableRipple={true} variant='contained' color="primary" onClick={state.onSubmit}>
              YES, I'M SURE
          </Button> :
            null}
          <Button disableRipple={true} variant='contained' color="primary" onClick={() => state.onClose ? state.onClose : setState({ ...state, open: false })} autoFocus>
            {state.closeText}
          </Button>
        </DialogActions>
      </Dialog>
    </AlertBoxProvider>
  );
};

export { ConfirmationDialog }