import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

const previewToken = process.env.NEXT_PUBLIC_PREVIEW_TOKEN || '';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    const url = searchParams.get('url') || '/';

    if (token !== previewToken) {
        return new Response('Invalid token', { status: 401 });
    }
    draftMode().enable();
    redirect(url);
}
