import { Check, Trash } from "@phosphor-icons/react";
import { useRef } from "react";
import { useOnClickOutside } from "../utils/useOnClickOutside";

interface ContextMenuProps {
  x: number;
  y: number;
  closeContextMenu: () => void;
}

export default function ContextMenu({
  x,
  y,
  closeContextMenu,
}: ContextMenuProps) {
  const contextMenuRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(contextMenuRef, closeContextMenu);

  return (
    <div
      style={{ top: `${y}px`, left: `${x}px` }}
      className="absolute z-20 flex flex-col bg-elevated rounded-md"
      ref={contextMenuRef}
    >
      <div className="flex flex-row p-2 hover:rounded-md hover:bg-green-600 transition-all">
        <Check size={24} className="mr-5" />
        <h1>Concluir tarefa</h1>
      </div>

      <div className="flex flex-row p-2 mt-2 hover:rounded-md hover:bg-red-600 transition-all">
        <Trash size={24} className="mr-5" />
        <h1>Deletar tarefa</h1>
      </div>
    </div>
  );
}
