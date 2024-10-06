import { useState, useEffect } from 'react';
import { getProjectShortcuts } from '../../../services/shortcutService';

const TabProjectShortcuts = ({ projectId, userRole }) => {

    const [shortcuts, setShortcuts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchShortcuts = async () => {
        try {
            const data = await getProjectShortcuts(projectId);
            setShortcuts(data);
            setLoading(false);
        } catch (error) {
            console.error('Error al cargar los atajos:', error);
            setShortcuts([]);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (projectId) {
            fetchShortcuts();
        }
    }, [projectId]);

    if (loading) {
        return <div>Cargando...</div>; //Reemplazar por componente de carga
    }

    return (
        <section className="dashboard-tab-container">

            <div className="title-with-icon-and-paragraph">
                <div className="title-with-icon">
                    <img src="../assets/svg/shortcuts.svg" alt="Atajos rápidos" />
                    <h2 className="title-20 medium-text">Atajos rápidos</h2>
                </div>

                <p className="light-paragraph">Links útiles para que todo el equipo esté en una misma sintonía.</p>
            </div>

            <div className="dashboard-tab__shortcuts-container">
                
                {/* Atajos aquí */}
                <div>Card</div>
                <div>Card</div>
                <div className="first-in-list">Card (primera)</div>

            </div>

        </section>
    );
};

export default TabProjectShortcuts;