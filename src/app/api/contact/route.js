import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, inquiryType, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Zoho Integration via Webhook or Zoho CRM Lead API
    const zohoWebhookUrl = process.env.ZOHO_WEBHOOK_URL;

    if (zohoWebhookUrl) {
      // Post to Zoho Webhook / Desk / CRM lead ingestion endpoint
      const response = await fetch(zohoWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          inquiryType,
          message,
          source: 'DR STEEZE Portfolio Website',
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        console.error('Zoho Webhook Error:', await response.text());
      }
    } else {
      // Log for development if ZOHO_WEBHOOK_URL environment variable is not set yet
      console.log('[Contact Form Submission - Dev Mode]:', {
        name,
        email,
        inquiryType,
        message,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry received successfully. DR STEEZE Studio will respond within 24-48 hours.',
    });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error while processing inquiry.' },
      { status: 500 }
    );
  }
}
