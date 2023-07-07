import { DotsThreeVertical } from "@phosphor-icons/react";
import dayjs from "dayjs";
import { useState } from "react";
import { api } from "../lib/axios";
import ContextMenu from "./ContextMenu";

interface ItemProps {
  task: {
    id?: string;
    taskName: string;
    taskDescription: string;
    dueDate: string;
  };
  itemDeleted: () => void;
}

export default function Item({ task, itemDeleted }: ItemProps) {
  const diaFormatado = dayjs(task.dueDate).format("DD/MM/YYYY");
  const horaFormatada = dayjs(task.dueDate).format("HH:mm");

  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0 });

  async function deleteTask() {
    try {
      const resultado = await api.delete(`/task/${task.id}`);

      if (resultado.status == 200) {
        alert("Deletado com sucesso!");
        await itemDeleted();
        return;
      } else {
        alert("Algo deu errado.");
        return;
      }
    } catch (error) {
      console.log(`Erro: ${error}`);
      return;
    }
  }

  function handleContextMenu(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
    e.preventDefault();

    const { pageX, pageY } = e;

    setContextMenu({ show: true, x: pageX, y: pageY });
  }

  const contextMenuClose = () => setContextMenu({ show: false, x: 0, y: 0 });

  return (
    <div className="flex flex-row bg-secondary p-2 text-light_grey rounded-md m-2">
      <div className="flex flex-col text-white bg-inside_input p-2 rounded-xl m-2 min-w-[25vw]">
        <span>{task.taskName}</span>
        <span>{task.taskDescription}</span>
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
            deleteItem={deleteTask}
          />
        )}
      </div>
    </div>
  );
}
