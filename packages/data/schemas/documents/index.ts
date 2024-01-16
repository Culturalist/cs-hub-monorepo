import { Event } from "./event";
import { Note } from "./note";
import { Organisation } from "./organisation";
import { Page } from "./page";
import { Person } from "./person";
import { Post } from "./post";
import { Project } from "./project";
import { Report } from "./report";

export type PageDocument = Event | Note | Page | Person | Post | Project | Report | Organisation;

export * from "./event";
export * from "./page";
export * from "./person";
export * from "./post";
export * from "./project";
export * from "./report";
export * from "./note";
export * from "./organisation";
