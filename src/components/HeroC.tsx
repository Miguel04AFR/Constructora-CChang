import React from 'react'
import {roboto} from '@/src/config/font'

interface HeroCProps {
    title: string;
    subtitle: string;
    className: string;
}

export const HeroC = ({title, subtitle,className} : HeroCProps) => {
  return (
    <div className={'mt-3 ${className}'}>
    <h1 className={'text-4xl font-semibold antialiased ${roboto.className}  my-10'}>
        {title}
        </h1>
    { subtitle && (
        <h2 className={'text-2xl font-light antialiased ${roboto.className} mb-10'}>

        {subtitle}
        </h2>
    )

    }

    </div>
  )
}
