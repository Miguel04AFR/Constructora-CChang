import React from 'react';
import { MenuBar } from '@/src/components/MenuBar';
import { Footer } from '@/src/components/Footer';
import { CatalogoContainer } from '@/src/components/CatalagoContainer';

export default function CatalogoPage() {
    return(
        <React.Fragment>
            <CatalogoContainer/>
            <Footer/>
        </React.Fragment>
    );
}

