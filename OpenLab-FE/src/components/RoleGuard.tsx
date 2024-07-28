import React, { ReactNode, useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ACCESS_TOKEN, USER_LOGIN, settings } from '../util/config';
import RoleSelector from './RoleSelector';

interface RoleGuardProps {
    children: ReactNode;
    requiredRole: string;
}

const RoleGuard: React.FC<RoleGuardProps> = ({ children, requiredRole }) => {
    const location = useLocation();
    const token = settings.getStore(ACCESS_TOKEN);
    const userString = settings.getStore(USER_LOGIN);
    const user = userString ? JSON.parse(userString) : null;
    const roles: string[] = user ? user.roles : [];
    const [selectedRole, setSelectedRole] = useState<string | null>(null);

    useEffect(() => {
        if (roles.length === 1) {
            setSelectedRole(roles[0]);
        }
    }, [roles]);

    const handleRoleSelect = (role: string) => {
        setSelectedRole(role);
    };

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (!selectedRole) {
        return <RoleSelector roles={roles} onSelectRole={handleRoleSelect} />;
    }

    if (selectedRole !== requiredRole) {
        return selectedRole === 'admin' ? (
            <Navigate to="/admin" state={{ from: location }} />
        ) : (
            <Navigate to="/home" state={{ from: location }} />
        );
    }

    return <>{children}</>;
};

export default RoleGuard;
