import { HeroC } from "@/src/components/HeroC";
import React from "react";
import { Proyectos } from "@/src/components/Proyectos";
import { Servicios } from "@/src/components/Servicios";
import { Footer } from "@/src/components/Footer";
import { Nosotros } from "@/src/components/Nosotros";

export default function PaginaPrincipal() {
  return (
    <div> 
      <HeroC/>
      <Proyectos/>
      <Servicios/>
      <Nosotros/>
      <Footer/>
    </div>
  );
}