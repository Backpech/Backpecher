import Image from 'next/image';
import type { SVGProps } from "react";

export const Icons = {
  logo: (props: Omit<SVGProps<SVGSVGElement>, 'src'>) => (
    <Image
      src="/logo.png" // Caminho para a sua imagem na pasta public
      alt="Backpech-Bot Logo"
      width={40} // Defina a largura desejada
      height={40} // Defina a altura desejada
      className={props.className} // Isso permite que você ainda passe classes de estilo
    />
  ),
};
