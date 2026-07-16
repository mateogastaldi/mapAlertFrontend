import React from "react";


import ResponsiveAppBar from "./ResponsiveAppBar";
import { Toolbar, Container, Box } from "@mui/material";


function Layout({ children }){
    return(
        <>
            <ResponsiveAppBar />
            <Toolbar sx={{
                height: {
                  xl: "65px",
                  lg: "65px",
                  md: "65px",
                  sm: "65px",
                  xs: "56px",
                }
            }} />
            <Container maxWidth={false} disableGutters sx={{
                display:'flex',
                flexDirection: 'column',
                justifyContent:'center',
                alignItems:'center',
                minHeight: "calc(100vh - 65px)",
                width: "100%",
                }}>            
                {children}
            </Container>
        </>
    );
}

export default Layout;