import React from 'react';
import { styled} from '@material-ui/core';
import { Typography } from "@mui/material";

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  margin: "150px auto",
  textAlign: "center",
  alignItems: "center",
  width: "50%",
});
/** Render a Not Found page if the user enters a URL that doesn't match any route. */
export default NotFound = ({history}) => {
  
    return (
      <Container>
        <Typography variant="h3">Page not found</Typography>
      </Container>
    );
  
};


