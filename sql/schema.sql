CREATE TABLE tasks(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    status text NOT NULL DEFAULT 'Em andamento',
    created_at timestamptz NOT NULL DEFAULT now()
);