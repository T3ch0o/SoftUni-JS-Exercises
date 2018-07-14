import React from 'react';

import Menu from './Menu';
import ViewComponent from './ViewComponent';

const Wrapper = function() {
    return (
        <div className="content">
            <Menu />
            <ViewComponent />
        </div>
    );
};

export default Wrapper;