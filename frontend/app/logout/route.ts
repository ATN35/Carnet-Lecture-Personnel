import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function GET(request: Request) {
  const cookieStore = await cookies();
  cookieStore.delete('token');

  revalidatePath('/');

  const url = new URL('/', request.url);
  return NextResponse.redirect(url, {
    headers: { 'Cache-Control': 'no-store' },
  });
}
