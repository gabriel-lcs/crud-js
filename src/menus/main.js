import { isCancel, select } from "@clack/prompts";
import { createTask } from "./create.js";
import { listTask } from "./listTask.js";

export async function mainMenu() {        
    const escolha = await select({
        message: "O que deseja fazer?",
        options: [
            {label: "Criar nova tarefa", value: "criar"},
            {label: "Listar tarefas existentes", value: "listar"},
            {label: "Sair", value: "sair"}
        ]
    })

    if (isCancel(escolha)){
        return;
    }

    switch (escolha) {
        case "criar":
            createTask();
            break;
        case "listar":
            listTask();
            break;
        case "sair":
            console.log("Até mais!");
            break;
    }
}

    