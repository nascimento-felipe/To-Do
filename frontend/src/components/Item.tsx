import { DotsThreeVertical } from "@phosphor-icons/react";

interface ItemProps {
  mensagem: string;
  data: string;
  titulo: string;
}

export default function Item({ mensagem, titulo, data }: ItemProps) {
  return (
    <div className="flex flex-row bg-secondary p-2 text-light_grey rounded-md m-2">
      <div className="flex flex-col text-white bg-inside_input p-2 rounded-md m-2 min-w-[25vw]">
        <span>{titulo}</span>
        <span>{mensagem}</span>
      </div>
      <div className="flex items-center">
        <span>{data}</span>
        <DotsThreeVertical size={32} />
      </div>
    </div>
  );
}
