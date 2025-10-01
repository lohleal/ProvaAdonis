import React from "react";
import { LogoCaixa, LogoTitulo, LogoSubtitulo } from "./style";

export default function Logo({ size = "normal" }) {
  return (
    <LogoCaixa>
      <LogoTitulo className={size}>BanBoo</LogoTitulo>
      <LogoSubtitulo>Seu banco monstruoso</LogoSubtitulo>
    </LogoCaixa>
  );
}
