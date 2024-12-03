interface TodoModel {
    id: number;
    title: string;
    description?: string;
    project_id: number;
    completed: boolean;
    created_at: string;
    updated_at: string;
}

interface CreateTodoParams {
    title: string;
    description?: string;
    project_id: number;
    completed?: boolean;
}

interface UpdateTodoParams {
    title?: string;
    description?: string;
    completed?: boolean;
}