import { Button, Card } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import StaticMap from './MapComponent';
import { CommunicationService } from '../services/CommunicationService';

const ConfirmRide: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const response = location.state?.response.data;

    if (!response) {
        navigate('/');
        return null;
    }

    const chooseRider = async (id: number, name: string, price: number) => {
        try {
            const confirmResult = await CommunicationService.confirm(response.customer_id, response.origin.address, response.destination.address, response.distance, response.duration, id, name, price);
            navigate('/history');
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    }

    return (
        <div style={{ padding: 30, justifyItems: "center" }}>
            <h1>Confirmação de Corrida</h1>

            <StaticMap encodedPolyline={response.routeResponse.polyline.encodedPolyline} origin={response.origin} destination={response.destination} />

            <h2>Escolha seu motorista:</h2>
            {response.options.map((option: any) => (
                <Card key={option.id} style={{ padding: 10, width: "94%", marginBottom: 15 }}>
                    <h3>Motorista: {option.name}</h3>
                    <p>Descrição: {option.description}</p>
                    <p>Veículo: {option.vehicle}</p>
                    <p>Avaliação: {option.review.rating}</p>
                    <p>Comentário: {option.review.comment}</p>
                    <p>Preço: R$ {option.value.toFixed(2)}</p>
                    <Button onClick={() => chooseRider(option.id, option.name, option.value.toFixed(2))} variant='contained'>Escolher</Button>
                </Card>
            ))}

        </div>
    );
};

export default ConfirmRide;
