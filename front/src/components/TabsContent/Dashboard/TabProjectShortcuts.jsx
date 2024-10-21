import { useState, useEffect } from 'react';
import { getProjectShortcuts } from '../../../services/shortcutService';
import AddShortcutButton from '../../Button/AddShortcutButton';
import ShortcutCard from '../../Cards/ShortcutCard';
import { useToast } from '../../../context/ToastContext';
import Loader from '../../Loader/Loader';

const TabProjectShortcuts = ({ project }) => {

    const [shortcuts, setShortcuts] = useState([]);
    const [loading, setLoading] = useState(true);

    const { addToast } = useToast();

    const fetchShortcuts = async () => {
        try {
            const data = await getProjectShortcuts(project._id);
            setShortcuts(data);
            setLoading(false);
        } catch (error) {
            addToast({
                type: 'error',
                title: 'Error al cargar los atajos rápidos',
                message: 'Ocurrió un error desconocido al intentar obtener los atajos rápidos. Inténtalo de nuevo más tarde.'
            });
            setShortcuts([]);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (project._id) {
            fetchShortcuts();
        }
    }, [project._id]);

    if (loading) {
        return <Loader size="small" />;
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

                <AddShortcutButton
                    project={project}
                    reloadShortcuts={fetchShortcuts}
                />

                {shortcuts.map((shortcut) => (
                    <ShortcutCard
                        key={shortcut._id}
                        shortcut={shortcut}
                        project={project}
                        reloadShortcuts={fetchShortcuts}
                    />
                ))}

            </div>

        </section>
    );
};

export default TabProjectShortcuts;