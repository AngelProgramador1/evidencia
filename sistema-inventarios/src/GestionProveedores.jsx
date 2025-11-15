import React from 'react';
import { Truck } from 'lucide-react';

export default function GestionProveedores() {
    return (
        <div className="bg-white rounded-lg shadow-md p-8 mt-8">
            <div className="flex items-center gap-3 mb-6">
                <Truck size={32} className="text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-800">Gestión de Proveedores</h2>
            </div>
            <div className="text-center text-gray-500 py-16">
                <p className="text-lg">La funcionalidad de gestión de proveedores está en construcción.</p>
                <p className="mt-2">Próximamente podrás agregar, editar y ver tus proveedores desde aquí.</p>
            </div>
        </div>
    );
}