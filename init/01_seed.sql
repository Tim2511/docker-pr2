-- Выполняется автоматически только при первом старте postgres (пока том db_data пуст)
CREATE TABLE IF NOT EXISTS items (
    id   SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

INSERT INTO items (name) VALUES ('first item'), ('second item');
