import React, { useState } from 'react';
import { CommunicationService } from '../services/CommunicationService';
import { Box, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NewRide: React.FC = () => {
  const [cpf, setCpf] = useState<string>('');
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const navigate = useNavigate();

  const enviarDados = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await CommunicationService.estimate(cpf, origin, destination);
      response.data.origin.address = origin;
      response.data.destination.address = destination;
      response.data.customer_id = cpf;
      const responseJson = JSON.parse(JSON.stringify(response));
      navigate('/confirm', { state: { response: responseJson } });
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  return (
    <div style={{padding: 35}}>
      <h1>Nova Corrida</h1>
      <Box component="form" onSubmit={enviarDados} style={{display: "flex", flexDirection: "column", margin: "auto", width: "90%", gap: 15}}>
        <TextField
          name="cpf"
          type="text"
          placeholder="Digite seu CPF"
          variant="outlined"
          label="CPF"
          value={cpf} 
          onChange={(e) => setCpf(e.target.value)} 
          required
        />
        <TextField
          name="origin"
          type="text"
          placeholder="Digite o endereço de origem"
          variant="outlined"
          label="Origem"
          value={origin} 
          onChange={(e) => setOrigin(e.target.value)} 
          required
        />
        <TextField
          name="destination"
          type="text"
          placeholder="Digite o endereço de destino"
          variant="outlined"
          label="Destino"
          value={destination} 
          onChange={(e) => setDestination(e.target.value)} 
          required
        />
        <Button type="submit" variant="contained">
          Enviar
        </Button>
      </Box>
    </div>
  );
};

export default NewRide;
