import mongoose from 'mongoose';

export interface Type {
  _id: string;
  title: string;
  genre: string;
  poetry: string[];
  music: string[];
  scores: { url: string }[];
  lyrics: { text: string };
  cover: { source: string };
  playlist: {
    title: string;
    description: string;
    duration: string;
    formats: { format: string, url: string }[];
  }[];
  source: { url: string };
}

const Schema = new mongoose.Schema<Type>({
  title: {type: String, index: true, text: true},
  genre: String,
  poetry: [String],
  music: [String],
  scores: [{url: String}],
  lyrics: {text: String},
  cover: {source: String},
  playlist: [{
    title: String,
    description: String,
    duration: Number,
    formats: [{format: String, url: String}],
  }],
  source: {url: String}
});

Schema.index({title: 'text'});

export default Schema;
