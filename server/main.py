from fastapi import FastAPI
import psycopg2
import os
import uvicorn

app = FastAPI()

# Database connection
DATABASE_URL = os.getenv("DATABASE_URL")

conn = psycopg2.connect(DATABASE_URL)

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI!"}

@app.get("/filter-data")
def filter_data(start_date: str, end_date: str):
    cursor = conn.cursor()
    query = """
        SELECT * FROM daily_rental_filtered
        WHERE started_at BETWEEN %s AND %s
    """
    cursor.execute(query, (start_date, end_date))
    result = cursor.fetchall()
    cursor.close()
    return {"data": result}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)