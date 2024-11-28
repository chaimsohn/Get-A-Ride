import React, { useEffect, useState } from 'react';
import { HashRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';

const App: React.FC = () => {
    const [message, setMessage] = useState<string>('');

    useEffect(() => {

    }, []);

    return (
        <HashRouter>
            <AppRoutes />
        </HashRouter>
    );
};

export default App;