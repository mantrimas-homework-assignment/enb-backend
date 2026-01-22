## Table of Contents

- [Technology Stack](#technology-stack)
- [Architecture Overview](#architecture-overview)
- [Project Structure](#project-structure)
- [Data Model](#data-model)
- [Design Patterns](#design-patterns)
- [Setup and Installation](#setup-and-installation)
- [Running the Application](#running-the-application)
- [Database Management](#database-management)
- [API Endpoints](#api-endpoints)

## Technology Stack

- **Framework**: NestJS (Node.js)
- **Language**: TypeScript
- **Database**: PostgreSQL 17
- **ORM**: TypeORM
- **Cloud Storage**: Google Cloud Storage
- **Containerization**: Docker & Docker Compose

## Architecture Overview

This application follows a **modular, layered architecture** inspired by Clean Architecture principles. The codebase is organized into distinct modules, each with clear separation of concerns across different layers.

## Project Structure

```
src/
├── app.module.ts                    # Root application module
├── main.ts                          # Application entry point
│
├── common/                          # Shared utilities and interfaces
│   └── usecase.common.ts           # UseCase interface definition
│
├── database/                        # Database configuration and scripts
│   ├── config/
│   │   └── datasource.config.ts    # TypeORM configuration
│   ├── di/
│   │   └── database-tokens.di.ts   # Dependency injection tokens
│   ├── providers/
│   │   └── database.provider.ts    # Database connection provider
│   ├── scripts/                    # Database seeding scripts
│   │   ├── seed.ts                 # Master seed script
│   │   ├── seed-games.ts
│   │   ├── seed-hardware.ts
│   │   ├── seed-platforms.ts
│   │   ├── seed-regions.ts
│   │   ├── seed-product-presets.ts
│   │   └── seed-product-listings.ts
│   └── database.module.ts          # Global database module
│
├── clients/                         # External service integrations
│   └── google-cloud-storage/
│       ├── di/                     # DI tokens
│       ├── providers/              # GCS client provider
│       ├── services/               # GCS-related services
│       └── google-cloud-storage.module.ts
│
└── product-listings/                # Product listings feature module
    ├── controllers/
    │   └── product-listing.controller.ts
    ├── di/
    │   └── product-listings-tokens.di.ts
    ├── dtos/
    │   └── product-listings-response.dto.ts
    ├── entities/                   # Domain entities
    │   ├── game.entity.ts
    │   ├── hardware.entity.ts
    │   ├── platform.entity.ts
    │   ├── region.entity.ts
    │   ├── product-preset.entity.ts
    │   └── product-listing.entity.ts
    ├── repositories/
    │   ├── postgres/
    │   │   └── product-listing.repository.ts
    │   └── product-listing-repository.interface.ts
    ├── services/                   # Use case implementations
    │   ├── get-all-product-listings.service.ts
    │   └── get-product-listings-by-fuzzy-name.service.ts
    └── product-listings.module.ts
```

### Entity Descriptions

- **Game**: Represents a video game (e.g., "Call of Duty", "FIFA")
- **Hardware**: Hardware specifications or bundles
- **Platform**: Gaming platform (e.g., PlayStation, Xbox, PC)
- **Region**: Geographic region for product availability
- **ProductPreset**: A unique combination of game, hardware, platform, and region with associated image
- **ProductListing**: Individual product offerings with pricing, cashback, and discount information

## Design Patterns

### 1. Repository Pattern

Abstracts data access logic behind interfaces:

```typescript
// Interface definition
interface ProductListingRepositoryInterface {
  findAll(options?: PaginationOptions): Promise<[ProductListing[], number]>;
  findByFuzzyGameName(options: SearchOptions): Promise<[ProductListing[], number]>;
}

// Concrete implementation
class ProductListingRepository implements ProductListingRepositoryInterface {
  constructor(private readonly repository: Repository<ProductListing>) {}
  // Implementation details...
}
```

### 2. Use Case Pattern

Each service implements a specific use case:

```typescript
interface UseCase<TInput, TOutput> {
  execute(payload: TInput): Promise<TOutput>;
}

class GetAllProductListingsService implements GetAllProductListingsUseCase {
  async execute(): Promise<[ProductListing[], number]> {
    // Business logic...
  }
}
```

### 3. Dependency Injection with Tokens

Custom DI tokens for type-safe dependency injection:

```typescript
export const ProductListingsDiTokens = {
  ProductListingRepositoryInterface: Symbol('ProductListingRepositoryInterface'),
  GetAllProductListingsService: Symbol('GetAllProductListingsService'),
  // ... other tokens
};
```

### 4. Factory Pattern

Module providers use factory functions for dependency resolution:

```typescript
{
  provide: ProductListingsDiTokens.ProductListingRepositoryInterface,
  useFactory: (repository: Repository<ProductListing>) => 
    new ProductListingRepository(repository),
  inject: [ProductListingsDiTokens.PostgresProductListingRepositoryInterface]
}
```

### 5. Global Module Pattern

`DatabaseModule` and `GoogleCloudStorageModule` are decorated with `@Global()` to make their providers available application-wide without explicit imports.

## Setup and Installation

### Prerequisites

- Node.js (v18+)
- Docker and Docker Compose
- Google Cloud Storage credentials (for cloud storage features)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd enb-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the root directory:
   ```env
   # Database
   POSTGRES_HOST=localhost
   POSTGRES_PORT=5432
   POSTGRES_USER=your_user
   POSTGRES_PASSWORD=your_password
   POSTGRES_DB_NAME=enb_database
   
   # Application
   PORT=3000
   NODE_ENV=development
   
   # Google Cloud Storage
   GOOGLE_APPLICATION_CREDENTIALS=./credentials/gcp.json
   ```

4. **Setup Database**
   ```bash
   # Start PostgreSQL container
   docker-compose up -d
   ```

5. **Place GCP Credentials**
   
   Place your Google Cloud Platform service account JSON file in:
   ```
   credentials/gcp.json
   ```

## Running the Application

### Development Mode

```bash
# Watch mode with hot reload
npm run start:dev

# Debug mode
npm run start:debug
```

### Production Mode

```bash
# Build the application
npm run build

# Run production server
npm run start:prod
```

The API will be available at `http://localhost:3000` (or the port specified in `.env`)

## Database Management

### Seeding the Database

The application provides comprehensive seeding scripts:

```bash
# Seed all data (regions → platforms → hardware → games → presets → listings)
npm run seed

# Seed individual entities
npm run seed:regions
npm run seed:platforms
npm run seed:hardware
npm run seed:games
npm run seed:product-presets
npm run seed:product-listings

# Clear all data
npm run db:clear

# Reset database (clear + seed)
npm run db:reset
```

**Note**: Seeding order matters due to foreign key constraints. The master seed script (`npm run seed`) handles the correct order automatically.

## API Endpoints

### Product Listings

**GET** `/product-listings/list`
- Retrieves all product listings with pagination
- Returns product listings with full relationship data (game, hardware, platform, region)

**GET** `/product-listings/list?search={searchTerm}`
- Fuzzy search for product listings by game name
- Uses PostgreSQL trigram similarity matching
- Returns results ordered by relevance

### Response Format

```json
{
  "productListings": [
    {
      "uuid": "550e8400-e29b-41d4-a716-446655440000",
      "price": 59.99,
      "discountedPrice": 49.99,
      "cashback": 5.00,
      "likeCount": 120,
      "productPreset": {
        "imageUrlKey": "products/game-xyz.jpg",
        "game": { "name": "Game Name" },
        "hardware": { "name": "Standard Edition" },
        "platform": { "name": "PlayStation 5", "iconUrlKey": "platform/platform-xyz.svg" },
        "region": { "name": "North America" }
      }
    }
  ],
  "productListingCount": 150
}
```
