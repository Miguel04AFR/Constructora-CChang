import type { Remodelacion } from '@/src/Services/Remodelacion';

export const remodelaciones: Remodelacion[] = [
    {
        id: 1,
        nombre: 'Remodelación de Cocina Integral',
        precio: 8500,
        descripcion: 'Renovación completa de cocina: mobiliario, encimeras y distribución.',
    imagenUrl: '/remodelaciones/1/cover.jpg',
        descripcionDetallada:
            'Proyecto integral de cocina que incluye diseño personalizado, fabricación e instalación de muebles, encimeras de alta calidad, instalaciones eléctricas y de fontanería, y selección de acabados. Ideal para renovar la funcionalidad y estética de su cocina.',
        items: [
            'Muebles de cocina; Gabinetes a medida en melamina.; /remodelaciones/1/items/1.jpg',
            'Encimera; Encimera de cuarzo.; /remodelaciones/1/items/2.jpg',
            'Electrodomésticos; Cocina, campana y horno integrados.; /remodelaciones/1/items/3.jpg',
            'Instalaciones; Tuberías, electricidad y mano de obra.; /remodelaciones/1/items/4.jpg'
        ]
    },
    {
        id: 2,
        nombre: 'Remodelación de Baño Principal',
        precio: 4500,
        descripcion: 'Actualización de acabados, grifería y distribución para baño principal.',
    imagenUrl: '/remodelaciones/2/cover.jpg',
        descripcionDetallada:
            'Remodelación completa del baño principal con cambio de revestimientos, instalación de sanitarios y grifería moderna, mejora del sistema de agua y renovación de la iluminación y ventilación para mayor confort y eficiencia.',
        items: [
            'Sanitario y lavabo; Sanitario y lavabo modernos.; /remodelaciones/2/items/1.jpg',
            'Revestimientos; Baldosas y cerámica.; /remodelaciones/2/items/2.jpg',
            'Grifería; Juego de grifería de alta calidad.; /remodelaciones/2/items/3.jpg',
            'Mano de obra; Colocación y trabajos de albañilería.; /remodelaciones/2/items/4.jpg'
        ]
    },
    {
        id: 3,
        nombre: 'Remodelación de Pintura Exterior',
        // This package's total price will be derived from the items below (1.25 per m² * cantidad + other items)
        // Compute: 1.25 * 200 (m²) = 250; preparación = 500 => total = 750
        precio: 750,
        descripcion:
            'Pintura completa de la fachada exterior con materiales resistentes al clima. El precio indicado es por metro cuadrado en el item correspondiente.',
    imagenUrl: '/remodelaciones/3/cover.jpg',
        descripcionDetallada:
            'Pintura de fachada que incluye preparación de superficies, aplicación de imprimantes y recubrimientos de alta durabilidad. Se trabaja por metro cuadrado y se ofrecen opciones de color y acabado según las necesidades del cliente.',
        items: [
            'Pintura de alta resistencia; Precio por m²: $1.25. Litros/consumo estimado según superficie.; /remodelaciones/3/items/1.jpg',
            'Preparación de superficie; Limpieza y reparación de grietas.; /remodelaciones/3/items/2.jpg'
        ]
    },
     {
        id: 4,
        nombre: 'Remodelación de jardín y áreas exteriores',
        precio: 1350,
        descripcion:
            'Remodelación de jardín y áreas exteriores con enfoque en la sostenibilidad y el uso de materiales ecológicos.',
    imagenUrl: '/remodelaciones/4/cover.jpg',
        descripcionDetallada:
            'Remodelación de jardín que incluye preparación del terreno, selección e instalación de plantas nativas, creación de senderos ecológicos y sistemas de riego eficientes. Se trabaja por metro cuadrado y se ofrecen opciones personalizadas según las necesidades del cliente.',
        items: [
            'Muebles de madera preciosa; Muebles ligeros de madera preciosa para exteriores.; /remodelaciones/4/items/1.jpg',
            'Decoración de jardín; Elementos decorativos para el jardín.; /remodelaciones/4/items/2.jpg'
        ]
    }
];

export default remodelaciones;

// (debug logs removed)
