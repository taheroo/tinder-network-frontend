import React from "react";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import DescriptionIcon from "@material-ui/icons/Description";
import SchoolIcon from "@material-ui/icons/School";
import CakeIcon from "@material-ui/icons/Cake";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import { blue } from "@material-ui/core/colors";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function TinderProfileDetails(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      fullWidth={true}
      disableEscapeKeyDown={false}
    >
      <DialogTitle id="simple-dialog-title">{selectedValue.name}</DialogTitle>
      <List>
        <ListItem key={selectedValue.name}>
          <ListItemAvatar>
            <Avatar className={classes.avatar}>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={selectedValue.name} />
        </ListItem>

        {selectedValue.bio && (
          <ListItem key={selectedValue.bio}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <DescriptionIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={selectedValue.bio} />
          </ListItem>
        )}

        {selectedValue.schools && selectedValue.schools[0] && (
          <ListItem key={selectedValue.schools[0].name}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <SchoolIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={selectedValue.schools[0].name} />
          </ListItem>
        )}

        {selectedValue.city && (
          <ListItem key={selectedValue.city.name}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <LocationCityIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={selectedValue.city.name} />
          </ListItem>
        )}

        {selectedValue.birth_date && (
          <ListItem key={selectedValue.birth_date}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <CakeIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={new Date(
                Date.parse(selectedValue.birth_date)
              ).getFullYear()}
            />
          </ListItem>
        )}

        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <LocationOnIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={selectedValue.distance_mi} />
        </ListItem>
      </List>
    </Dialog>
  );
}

TinderProfileDetails.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default TinderProfileDetails;
