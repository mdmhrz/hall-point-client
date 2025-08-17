import React from 'react';

const SectionTitle = ({ title, subTitle }) => {
    return (
        <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-primary mb-4 leading-tight">
                {title}
            </h2>
            <p className="text-lg md:text-xl text-base-content/70 max-w-3xl mx-auto leading-relaxed">
                {subTitle}
            </p>
        </div>
    );
};

export default SectionTitle;