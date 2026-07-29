import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { INCIDENT_TYPES } from '../constants/incidentTypes';

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
        {INCIDENT_TYPES.map(incidente => {
          const Icon = incidente.icon;
          return (
            <MenuItem key={incidente.reportType} value={incidente.reportType} sx={{
              display:'flex',
              flexDirection:'row',
              justifyContent:'flex-start',
              alignItems:'center',
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    bgcolor: incidente.color,
                    margin: 0.5,
                    flexShrink: 0,
                }}>
                    <Icon sx={{ fontSize: 14, color: '#fff' }} />
                </Box>
                <Typography sx={{m:0.5}}>{incidente.title}</Typography>
            </MenuItem>
          );
        })}

      </Select>
    </FormControl>
  );
}