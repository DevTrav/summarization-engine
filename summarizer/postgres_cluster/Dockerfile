# Use the official PostgreSQL base image
FROM postgres:15

# Defines the working directory for postgres
# WORKDIR /summarization-engine/summarizer/postgres_cluster

# Set environment variables for default credentials (override with -e at runtime)
ENV POSTGRES_USER=eventuser
ENV POSTGRES_PASSWORD=eventpass
ENV POSTGRES_DB=event-db

# Copy custom initialization scripts (if any)
# COPY init-scripts/ /docker-entrypoint-initdb.d/

# Expose the PostgreSQL default port
EXPOSE 5432

# Run PostgreSQL
CMD ["postgres"]
