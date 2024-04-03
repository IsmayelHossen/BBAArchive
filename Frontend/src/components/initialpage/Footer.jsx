import React from 'react';

const Footer = () => {
    const currentDate = new Date();

// Get the current year using the getFullYear() method
const currentYear = currentDate.getFullYear();
    return (
        <div>
            <div className=" footer-custom">
        {/* Page Content */}
        <div className="content container-fluid">
        <h6>©-{currentYear},Bangladesh Bridge Authority,All Rights Reserved.</h6>
            </div>
            </div>
        </div>
    );
}

export default Footer;
