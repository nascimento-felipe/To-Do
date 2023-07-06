import { DotsThreeVertical } from "@phosphor-icons/react";
import dayjs from "dayjs";
import { useState } from "react";
import ContextMenu from "./ContextMenu";

interface ItemProps {
  mensagem: string;
  data: Date;
  titulo: string;
}

export default function Item({ mensagem, titulo, data }: ItemProps) {
  const diaFormatado = dayjs(data).format("DD/MM/YYYY");
  const horaFormatada = dayjs(data).format("HH:mm");

  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0 });

  function handleContextMenu(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
    e.preventDefault();
    console.log("clicou nos 3 botoes");

    const { pageX, pageY } = e;

    setContextMenu({ show: true, x: pageX, y: pageY });
  }

  const contextMenuClose = () => setContextMenu({ show: false, x: 0, y: 0 });

  return (
    <div className="flex flex-row bg-secondary p-2 text-light_grey rounded-md m-2">
      <div className="flex flex-col text-white bg-inside_input p-2 rounded-xl m-2 min-w-[25vw]">
        <span>{titulo}</span>
        <span>{mensagem}</span>
      </div>
      <div className="flex items-center">
        <div className="flex flex-col">
          <span>{diaFormatado}</span>
          <span>{horaFormatada}</span>
        </div>
        <DotsThreeVertical
          className="ml-5"
          onContextMenu={handleContextMenu}
          onClick={handleContextMenu}
          size={24}
          style={{ cursor: "pointer" }}
        />

        {contextMenu.show && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            closeContextMenu={contextMenuClose}
          />
        )}
      </div>
    </div>
  );
}
