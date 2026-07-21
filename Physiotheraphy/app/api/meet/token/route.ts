import { StreamClient } from '@stream-io/node-sdk';
import { NextResponse } from 'next/server';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId in request body' }, { status: 400 });
    }

    if (!apiKey || !apiSecret) {
      console.warn('STREAM_API_KEY or STREAM_API_SECRET is missing from .env.local');
      return NextResponse.json(
        { error: 'Missing Stream API credentials in environment variables.' }, 
        { status: 500 }
      );
    }

    // Initialize the Stream client on the server side
    const client = new StreamClient(apiKey, apiSecret);

    // Generate a secure user token valid for 2 hours (7200 seconds)
    const validity = 60 * 60 * 2;
    // stream-io/node-sdk uses generateUserToken
    const token = client.generateUserToken({ user_id: userId, validity_in_seconds: validity });

    return NextResponse.json({ token });
  } catch (error: any) {
    console.error('Error generating stream token:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
