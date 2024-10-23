import { useEffect } from 'react';

const ChatTabs = ({ activeTab, setActiveTab }) => {

    const tabs = [
        { label: 'Privados' },
        { label: 'Grupales' }
    ];

    useEffect(() => {
        // Seleccionar la primera tab por defecto si no hay una activa
        if (!activeTab) {
            setActiveTab(tabs[0].label);
        }
    }, [tabs, activeTab, setActiveTab]);

    return (
        <div className="tabs-container">

            <div className="tabs-header chat-tabs">
                {tabs.map((tab) => (
                    <p
                        key={tab.label}
                        className={`tab-item light-paragraph ${activeTab === tab.label ? 'tab-active bold-text' : ''}`}
                        onClick={() => setActiveTab(tab.label)}
                    >
                        {tab.label}
                    </p>
                ))}
            </div>

        </div>
    );
};

export default ChatTabs;