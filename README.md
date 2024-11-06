# Hexagonal Architecture Example

This is an example of a implementation of hexagonal architecture using TypeScript.

## Requirements

To run this project you need to setup the following tools:

- [Node.js](https://nodejs.org/pt)
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Installation 

Follow these instructions to run this project:

1. Install dependencies:

```bash
pnpm install
```

2. Create a `.env` file based on the `.env.example` file.

3. Run docker compose:

```bash
docker compose up -d
```

4. Run the migrations:

```bash
pnpm db:migrate 
```

5. Run the server:

```bash
pnpm dev
```

## Folder Structure

```
src/
├── adapter/          # Adapters layer
│   └── database/     # Database adapters
│   └── env/          # Environment variables adapters
│   └── http/         # HTTP adapters
│   └── schedulers/   # Schedulers adapters
│   └── services/     # Services adapters
├── core/             # Core layer
│   ├── entities/     # Entities
│   ├── repositories/ # Repository interfaces
│   └── enums/        # Enums
│   └── ports/        # Ports
│   └── useCases/     # Use cases
|   main.ts           # Entry point
```







