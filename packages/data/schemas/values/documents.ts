import { Event, Note, Page, Person, Post, Project } from '../documents';

export type DocumentApp = 'page' | 'person' | 'post' | 'project' | 'event' | 'note';
export type DocumentSystem = 'app' | 'theme' | 'label';
export type DocumentAny = DocumentApp | DocumentSystem;

export type PageDocument = Event | Note | Page | Person | Post | Project;
