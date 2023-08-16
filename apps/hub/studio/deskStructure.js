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
// import { defaultDocumentNode } from './defaultDocumentNode';

export default {
    name: 'desk',
    title: 'Desk',
    icon: MasterDetailIcon,
    // defaultDocumentNode: defaultDocumentNode,
    structure: (S, context) =>
        S.list()
            .title('Websites')
            .items([
                //Template
                S.listItem()
                    .title('Template')
                    .icon(MasterDetailIcon)
                    .child(
                        S.list()
                            .title('Template')
                            .items([
                                S.listItem()
                                    .title('Home')
                                    .icon(HomeIcon)
                                    .child(S.document().schemaType('app').documentId('template')),
                                S.listItem()
                                    .title('Pages')
                                    .icon(DocumentsIcon)
                                    .child(
                                        S.documentTypeList('page')
                                            .title('Pages')
                                            .filter('_type == $type && app._ref == $appName')
                                            .params({ type: 'page', appName: 'template' })
                                            .initialValueTemplates([
                                                S.initialValueTemplateItem('page-by-app', { appName: 'template' })
                                            ])
                                    ),
                                S.listItem()
                                    .title('Projects')
                                    .icon(PresentationIcon)
                                    .child(
                                        S.documentTypeList('project')
                                            .title('Projects')
                                            .filter('_type == $type && app._ref == $appName')
                                            .params({ type: 'project', appName: 'template' })
                                            .initialValueTemplates([
                                                S.initialValueTemplateItem('project-by-app', { appName: 'template' })
                                            ])
                                    ),
                                S.listItem()
                                    .title('Events')
                                    .icon(CalendarIcon)
                                    .child(
                                        S.documentTypeList('event')
                                            .title('Events')
                                            .filter('_type == $type && app._ref == $appName')
                                            .params({ type: 'event', appName: 'template' })
                                            .initialValueTemplates([
                                                S.initialValueTemplateItem('event-by-app', { appName: 'template' })
                                            ])
                                    ),
                                S.listItem()
                                    .title('Posts')
                                    .icon(DocumentsIcon)
                                    .child(
                                        S.documentTypeList('post')
                                            .title('Posts')
                                            .filter('_type == $type && app._ref == $appName')
                                            .params({ type: 'post', appName: 'template' })
                                            .initialValueTemplates([
                                                S.initialValueTemplateItem('post-by-app', { appName: 'template' })
                                            ])
                                    ),
                                S.listItem()
                                    .title('Notes')
                                    .icon(DocumentsIcon)
                                    .child(
                                        S.documentTypeList('note')
                                            .title('Notes')
                                            .filter('_type == $type && app._ref == $appName')
                                            .params({ type: 'note', appName: 'template' })
                                            .initialValueTemplates([
                                                S.initialValueTemplateItem('note-by-app', { appName: 'template' })
                                            ])
                                    )
                            ])
                    ),
                S.divider(),
                //CulturaWeek
                S.listItem()
                    .title('CulturaWeek')
                    .icon(MasterDetailIcon)
                    .child(
                        S.list()
                            .title('Template')
                            .items([
                                S.listItem()
                                    .title('Home')
                                    .icon(HomeIcon)
                                    .child(S.document().schemaType('app').documentId('culturaweek')),
                                S.listItem()
                                    .title('Pages')
                                    .icon(DocumentsIcon)
                                    .child(
                                        S.documentTypeList('page')
                                            .title('Pages')
                                            .filter('_type == $type && app._ref == $appName')
                                            .params({ type: 'page', appName: 'culturaweek' })
                                            .initialValueTemplates([
                                                S.initialValueTemplateItem('page-by-app', { appName: 'culturaweek' })
                                            ])
                                    ),
                                S.listItem()
                                    .title('Events')
                                    .icon(CalendarIcon)
                                    .child(
                                        S.documentTypeList('event')
                                            .title('Events')
                                            .filter('_type == $type && app._ref == $appName')
                                            .params({ type: 'event', appName: 'culturaweek' })
                                            .initialValueTemplates([
                                                S.initialValueTemplateItem('event-by-app', { appName: 'culturaweek' })
                                            ])
                                    )
                            ])
                    ),
                S.divider(),
                S.listItem().title('People').icon(UsersIcon).child(S.documentTypeList('person').title('People')),
                S.listItem()
                    .title('All documents')
                    .icon(TerminalIcon)
                    .child(
                        S.list()
                            .title('All documents')
                            .items([...S.documentTypeListItems()])
                    )
            ])
};
