export const Query = `
  type Query {
    _empty: String
  }
`;

export const GetById = `
  extend type Query {
    getById(id: ID!): Partitura
  }
`;

export const GetAll = `
  type GetAllResponse {
    items: [Partitura]
    total: Int
  }
  extend type Query {
    getAll(offset: Int, pageSize: Int): GetAllResponse
  }
`;

export const Search = `
  type SearchResponse {
    items: [Partitura]
  }
  extend type Query {
    search(query: String): SearchResponse
  }
`;

export const GetRandom = `
  type GetRandomResponse {
    items: [Partitura]
  }
  extend type Query {
    getRandom(count: Int): GetRandomResponse
  }
`;
