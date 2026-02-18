import { NextResponse } from 'next/server'
import { applyDailyInterestToAllUsers } from '@/lib/interest'

// This endpoint is called by Vercel Cron (or any external scheduler) once per day.
// Vercel passes Authorization: Bearer <CRON_SECRET> automatically for configured crons.
// For manual/external calls, include the same header.
export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const result = await applyDailyInterestToAllUsers()

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Interest application failed' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      ok: true,
      date: new Date().toISOString().slice(0, 10),
      ...result,
    })
  } catch (error: any) {
    console.error('[cron/daily-interest] Unhandled error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
