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
            {
                id: 1,
                nombre: 'Muebles de cocina',
                precio: 3000,
                cantidad: 1,
                descripcion: 'Gabinetes a medida en melamina.',
                imagenUrl: '/remodelaciones/1/items/1.jpg'
            },
            {
                id: 2,
                nombre: 'Encimera',
                precio: 1500,
                cantidad: 1,
                descripcion: 'Encimera de cuarzo.',
                imagenUrl: '/remodelaciones/1/items/2.jpg'
            },
            {
                id: 3,
                nombre: 'Electrodomésticos',
                precio: 2000,
                cantidad: 1,
                descripcion: 'Cocina, campana y horno integrados.',
                imagenUrl: '/remodelaciones/1/items/3.jpg'
            },
            {
                id: 4,
                nombre: 'Instalaciones',
                precio: 2000,
                cantidad: 1,
                descripcion: 'Tuberías, electricidad y mano de obra.',
                imagenUrl: '/remodelaciones/1/items/4.jpg'
            }
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
            {
                id: 1,
                nombre: 'Sanitario y lavabo',
                precio: 800,
                cantidad: 1,
                descripcion: 'Sanitario y lavabo modernos.',
                imagenUrl: '/remodelaciones/2/items/1.jpg'
            },
            {
                id: 2,
                nombre: 'Revestimientos',
                precio: 1200,
                cantidad: 1,
                descripcion: 'Baldosas y cerámica.',
                imagenUrl: '/remodelaciones/2/items/2.jpg'
            },
            {
                id: 3,
                nombre: 'Grifería',
                precio: 500,
                cantidad: 1,
                descripcion: 'Juego de grifería de alta calidad.',
                imagenUrl: '/remodelaciones/2/items/3.jpg'
            },
            {
                id: 4,
                nombre: 'Mano de obra',
                precio: 2000,
                cantidad: 1,
                descripcion: 'Colocación y trabajos de albañilería.',
                imagenUrl: '/remodelaciones/2/items/4.jpg'
            }
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
            // precio is per square-meter (1.25 per m²)
            {
                id: 1,
                nombre: 'Pintura de alta resistencia',
                precio: 1.25,
                cantidad: 200,
                descripcion: 'Precio por m². Litros/consumo estimado según superficie.',
                imagenUrl: '/remodelaciones/3/items/1.jpg'
            },
            {
                id: 2,
                nombre: 'Preparación de superficie',
                precio: 500,
                cantidad: 1,
                descripcion: 'Limpieza y reparación de grietas.',
                imagenUrl: '/remodelaciones/3/items/2.jpg'
            }
        ]
    }
];

export default remodelaciones;
