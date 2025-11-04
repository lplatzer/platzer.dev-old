# Manual Wishlist Schema Setup

Due to version compatibility issues between the SurrealDB JavaScript SDK and your cloud instance, here's how to manually set up the schema:

## Option 1: Use SurrealDB CLI or Web Interface

If you have access to the SurrealDB web interface or CLI, run these commands:

```surql
-- Select the namespace and database
USE NS coffeeworldmap DB wishlist;

-- Define the wishlist table
DEFINE TABLE wishlist SCHEMAFULL;

-- Define fields for the wishlist table
DEFINE FIELD title ON TABLE wishlist TYPE string
    ASSERT $value != NONE AND string::len($value) > 0;

DEFINE FIELD description ON TABLE wishlist TYPE string
    ASSERT $value != NONE;

DEFINE FIELD link ON TABLE wishlist TYPE string
    ASSERT $value != NONE AND string::len($value) > 0;

DEFINE FIELD idealoLink ON TABLE wishlist TYPE option<string>;

DEFINE FIELD geizhalsLink ON TABLE wishlist TYPE option<string>;

DEFINE FIELD imageUrl ON TABLE wishlist TYPE option<string>;

DEFINE FIELD fulfilled ON TABLE wishlist TYPE bool
    DEFAULT false;

DEFINE FIELD createdAt ON TABLE wishlist TYPE datetime
    DEFAULT time::now()
    READONLY;

-- Define indexes for better query performance
DEFINE INDEX idx_wishlist_created ON TABLE wishlist COLUMNS createdAt;
DEFINE INDEX idx_wishlist_fulfilled ON TABLE wishlist COLUMNS fulfilled;
```

## Option 2: Use the Schemaless Approach

Alternatively, the wishlist will work WITHOUT a formal schema. SurrealDB can operate in schemaless mode, where the table structure is inferred from the data you insert.

The current implementation will automatically create the table and fields when you add your first wishlist item.

## Testing Without Schema

To test if everything works without the formal schema:

1. Start your dev server: `pnpm dev`
2. Navigate to `/tools/wishlist` in your browser
3. The page should load (empty at first)
4. You can manually add items using the seed script

## Adding Test Data

Edit `src/app/seed/wishlist_data.ts` with your items, then either:

### From the Next.js app (recommended):
Create a simple admin page or API route to seed data, or add items directly via the database interface.

### Direct Database Insert (if you have CLI access):
```surql
USE NS coffeeworldmap DB wishlist;

CREATE wishlist CONTENT {
    title: "Festool Systainer³ Organizer SYS3-ORG L 89",
    description: "Professional organizer system for small parts and tools",
    link: "https://www.festool.de/produkte/systainer-sys-storage/204850---sys3-org-l-89",
    idealoLink: "https://www.idealo.de/preisvergleich/OffersOfProduct/6849234_-systainer-3-organizer-sys3-org-l-89-festool.html",
    geizhalsLink: "https://geizhals.de/festool-systainer-3-organizer-sys3-org-l-89-204850-a2345678.html",
    imageUrl: "https://www.festool.de/Images/SYS3-ORG-L-89_204850_5.jpg",
    fulfilled: false,
    createdAt: time::now()
};
```

## Current Setup

The wishlist feature is configured to use:
- **Namespace**: `coffeeworldmap` (same as your coffee data)
- **Database**: `wishlist` (separate database within the namespace)
- **Table**: `wishlist`

This keeps your wishlist data separate from coffee data while using the same namespace/credentials.
