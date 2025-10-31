import { HeroC } from "@/src/components/pagina-principal/HeroC";
import React from "react";
import { Proyectos } from "@/src/components/pagina-principal/Proyectos";
import { Servicios } from "@/src/components/pagina-principal/Servicios";
import { Footer } from "@/src/components/ui/Footer";
import { Nosotros } from "@/src/components/pagina-principal/Nosotros";
import { Contactanos } from "@/src/components/pagina-principal/Contactanos";

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