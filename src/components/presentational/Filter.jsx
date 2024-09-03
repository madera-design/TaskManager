import React, { useEffect, useState } from 'react'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import { LabelInput, InputGroup } from '../../assets/styles/TaskForm.styles';
import { ContainerFilter } from '../../assets/styles/Filter.styles';

const Filter = ({ filterDurations, ordenTasks }) => {
    // Estado para mantener la duración seleccionada en el filtro
    const [durationsSelect, setDurationsSelect] = useState(0);
    const [ordenlist, setOrdenlist] = useState(0);

    // useEffect para ejecutar la función de filtrado cada vez que cambie la selección de duración
    useEffect(() => {
        filterDurations(durationsSelect);  // Filtrar las tareas según la duración seleccionada
    }, [durationsSelect]);

     // useEffect para ejecutar la función de ordenar la lista por orden alfabetico ascendete y descendente cada vez que cambie la selección de ordenar
     useEffect(() => {
        ordenTasks(ordenlist);  // Filtrar las tareas según la duración seleccionada
    }, [ordenlist]);
      
    return (
        <ContainerFilter>
            <div>
                <InputGroup>
                    <LabelInput>Filtar por duración</LabelInput>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <Select
                            labelId="select-duarcion"  // ID para la etiqueta del select
                            id="select-duarcion"  // ID del select
                            value={durationsSelect}  // Valor actual del select
                            onChange={(e) => setDurationsSelect(e.target.value)}  // Actualizar el estado cuando se seleccione una nueva duración
                            required
                        >
                            <MenuItem value={0}>Todas</MenuItem>
                            <MenuItem value={1800}>30 min o menos</MenuItem>
                            <MenuItem value={2700}>45 min a 1h</MenuItem>
                            <MenuItem value={3600}>Más de 1h</MenuItem>
                        </Select>
                    </FormControl>
                </InputGroup>
            </div>
            <div>
                <InputGroup>
                    <LabelInput>Ordenar por</LabelInput>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <Select
                            labelId="select-duarcion"  // ID para la etiqueta del select
                            id="select-duarcion"  // ID del select
                            value={ordenlist}  // Valor actual del select
                            onChange={(e) => setOrdenlist(e.target.value)}  // Actualizar el estado cuando se seleccione una nueva duración
                            required
                        >
                            <MenuItem value={0}>Ninguna</MenuItem>
                            <MenuItem value={1}>A - Z</MenuItem>
                            <MenuItem value={2}>Z - A</MenuItem>
                        </Select>
                    </FormControl>
                </InputGroup>
            </div>
        </ContainerFilter>
    )
}

export default Filter
