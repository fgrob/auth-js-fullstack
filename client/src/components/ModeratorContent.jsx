import React, { useEffect, useState } from 'react';
import UserService from '../services/user.service';
import { useNavigate } from 'react-router-dom';

const ModeratorContent = (requiredRole) => {
    const [modPermissions, setModPermissions] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const checkPermissions = async () => {
            try {
                const res = await UserService.verifyPermissions(requiredRole.role);
                console.log('Status ' + res.status + ' : ' + res.data)
                setModPermissions(true)
                setErrorMessage('');
            } catch (err) {
                setModPermissions(false);
                try {
                    setErrorMessage(
                        err.response.status +
                        ' ' +
                        err.response.statusText +
                        ' : ' +
                        err.response.data.message
                    );
                } catch {
                    setErrorMessage(err)
                }
            }
        };

        checkPermissions();
    }, [])

    return (
        <div>
            {modPermissions && (
                <div style={{ color : 'green'}}> Estás viendo contenido exclusivo para Moderadores </div>
            )}
            {errorMessage && (
                <div style={{ color: 'red'}}>{errorMessage}</div>
            )}
        </div>
    )
};

export default ModeratorContent;