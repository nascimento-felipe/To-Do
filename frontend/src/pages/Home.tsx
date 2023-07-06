import { Plus } from "@phosphor-icons/react";
import { FormEvent, useEffect, useState } from "react";
import Item from "../components/Item";
import { api } from "../lib/axios";

type Task = Array<{
  taskName: string;
  taskDescription: string;
  dueDate: string;
}>;

let date = new Date().toJSON();
let data = date.split(".")[0];
data = data.slice(0, 16);
console.log(data); // 2022-06-17T11:06:50

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(Date);

  const [listaTasks, setListaTasks] = useState<Task>([]);

  useEffect(() => {
    api
      .get("/task", {
        params: {
          size: 2,
          page: 0,
        },
      })
      .then((response) => {
        setListaTasks(response.data.content);
        console.log(data);
      });
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    console.log(dueDate);
    const task = {
      taskName: title,
      taskDescription: description,
      dueDate: dueDate,
    };

    console.log(task);

    try {
      const response = await fetch("http://localhost:8080/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (response.ok) {
        console.log("Data submitted successfully");
        setListaTasks([...listaTasks, task]);
      } else {
        console.log("Error submitting data");
        window.alert(await response.text());
      }
    } catch (error) {
      console.log(`Erro: ${error}`);
    }
  }

  return (
    <main className="bg-primary w-screen h-screen text-white flex flex-col items-center font-mono">
      <h1 className="mt-5 text-5xl">To Do List</h1>

      <form onSubmit={handleSubmit} className="flex flex-col mt-5 w-2/4">
        <label htmlFor="newItem" className="text-2xl">
          Novo Item
        </label>
        <div className="flex flex-row items-center">
          <div className="flex flex-col w-full">
            <input
              type="text"
              id="newItem"
              name="newItem"
              className="rounded-md bg-light_grey p-2 text-slate-700 w-full"
              placeholder="Nome do item"
              value={title}
              onChange={(text) => {
                setTitle(text.target.value);
              }}
            />
            <textarea
              name="descricao"
              id=""
              cols={10}
              rows={2}
              className="mt-2 rounded-md bg-light_grey p-2 text-slate-700 w-full"
              placeholder="Ex.: Comprar refrigerante"
              value={description}
              onChange={(text) => {
                setDescription(text.target.value);
              }}
            ></textarea>

            <input
              id="dueDate"
              type="datetime-local"
              name="dueDate"
              min={data.toString()}
              className="text-slate-700 bg-light_grey mt-2 rounded-md p-2"
              required
              onChange={(dataEscolhida) => {
                setDueDate(dataEscolhida.target.value);
              }}
            />
          </div>

          <button
            type="submit"
            className="ml-2 p-2 bg-secondary h-fit rounded-md hover:rounded-md hover:bg-inside_input hover:text-input transition-colors"
          >
            <Plus size={32} />
          </button>
        </div>
      </form>

      <div className="mt-10 flex flex-col max-h-full min-h-[20vh] justify-evenly">
        {listaTasks.map((task, i) => {
          return (
            <Item
              key={i}
              mensagem={task.taskDescription}
              titulo={task.taskName}
              data={task.dueDate}
            />
          );
        })}
      </div>
    </main>
  );
}
