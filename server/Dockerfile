# Stage 1: Build
FROM python:3.9-slim as build

WORKDIR /app

# Copy only the requirements file first (to leverage Docker layer caching)
COPY requirements.txt ./server/

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# Stage 2: Run
FROM python:3.9-slim

WORKDIR /app

# Copy everything from the build stage
COPY --from=build /app /app

# Expose the port (optional)
EXPOSE 8000

# Run the FastAPI server
CMD ["uvicorn", "server.main:app", "--host", "0.0.0.0", "--port", "8000"]
