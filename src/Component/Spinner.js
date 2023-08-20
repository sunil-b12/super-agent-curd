import React from 'react';

const Spinner = () => {
    return (
        <div className="flex justify-center items-center h-full">
            <div className="rounded-full border-t-4 border-blue-500 border-opacity-75 h-6 w-6 animate-spin"></div>
        </div>
    );
};

export default Spinner;