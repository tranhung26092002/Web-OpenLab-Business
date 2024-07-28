import React, { useState } from 'react';

interface RoleSelectorProps {
    roles: string[];
    onSelectRole: (role: string) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ roles, onSelectRole }) => {
    const [selectedRole, setSelectedRole] = useState<string>(roles[0]);

    const handleSelectRole = () => {
        onSelectRole(selectedRole);
    };

    return (
        <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            zIndex: 1000
        }}>
            <h3 style={{ marginBottom: '20px', fontSize: '18px', textAlign: 'center' }}>Chọn quyền đăng nhập</h3>
            <select 
                value={selectedRole} 
                onChange={(e) => setSelectedRole(e.target.value)} 
                style={{
                    width: '100%',
                    padding: '10px',
                    marginBottom: '20px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                }}
            >
                {roles.map((role) => (
                    <option key={role} value={role}>
                        {role}
                    </option>
                ))}
            </select>
            <button 
                onClick={handleSelectRole}
                style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                Đăng nhập
            </button>
        </div>
    );
};

export default RoleSelector;
