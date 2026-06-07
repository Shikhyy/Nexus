import psycopg2
import psycopg2.extras
import os

DATABASE_URL = os.environ.get("DATABASE_URL")

def get_db_connection():
    if not DATABASE_URL:
        raise Exception("DATABASE_URL environment variable is not set")
    # Using RealDictCursor to maintain compatibility with sqlite3.Row
    conn = psycopg2.connect(DATABASE_URL, cursor_factory=psycopg2.extras.RealDictCursor)
    return conn

def init_db():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                email TEXT UNIQUE NOT NULL,
                name TEXT NOT NULL,
                company TEXT NOT NULL,
                hashed_password TEXT NOT NULL
            )
        """)
        conn.commit()
        conn.close()
        print("Successfully initialized PostgreSQL database.")
    except Exception as e:
        print(f"Failed to initialize database: {e}")

# Initialize on module load
if DATABASE_URL:
    init_db()
