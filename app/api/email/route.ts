import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

async function sendWithRetry(
  payload: { from: string; to: string[]; subject: string; html: string },
  retries = 3,
  delayMs = 1000
): Promise<{ data: any; error: any }> {
  const { data, error } = await resend.emails.send(payload)

  if (error && (error as any).statusCode === 429 && retries > 0) {
    await sleep(delayMs)
    return sendWithRetry(payload, retries - 1, delayMs * 2)
  }

  return { data, error }
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not configured')
      return NextResponse.json({ success: true, message: 'Email skipped (no API key)' })
    }

    const body = await request.json()
    const { to, subject, html, from } = body

    if (!to || !subject || !html) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: to, subject, html' },
        { status: 400 }
      )
    }

    const { data, error } = await sendWithRetry({
      from: from || 'Exius <noreply@exius.ca>',
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ success: false, error: (error as any).message }, { status: 400 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    console.error('Email route error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
