import { useState } from 'react';

const Tabs = ({ tabs }) => {

    const [activeTab, setActiveTab] = useState(tabs[0].label);

    const handleTabClick = (label) => {
        setActiveTab(label);
    };

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
                {tabs.find((tab) => tab.label === activeTab).content}
            </div>

        </div>
    );
};

export default Tabs;