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
                //Example
                // S.listItem()
                //     .title('DW')
                //     .icon(FolderIcon)
                //     .child(
                //         S.list()
                //             .title('DesignWorkout')
                //             .items([
                //                 S.listItem()
                //                     .title('Home')
                //                     .icon(HomeIcon)
                //                     .child(S.document().schemaType('home').documentId('dw')),
                //                 S.listItem()
                //                     .title('Pages')
                //                     .icon(DocumentsIcon)
                //                     .child(
                //                         S.documentTypeList('page')
                //                             .title('Pages')
                //                             .filter(
                //                                 '_type == $type && (channel._ref == $channelId || channel == undefined)'
                //                             )
                //                             .params({ type: 'page', channelId: 'dw' })
                //                             .initialValueTemplates([
                //                                 S.initialValueTemplateItem('page-by-channel', { channelId: 'dw' })
                //                             ])
                //                     ),
                //                 S.listItem().title('Crew').icon(UsersIcon).child(S.documentTypeList('crew')),
                //                 S.listItem().title('Forms').icon(ThListIcon).child(S.documentTypeList('form'))
                //             ])
                //     ),
                S.divider()
            ])
};
