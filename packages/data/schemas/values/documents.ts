import { Event, Note, Organisation, Page, Person, Post, Project } from '../documents';

export type DocumentApp = 'app' | 'page' | 'person' | 'post' | 'project' | 'event' | 'note' | 'organisation';
export type DocumentSystem = 'theme' | 'label';
export type DocumentAny = DocumentApp | DocumentSystem;

export type PageDocument = Event | Note | Page | Person | Post | Project | Organisation;
