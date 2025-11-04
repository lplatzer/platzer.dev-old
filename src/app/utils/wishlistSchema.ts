export const WISHLIST_SCHEMA = `
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
`;
