export const Url = `
  type Url {
    url: String
  }
`;

export const Source = `
  type Source {
    source: String
  }
`;

export const AudioFormat = `
  type AudioFormat {
    format: String
    url: String
  }
`;

export const PlayList = `
  type Playlist {
    title: String
    description: String
    duration: Int
    formats: [AudioFormat]
  }
`

export const Lyrics = `
  type Lyrics {
    text: String
  }
`;

export const Partitura = `
  type Partitura {
    _id: ID
    title: String
    genre: String
    poetry: [String]
    music: [String]
    scores: [Url]
    lyrics: Lyrics
    cover: Source
    playlist: [Playlist],
    source: Url
  }
`;
