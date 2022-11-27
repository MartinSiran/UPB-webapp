import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  makeStyles,
  Slide
} from "@material-ui/core";
import clsx from "clsx";
import red from "@material-ui/core/colors/red";

const useStyles = makeStyles(() => ({
  dialog: {
    borderRadius: 0
  },
  button: {
    borderRadius: 0,
    textTransform: "none",
    padding: 5
  },
  logout: {
    color: "#fff",
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[700]
    }
  },
  countdown: {
    color: red[700]
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SessionTimeoutDialog = ({  open, countdown, onLogout,onContinue }) => {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      classes={{ paper: classes.dialog }}
      TransitionComponent={Transition}
    >
      <DialogTitle>
        Bad Sign In
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2">
          The next login will be possible after{" "}
          <span className={classes.countdown}>{countdown}</span> seconds.
        </Typography>
      </DialogContent>
    </Dialog>
  );
}


export default SessionTimeoutDialog;