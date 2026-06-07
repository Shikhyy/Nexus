-- Run this in the Supabase SQL Editor to provision the database schema

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    company TEXT NOT NULL,
    hashed_password TEXT NOT NULL
);

-- Optional: Create an index on email for faster login lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
