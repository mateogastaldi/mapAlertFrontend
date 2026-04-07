import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import bache from "../assets/bache.png";
import sinLuz from "../assets/sin-luz.png";
import sinElectricidad from "../assets/sin-cargos.png";
import accidenteAutos from "../assets/accidente-de-auto.png";
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const incidentes = [
    {
        title:"Accidente de trafico",
        img: accidenteAutos,
    },
    {
        title:'Calle sin luz',
        img: sinLuz,
    },
    {
        title: 'Corte de electricidad',
        img: sinElectricidad,
    },
    {
        title: 'Bache',
        img: bache,
    }

];

export default function CustomizeSelect({ value, label, onChange, sx}) {

  return (
    <FormControl sx={{ minWidth: 120,...sx }} size="small">
      <InputLabel id="demo-select-small-label">Incidente</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={value}
        label={label}
        onChange={onChange}
        sx={{
            "& .MuiSelect-select":{
                display:'flex',
                flexDirection:'row',
            },
            borderRadius:'12px'
        }}
      >
        {incidentes.map(incidente => (
           <MenuItem value={incidente.title} sx={{
            display:'flex',
            flexDirection:'row',
            justifyContent:'flex-start',
            alignItems:'center',
            
           }}>
                <Box component="img" src={incidente.img} sx={{height:{
                    xl:'22px',
                    lg:'22px',
                    md:'20px',
                    sm:'18px',
                    xs:'18px',
                },margin:0.5}}/>
                <Typography sx={{m:0.5}}>{incidente.title}</Typography>
            </MenuItem>
        ))}
        
      </Select>
    </FormControl>
  );
}