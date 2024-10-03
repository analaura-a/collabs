import { useState, useEffect } from 'react';

const Tabs = ({ tabs }) => {

    const [activeTab, setActiveTab] = useState(tabs?.[0]?.label || '');

    useEffect(() => {
        if (tabs?.length > 0) {
            setActiveTab(tabs[0].label);
        }
    }, [tabs]);

    const handleTabClick = (label) => {
        setActiveTab(label);
    };

    // Verificar si el array de tabs tiene contenido antes de intentar renderizarlos
    if (!tabs || tabs.length === 0) {
        return <div>Cargando...</div>; //Reemplazar por componente de carga
    }

    return (
        <div className="tabs-container">

            <div className="tabs-header">
                {tabs.map((tab) => (
                    <p
                        key={tab.label}
                        className={`tab-item light-paragraph ${activeTab === tab.label ? 'tab-active bold-text' : ''}`}
                        onClick={() => handleTabClick(tab.label)}
                    >
                        {tab.label}
                    </p>
                ))}
            </div>

            <div className="tab-content">
                {tabs.find((tab) => tab.label === activeTab)?.content || 'Contenido no disponible'}
            </div>

        </div>
    );
};

export default Tabs;