import React, { useState, useEffect, Fragment } from 'react';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';

export interface Device {
    data: [];
}

const Document = () => {
    

    return (
        <Fragment>
            <Header />
            <div className="container">
                
            </div >
            <Footer />
        </Fragment >
    );
}

export default Document;
