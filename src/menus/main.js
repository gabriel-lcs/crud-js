import { isCancel, select } from "@clack/prompts";
import { createTask } from "./create.js";
import { listTask } from "./listTask.js";

export async function mainMenu() {   
    while (true){
        const escolha = await select({
            message: "O que deseja fazer?",
            options: [
                {label: "Criar nova tarefa", value: "criar"},
                {label: "Listar tarefas existentes", value: "listar"},
                {label: "Sair", value: "sair"}
            ]
        })
    
        if (isCancel(escolha) || escolha === "sair"){
            console.log("Até mais!");
            return;
        }
    
        switch (escolha) {
            case "criar":
                await createTask();
                break;
            case "listar":
                await listTask();
                break;
        }
    }     
}

    