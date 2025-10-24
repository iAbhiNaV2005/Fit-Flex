import React from 'react';

/**
 * A simple component to render SVG icons from a central object.
 * This makes it easy to manage and reuse icons throughout the app.
 * @param {object} props - Component props.
 * @param {string} props.name - The name of the icon to render.
 * @param {string} props.className - Tailwind CSS classes for styling.
 */
const SvgIcon = ({ name, className }) => {
    const icons = {
        logo: <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />,
        search: <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />,
        dumbbell: <path strokeLinecap="round" strokeLinejoin="round" d="M10.06 10.06c.45-.45.98-.83 1.57-1.14l3.86-1.93a2.25 2.25 0 0 1 2.98 2.98l-1.93 3.86a11.2 11.2 0 0 1-1.14 1.57m-2.5-4.33 4.33 2.5m-4.33-2.5-2.5 4.33m2.5-4.33-4.33-2.5m4.33 2.5 2.5-4.33M4.5 19.5l2.5-2.5c.45-.45.98-.83 1.57-1.14l3.86-1.93a2.25 2.25 0 0 1 2.98 2.98l-1.93 3.86a11.2 11.2 0 0 1-1.14 1.57M4.5 19.5 2 22m2.5-2.5 2.5 2.5M19.5 4.5l-2.5 2.5c-.45.45-.98.83-1.57 1.14l-3.86 1.93a2.25 2.25 0 0 1-2.98-2.98l1.93-3.86a11.2 11.2 0 0 1 1.14-1.57M19.5 4.5 22 2m-2.5 2.5-2.5-2.5" />,
    };
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>{icons[name]}</svg>;
};

export default SvgIcon;