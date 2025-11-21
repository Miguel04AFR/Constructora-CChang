import React from 'react';
import { RemodelacionesCarousel } from '@/src/components/remodelaciones/RemodelacionesCarousel';
// data import removed from top-level to avoid server-only debug logs

export default function RenovacionesPage() {
    return (
        <React.Fragment>
            <RemodelacionesCarousel />
        </React.Fragment>
    );
}
