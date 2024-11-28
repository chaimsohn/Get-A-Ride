import { Box, Button, Card, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import React, { useState } from 'react';
import { CommunicationService } from '../services/CommunicationService';

const HistoryRides: React.FC = () => {
  const [cpf, setCpf] = useState<string>(''); 
  const [driver, setDriver] = useState<number>(0);
  const [ridesList, setRidesList] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * 
   */
  const fetchRides = async () => {
    setLoading(true);
    try {
      const ridesData = await CommunicationService.listRides(cpf, driver);
      setRidesList(ridesData.data);
    } catch (error) {
      console.error('Erro ao buscar corridas:', error);
      setRidesList([]);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 
   * @param event 
   */
  const handleDriverChange = (event: SelectChangeEvent<string>) => {
    const value = Number(event.target.value);
    setDriver(value);
  };

  return (
    <div style={{ padding: 30, justifyItems: "center" }}>
      <Box display="flex" flexDirection="column" gap={2} marginBottom={2}>
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
        <FormControl fullWidth>
          <InputLabel id="driver-select-label">Motoristas</InputLabel>
          <Select
            labelId="driver-select-label"
            id="driver-select"
            value={driver.toString()}
            label="Motoristas"
            onChange={handleDriverChange}
          >
            <MenuItem value={0}>Todos</MenuItem>
            <MenuItem value={1}>Hommer Simpson</MenuItem>
            <MenuItem value={2}>Dominic Toretto</MenuItem>
            <MenuItem value={3}>James Bond</MenuItem>
          </Select>
        </FormControl>
        <Button onClick={fetchRides} variant="contained" disabled={loading || !cpf}>
          {loading ? 'Carregando...' : 'Ver Corridas'}
        </Button>
      </Box>

      {ridesList?.rides?.length > 0 ? (
        ridesList.rides.map((ride: any) => (
          <Card key={ride.id} style={{ padding: 10, width: "94%", marginBottom: 5 }}>
            <h3>Data e Hora: {ride.date}</h3>
            <p>Motorista: {ride.driver.name}</p>
            <p>Origem: {ride.origin}</p>
            <p>Destino: {ride.destination}</p>
            <p>Distância: {ride.distance}</p>
            <p>Tempo: {ride.duration}</p>
            <p>Valor: R$ {ride.value}</p>
          </Card>
        ))
      ) : (
        !loading && (
          <p style={{ textAlign: 'center', marginTop: 20 }}>
            {cpf ? 'Nenhuma corrida encontrada.' : 'Por favor, insira o CPF para buscar corridas.'}
          </p>
        )
      )}
    </div>
  );
};

export default HistoryRides;
