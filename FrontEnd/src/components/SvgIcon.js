import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';

const SvgIcon = ({ svgName }) => {

    const DynamicSvg = lazy(() => import(`../style/svgs/components/${svgName}`).catch(() => ({ default: () => null })));

    return (
        <div style={{ paddingLeft: '10px', position: 'absolute' }}>
            <Suspense fallback={<div>Loading...</div>} onError={(error) => console.error('Error during SVG loading:', error)}>
                <DynamicSvg />
            </Suspense>
        </div>
    );
};

SvgIcon.propTypes = {
    svgName: PropTypes.string.isRequired,
};

export default SvgIcon;
