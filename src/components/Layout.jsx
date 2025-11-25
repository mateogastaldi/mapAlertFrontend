import React from "react";


import ResponsiveAppBar from "./ResponsiveAppBar";
import { Toolbar, Container, Box } from "@mui/material";


function Layout({ children }){
    return(
        <>
            <Container maxWidth={false} disableGutters sx={{
                display:'flex',
                flexDirection: 'column',
                justifyContent:'center',
                alignItems:'center',
                }}>            
                {children}
            </Container>

        </>
        
    );
}

export default Layout;