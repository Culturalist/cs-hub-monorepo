import { Event } from './event';
import { Note } from './note/note';
import { Organisation } from './organisation/organisation';
import { Page } from './page/page';
import { Person } from './person/person';
import { Post } from './post/post';
import { Project } from './project/project';

export type DocumentApp = 'app' | 'page' | 'person' | 'post' | 'project' | 'event' | 'note' | 'organisation';
export type DocumentSystem = 'theme' | 'label';
export type DocumentAny = DocumentApp | DocumentSystem;

export type PageDocument = Event | Note | Page | Person | Post | Project | Organisation;
