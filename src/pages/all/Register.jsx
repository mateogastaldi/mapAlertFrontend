import { TextField, Container, Box } from "@mui/material";
import React from "react";
import TextInputBase from "../../components/TextInputBase";
import logo from "../../assets/logo png.png"
import PasswordInputBase from "../../components/PassworInputBase";
import ButtonAcceptBase from "../../components/ButtonAcceptBase";
import ButtonCancelBase from "../../components/ButtonCancelBase";

const marginTop = "13px";
const marginBottom = "13px";
const maxWidth = "20rem";
const maxWidthBottom = "8rem";
const marginXButton = "8px"

function Register(){
    
    return(
        <Container maxWidth="xl" sx={{
                display:'flex',
                flexDirection: 'column',
                justifyContent:'center',
                alignItems:'center'}}>
            <Box sx = {{
                display:'flex',
                flexDirection: 'column',
                justifyContent:'center',
                alignItems:'center', 
                width:{
                    xs:"90%",
                    sm:"70%",
                    md:"60%",
                    lg:"50%",
                    xl:"40%"
                }}}>
                <Box component="img" src={logo} alt="Logo" sx={{
                    width:'100%',
                    objectFit:'contain'
                }}/>
                <TextInputBase nombre="Nombre" mt={marginTop} mb={marginBottom} required={true} mw={maxWidth}/>
                <TextInputBase nombre="Apellido" mt={marginTop} mb={marginBottom} required={true} mw={maxWidth}/>
                <TextInputBase nombre="Email" mt={marginTop} mb={marginBottom} type="email" required={true} mw={maxWidth}/>
                <PasswordInputBase nombre="Contraseña" mt={marginTop} mb={marginBottom} required={true} mw={maxWidth}/>
                <PasswordInputBase nombre="Repetir contraseña" mt={marginTop} mb={marginBottom} required={true} mw={maxWidth}/>
                <Box sx={{
                    width:'100%',
                    maxWidth:maxWidth

                }}>
                    <ButtonCancelBase mt={marginTop} mb={marginBottom} required={true} mw={maxWidthBottom} mx={marginXButton}/>
                    <ButtonAcceptBase mt={marginTop} mb={marginBottom} required={true} mw={maxWidthBottom} mx={marginXButton}/>
                </Box>
                
            </Box>
        </Container>
    )
    
}

export default Register