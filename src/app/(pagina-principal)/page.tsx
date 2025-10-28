import { HeroC } from "@/src/components/HeroC";
import React from "react";
import { Proyectos } from "@/src/components/Proyectos";
import { Servicios } from "@/src/components/Servicios";
import { Footer } from "@/src/components/Footer";

export default function PaginaPrincipal() {
  return (
    <div> 
      <HeroC/>
      <Proyectos/>
      <Servicios/>
      <Footer/>
    </div>
  );
}