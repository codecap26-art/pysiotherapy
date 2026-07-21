import { StreamClient } from '@stream-io/node-sdk';
import { NextResponse } from 'next/server';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY || 'placeholder_key';
const secret = process.env.STREAM_SECRET_KEY || 'placeholder_secret';

export async function POST(req: Request) {
  try {
    const { userId, name } = await req.json();

    if (!userId || !name) {
      return NextResponse.json({ error: 'User ID and Name are required' }, { status: 400 });
    }

    if (apiKey === 'placeholder_key' || secret === 'placeholder_secret') {
      console.warn("WARNING: Using placeholder Stream API keys. Video calls will not connect until real keys are provided in .env.local");
      // Return a mock token so the UI can still render for demo purposes if needed
      return NextResponse.json({ token: 'mock-token-for-ui-preview', apiKey });
    }

    // Initialize the server-side client
    const client = new StreamClient(apiKey, secret);

    // Generate a user token that expires in 1 hour
    const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
    
    // Create the token
    const token = client.generateUserToken({ user_id: userId, exp });

    return NextResponse.json({ token, apiKey });
  } catch (error) {
    console.error('Error generating Stream token:', error);
    return NextResponse.json({ error: 'Failed to generate token' }, { status: 500 });
  }
}
