import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function GET() {
  const cookieStore = await cookies();
  cookieStore.delete('token');

  revalidatePath('/');
  
  return NextResponse.redirect('https://carnetdelecture.duckdns.org/', {
    headers: { 'Cache-Control': 'no-store' },
  });
}
