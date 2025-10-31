import { HeroC } from "@/src/components/HeroC";
import React from "react";
import { Proyectos } from "@/src/components/Proyectos";
import { Servicios } from "@/src/components/Servicios";
import { Footer } from "@/src/components/Footer";
import { Nosotros } from "@/src/components/Nosotros";
import { Contactanos } from "@/src/components/Contactanos";

export default function PaginaPrincipal() {
  return (
    <React.Fragment> {/* hace que no se genere un div innecesario */}
      <HeroC/>
      <Proyectos/>
      <Servicios/>
      <Nosotros/>
      <Contactanos/>
    </React.Fragment>
  );
}