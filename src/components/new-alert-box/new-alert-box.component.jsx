import React from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
  } from "@material-ui/core";
  
  export const ConfirmationDialog = ({
    open,
    title,
    description,
    closeText,
    onSubmit,
    onClose,
    options
  }) => {
    return (
      <Dialog open={open}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
        </DialogContent>
        <DialogActions>
            {options ?
          <Button color="primary" onClick={onSubmit}>
            YES, I'M SURE
          </Button> : 
          null}
          <Button color="primary" onClick={onClose} autoFocus>
            {closeText}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };