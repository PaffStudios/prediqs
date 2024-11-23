import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: NextRequest) {
  const { address } = await request.json();
  const nonce = Math.floor(Math.random() * 1000000);

  const supabase = await createClient()

  const { error } = await supabase
    .from('users')
    .update({
      auth: {
        genNonce: nonce,
        lastAuth: new Date().toISOString(),
        lastAuthStatus: 'pending',
      },
    })
    .eq('address', address);

  if (error) {
    return NextResponse.json({ error: 'Failed to update nonce' }, { status: 500 });
  }

  return NextResponse.json({ nonce });
}
