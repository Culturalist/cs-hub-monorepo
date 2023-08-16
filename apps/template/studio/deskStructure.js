import {
    MasterDetailIcon,
    ControlsIcon,
    EarthGlobeIcon,
    HomeIcon,
    FolderIcon,
    DocumentsIcon,
    ThListIcon,
    BulbOutlineIcon,
    PresentationIcon,
    BasketIcon,
    UsersIcon,
    RobotIcon,
    BookIcon,
    TagIcon,
    TransferIcon,
    CogIcon,
    PackageIcon,
    EditIcon,
    UnknownIcon,
    SearchIcon,
    TerminalIcon,
    CalendarIcon
} from '@sanity/icons';
import app from '../app.json';
// import { defaultDocumentNode } from './defaultDocumentNode';

const { appName } = app;

export default {
    name: 'desk',
    title: 'Desk',
    icon: MasterDetailIcon,
    // defaultDocumentNode: defaultDocumentNode,
    structure: (S, context) =>
        S.list()
            .title('Content')
            .items([
                S.listItem().title('Home').icon(HomeIcon).child(S.document().schemaType('app').documentId(appName)),
                S.listItem()
                    .title('Pages')
                    .icon(DocumentsIcon)
                    .child(
                        S.documentTypeList('page')
                            .title('Pages')
                            .filter('_type == $type && app._ref == $appName')
                            .params({ type: 'page', appName: appName })
                            .initialValueTemplates([S.initialValueTemplateItem('page-by-app', { appName: appName })])
                    ),
                S.listItem()
                    .title('Projects')
                    .icon(PresentationIcon)
                    .child(
                        S.documentTypeList('project')
                            .title('Projects')
                            .filter('_type == $type && app._ref == $appName')
                            .params({ type: 'project', appName: appName })
                            .initialValueTemplates([S.initialValueTemplateItem('project-by-app', { appName: appName })])
                    ),
                S.listItem()
                    .title('Events')
                    .icon(CalendarIcon)
                    .child(
                        S.documentTypeList('event')
                            .title('Events')
                            .filter('_type == $type && app._ref == $appName')
                            .params({ type: 'event', appName: appName })
                            .initialValueTemplates([S.initialValueTemplateItem('event-by-app', { appName: appName })])
                    ),
                S.listItem()
                    .title('Posts')
                    .icon(DocumentsIcon)
                    .child(
                        S.documentTypeList('post')
                            .title('Posts')
                            .filter('_type == $type && app._ref == $appName')
                            .params({ type: 'post', appName: appName })
                            .initialValueTemplates([S.initialValueTemplateItem('post-by-app', { appName: appName })])
                    ),
                S.listItem()
                    .title('Notes')
                    .icon(DocumentsIcon)
                    .child(
                        S.documentTypeList('note')
                            .title('Notes')
                            .filter('_type == $type && app._ref == $appName')
                            .params({ type: 'note', appName: appName })
                            .initialValueTemplates([S.initialValueTemplateItem('note-by-app', { appName: appName })])
                    ),
                S.divider(),
                S.listItem().title('People').icon(UsersIcon).child(S.documentTypeList('person').title('People'))
            ])
};
