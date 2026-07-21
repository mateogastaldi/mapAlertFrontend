import React from "react";

import ResponsiveAppBar from "./ResponsiveAppBar";
import { Toolbar, Container } from "@mui/material";
import { APP_BAR_HEIGHT } from "../theme/theme";

function Layout({ children }){
    return(
        <>
            <ResponsiveAppBar />
            <Toolbar sx={{ height: APP_BAR_HEIGHT, minHeight: "unset !important" }} />
            <Container maxWidth={false} disableGutters sx={{
                display:'flex',
                flexDirection: 'column',
                justifyContent:'center',
                alignItems:'center',
                minHeight: { xs: "calc(100vh - 56px)", sm: "calc(100vh - 64px)" },
                width: "100%",
                }}>
                {children}
            </Container>
        </>
    );
}

export default Layout;