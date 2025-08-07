import Image from 'next/image';
import type { SVGProps } from "react";

export const Icons = {
  logo: (props: Omit<SVGProps<SVGSVGElement>, 'src'>) => (
    <Image
      src="/logo.png" // O caminho começa com '/' para referenciar a pasta 'public'
      alt="Backpech-Bot Logo"
      width={40}
      height={40}
      className={props.className}
    />
  ),
};
