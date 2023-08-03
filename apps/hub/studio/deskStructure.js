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
    TerminalIcon
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
                //DW
                S.listItem()
                    .title('DW')
                    .icon(MasterDetailIcon)
                    .child(
                        S.list()
                            .title('DesignWorkout')
                            .items([
                                S.listItem()
                                    .title('Home')
                                    .icon(HomeIcon)
                                    .child(S.document().schemaType('home').documentId('dw')),
                                S.listItem()
                                    .title('Pages')
                                    .icon(DocumentsIcon)
                                    .child(
                                        S.documentTypeList('page')
                                            .title('Pages')
                                            .filter(
                                                '_type == $type && (channel._ref == $channelId || channel == undefined)'
                                            )
                                            .params({ type: 'page', channelId: 'dw' })
                                            .initialValueTemplates([
                                                S.initialValueTemplateItem('page-by-channel', { channelId: 'dw' })
                                            ])
                                    ),
                                S.listItem().title('Crew').icon(UsersIcon).child(S.documentTypeList('crew')),
                                S.listItem().title('Forms').icon(ThListIcon).child(S.documentTypeList('form'))
                            ])
                    ),
                S.divider(),
                //STUDIO
                S.listItem()
                    .title('Studio')
                    .icon(FolderIcon)
                    .child(
                        S.list()
                            .title('Studio')
                            .items([
                                S.listItem()
                                    .title('Studio')
                                    .icon(MasterDetailIcon)
                                    .child(S.document().schemaType('channel').documentId('studio')),
                                S.listItem()
                                    .title('Pages')
                                    .icon(DocumentsIcon)
                                    .child(
                                        S.documentTypeList('page')
                                            .title('Pages')
                                            .filter('_type == $type && channel._ref == $channelId')
                                            .params({ type: 'page', channelId: 'studio' })
                                            .initialValueTemplates([
                                                S.initialValueTemplateItem('page-by-channel', { channelId: 'studio' })
                                            ])
                                    ),
                                S.listItem()
                                    .title('Case Studies')
                                    .icon(PresentationIcon)
                                    .child(S.documentTypeList('casestudy')),
                                S.listItem().title('Projects').icon(ThListIcon).child(S.documentTypeList('project')),
                                S.listItem().title('Clients').icon(UsersIcon).child(S.documentTypeList('client'))
                            ])
                    ),
                //INSTITUTE
                S.listItem()
                    .title('Institute')
                    .icon(FolderIcon)
                    .child(
                        S.list()
                            .title('Institute')
                            .items([
                                S.listItem()
                                    .title('Institute')
                                    .icon(MasterDetailIcon)
                                    .child(S.document().schemaType('channel').documentId('institute')),
                                S.listItem()
                                    .title('Pages')
                                    .icon(DocumentsIcon)
                                    .child(
                                        S.documentTypeList('page')
                                            .title('Pages')
                                            .filter('_type == $type && channel._ref == $channelId')
                                            .params({ type: 'page', channelId: 'institute' })
                                            .initialValueTemplates([
                                                S.initialValueTemplateItem('page-by-channel', {
                                                    channelId: 'institute'
                                                })
                                            ])
                                    ),
                                S.listItem()
                                    .title('Programs')
                                    .icon(PresentationIcon)
                                    .child(S.documentTypeList('program')),
                                S.listItem()
                                    .title('Exercises')
                                    .icon(BulbOutlineIcon)
                                    .child(S.documentTypeList('exercise')),
                                S.listItem()
                                    .title('Collections')
                                    .icon(PackageIcon)
                                    .child(
                                        S.documentTypeList('collection')
                                            .title('Collections')
                                            .filter('_type == $type && channel._ref == $channelId')
                                            .params({ type: 'collection', channelId: 'institute' })
                                            .initialValueTemplates([
                                                S.initialValueTemplateItem('collection-by-channel', {
                                                    channelId: 'institute'
                                                })
                                            ])
                                    )
                            ])
                    ),
                //KIOSK
                S.listItem()
                    .title('Kiosk')
                    .icon(FolderIcon)
                    .child(
                        S.list()
                            .title('Kiosk')
                            .items([
                                S.listItem()
                                    .title('Kiosk')
                                    .icon(MasterDetailIcon)
                                    .child(S.document().schemaType('channel').documentId('kiosk')),
                                S.listItem()
                                    .title('Pages')
                                    .icon(DocumentsIcon)
                                    .child(
                                        S.documentTypeList('page')
                                            .title('Pages')
                                            .filter('_type == $type && channel._ref == $channelId')
                                            .params({ type: 'page', channelId: 'kiosk' })
                                            .initialValueTemplates([
                                                S.initialValueTemplateItem('page-by-channel', { channelId: 'kiosk' })
                                            ])
                                    ),
                                S.listItem().title('Products').icon(BasketIcon).child(S.documentTypeList('product')),
                                S.listItem()
                                    .title('Collections')
                                    .icon(PackageIcon)
                                    .child(
                                        S.documentTypeList('collection')
                                            .title('Collections')
                                            .filter('_type == $type && channel._ref == $channelId')
                                            .params({ type: 'collection', channelId: 'kiosk' })
                                            .initialValueTemplates([
                                                S.initialValueTemplateItem('collection-by-channel', {
                                                    channelId: 'kiosk'
                                                })
                                            ])
                                    )
                            ])
                    ),
                //REVUE
                S.listItem()
                    .title('Revue')
                    .icon(FolderIcon)
                    .child(
                        S.list()
                            .title('Revue')
                            .items([
                                S.listItem()
                                    .title('Revue')
                                    .icon(MasterDetailIcon)
                                    .child(S.document().schemaType('channel').documentId('revue')),
                                S.listItem()
                                    .title('Pages')
                                    .icon(DocumentsIcon)
                                    .child(
                                        S.documentTypeList('page')
                                            .title('Pages')
                                            .filter('_type == $type && channel._ref == $channelId')
                                            .params({ type: 'page', channelId: 'revue' })
                                            .initialValueTemplates([
                                                S.initialValueTemplateItem('page-by-channel', { channelId: 'revue' })
                                            ])
                                    ),
                                S.listItem()
                                    .title('Magazine')
                                    .icon(BookIcon)
                                    .child(
                                        S.list()
                                            .title('Magazine')
                                            .items([
                                                S.listItem()
                                                    .title('Articles')
                                                    .icon(DocumentsIcon)
                                                    .child(
                                                        S.documentTypeList('article')
                                                            .title('Articles')
                                                            .filter('_type == $type && channel._ref == $channelId')
                                                            .params({ type: 'article', channelId: 'revue' })
                                                            .initialValueTemplates([
                                                                S.initialValueTemplateItem('article-by-channel', {
                                                                    channelId: 'revue'
                                                                })
                                                            ])
                                                    ),
                                                S.listItem()
                                                    .title('Authors')
                                                    .icon(UsersIcon)
                                                    .child(S.documentTypeList('author')),
                                                S.listItem()
                                                    .title('Sections')
                                                    .icon(FolderIcon)
                                                    .child(S.documentTypeList('section'))
                                            ])
                                    ),
                                S.listItem()
                                    .title('Library')
                                    .icon(RobotIcon)
                                    .child(
                                        S.list()
                                            .title('Library')
                                            .items([
                                                S.listItem()
                                                    .title('Subjects')
                                                    .icon(TagIcon)
                                                    .child(
                                                        S.documentTypeList('subjectClass')
                                                            .title('Subjects by class')
                                                            .child(classId =>
                                                                S.documentList()
                                                                    .title('Subjects')
                                                                    .filter(
                                                                        '_type == "subject" && subjectClass._ref == $classId'
                                                                    )
                                                                    .params({ classId })
                                                                    .initialValueTemplates([
                                                                        S.initialValueTemplateItem('subject-by-class', {
                                                                            classId
                                                                        })
                                                                    ])
                                                            )
                                                    ),
                                                S.listItem()
                                                    .title('Relations')
                                                    .icon(TransferIcon)
                                                    .child(
                                                        S.list()
                                                            .title('Relations')
                                                            .items([
                                                                S.listItem()
                                                                    .title('All relations')
                                                                    .icon(FolderIcon)
                                                                    .child(S.documentTypeList('relation')),
                                                                S.listItem()
                                                                    .title('Relations by class')
                                                                    .child(
                                                                        S.documentTypeList('subjectClass')
                                                                            .title('Relations by class')
                                                                            .child(classId =>
                                                                                S.documentList()
                                                                                    .title('Relations')
                                                                                    .filter(
                                                                                        '_type == "relation" && $classId in subjectClasses[]->_id'
                                                                                    )
                                                                                    .params({ classId })
                                                                                    .initialValueTemplates([
                                                                                        S.initialValueTemplateItem(
                                                                                            'relation-by-class',
                                                                                            {
                                                                                                classId
                                                                                            }
                                                                                        )
                                                                                    ])
                                                                            )
                                                                    ),
                                                                S.listItem()
                                                                    .title('Relations without classes')
                                                                    .icon(FolderIcon)
                                                                    .child(
                                                                        S.documentTypeList('relation')
                                                                            .title('Relations')
                                                                            .filter(
                                                                                '_type == "relation" && (!defined(subjectClasses) || count(subjectClasses) == 0)'
                                                                            )
                                                                    )
                                                            ])
                                                    ),
                                                S.listItem()
                                                    .title('Classes')
                                                    .icon(FolderIcon)
                                                    .child(S.documentTypeList('subjectClass'))
                                            ])
                                    )
                            ])
                    ),
                //R&D
                S.listItem()
                    .title('R&D')
                    .icon(FolderIcon)
                    .child(
                        S.list()
                            .title('R&D')
                            .items([
                                S.listItem()
                                    .title('R&D')
                                    .icon(MasterDetailIcon)
                                    .child(S.document().schemaType('channel').documentId('rnd')),
                                S.listItem()
                                    .title('Pages')
                                    .icon(DocumentsIcon)
                                    .child(
                                        S.documentTypeList('page')
                                            .title('Pages')
                                            .filter('_type == $type && channel._ref == $channelId')
                                            .params({ type: 'page', channelId: 'rnd' })
                                            .initialValueTemplates([
                                                S.initialValueTemplateItem('page-by-channel', { channelId: 'rnd' })
                                            ])
                                    ),
                                S.listItem()
                                    .title('Articles')
                                    .icon(DocumentsIcon)
                                    .child(
                                        S.documentTypeList('article')
                                            .title('Articles')
                                            .filter('_type == $type && channel._ref == $channelId')
                                            .params({ type: 'article', channelId: 'rnd' })
                                            .initialValueTemplates([
                                                S.initialValueTemplateItem('article-by-channel', {
                                                    channelId: 'rnd'
                                                })
                                            ])
                                    )
                            ])
                    ),
                S.divider(),
                S.listItem()
                    .title('Settings')
                    .icon(ControlsIcon)
                    .child(
                        S.list()
                            .title('Settings')
                            .items([
                                S.listItem()
                                    .title('Dictionary')
                                    .icon(EarthGlobeIcon)
                                    .child(S.document().schemaType('dictionary').documentId('dictionary'))
                            ])
                    ),
                S.listItem()
                    .title('System')
                    .icon(CogIcon)
                    .child(
                        S.list()
                            .title('System')
                            .items([
                                S.listItem()
                                    .title('Constants')
                                    .icon(TerminalIcon)
                                    .child(
                                        S.list()
                                            .title('Constants')
                                            .items([
                                                ...S.documentTypeListItems().filter(listItem =>
                                                    ['widget', 'channel'].includes(listItem.getId())
                                                )
                                            ])
                                    ),
                                S.listItem()
                                    .title('Objects')
                                    .icon(TagIcon)
                                    .child(
                                        S.list()
                                            .title('Objects')
                                            .items([
                                                ...S.documentTypeListItems().filter(listItem =>
                                                    ['person', 'service', 'field', 'tag'].includes(listItem.getId())
                                                )
                                            ])
                                    ),
                                S.listItem()
                                    .title('Unfiltered')
                                    .icon(SearchIcon)
                                    .child(
                                        S.list()
                                            .title('Unfiltered')
                                            .items([
                                                ...S.documentTypeListItems().filter(listItem =>
                                                    ['page', 'article', 'subject', 'collection'].includes(
                                                        listItem.getId()
                                                    )
                                                )
                                            ])
                                    ),
                                S.listItem()
                                    .title('Unpublished')
                                    .icon(EditIcon)
                                    .child(S.documentList().title('Unpublished').filter('_id in path("drafts.*")'))
                                // S.listItem()
                                //     .title('Define ID')
                                //     .icon(UnknownIcon)
                                //     .child(
                                //         S.list()
                                //             .title('Define')
                                //             .items([
                                //                 S.listItem()
                                //                     .title('Dima')
                                //                     .icon(MasterDetailIcon)
                                //                     .child(S.document().schemaType('crew').documentId('dima-barbanel'))
                                //             ])
                                //     )
                            ])
                    )
            ])
};
