import React from "react";
import { Avatar, Typography } from "@material-ui/core";
import styled from "styled-components";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { setMsgId } from "../../Store/Actions/messageActions";
import { useSelector, useDispatch } from "react-redux";
import { IconButton, Card, CardContent, CardHeader, CardMedia} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import moment from 'moment';

const NewPaper = styled(Card)`
   {
    align-items: center;
    height: auto;
    width: 300px;
    position: absolute;
    left: -150px;
    top: 10px;
    z-index: 1000;
  }
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 1000;
`;

const Triangle = styled.div`
  width: 20px;
  height: 20px;
  transform: rotate(45deg);
  background: white;
  position: absolute;
  right: 140px;
  top: -10px;
`;

const InfoWindowAvatar = styled(Avatar)`
  width: 40px;
  height: 40px;
`;



const MapMarker = props => {
  const selectedMsg = useSelector(state => state.messageBoard.toggleMsgId);
  const dispatch = useDispatch();
  const timeToDate = time => {
    return new Date(time * 1000).toLocaleDateString();
  };
  return (
    <>
      <LocationOnIcon 
      className="location-icon"
        lat={props.lat}
        lng={props.lng} />
      {selectedMsg === props.id && (            
            <NewPaper>
              <Triangle />
              <CardHeader
                avatar={
                  <InfoWindowAvatar variant="circle" src={props.avatarUrl}>
                    {props.firstNameInit}
                  </InfoWindowAvatar>
                }
                title={props.displayName}
                subheader={moment(timeToDate(props.time), 'M/D/YYYY').fromNow()} />
                {props.image && 
                <CardMedia
                  style={{paddingTop: "56.25%", height: "0", width: "100%"}}
                  image={props.image}
                  title="info-window image" />
                }
                <CardContent style={{height: "auto"}}>
                  <Typography variant="body2">{props.msg}</Typography>
                </CardContent>
            
            <CloseButton onClick={() => dispatch(setMsgId())}>
              <Close />
            </CloseButton>
          </NewPaper>
      )}
      </>
  );
};

export default MapMarker;
