import { pool } from "../database/database.js"

export const taskManager = {
    async create(name){
        const taskCreate = await pool.query("INSERT INTO tasks (name) VALUES ($1) RETURNING id, name, status, created_at;", [name.trim()]);

        return taskCreate.rows[0];
    },
    async toArray(){
        const taskSelect = await pool.query("SELECT id, name, status, created_at FROM tasks ORDER BY created_at;");

        return taskSelect.rows;
    },
    async get(id){
        const taskGet = await pool.query("SELECT id, name, status, created_at FROM tasks WHERE id = ($1);", [id]);

        return taskGet.rows[0];
    },
    async rename(id, name){
        const taskUpdate = await pool.query("UPDATE tasks SET name = ($1) WHERE id = ($2) RETURNING id, name, status, created_at;", [name.trim(), id]);

        return taskUpdate.rows[0];
    },
    async setStatus(id, status){
        const setStatus = await pool.query("UPDATE tasks SET status = ($1) WHERE id = ($2) RETURNING id, name, status, created_at;", [status, id]);

        return setStatus.rows[0];
    },
    async delete(id){
        const deletar = await pool.query("DELETE FROM tasks WHERE id = ($1) RETURNING id, name, status, created_at;", [id]);

        return deletar.rows[0];
    }
}