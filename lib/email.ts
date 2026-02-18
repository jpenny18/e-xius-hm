// Email notification system — all sends proxied through /api/email (server-side Resend)

export interface EmailData {
  to: string | string[]
  subject: string
  html: string
  from?: string
}

// ─── Base sender ────────────────────────────────────────────────────────────

export const sendEmail = async (emailData: EmailData): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await fetch('/api/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emailData),
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Failed to send email')
    }

    return { success: true }
  } catch (error: any) {
    console.error('Email send error:', error)
    return { success: false, error: error.message }
  }
}

// ─── Shared layout ──────────────────────────────────────────────────────────

const baseLayout = (content: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Exius</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10);">

          <!-- Header -->
          <tr>
            <td style="background:#0f1419;padding:28px 40px;text-align:center;">
              <span style="font-size:26px;font-weight:700;color:#2dd4bf;letter-spacing:-0.5px;">Exius</span>
              <span style="font-size:11px;color:#4b5563;display:block;margin-top:4px;letter-spacing:2px;text-transform:uppercase;">Crypto Savings</span>
            </td>
          </tr>

          <!-- Content -->
          ${content}

          <!-- Footer -->
          <tr>
            <td style="background:#0f1419;padding:24px 40px;text-align:center;">
              <p style="margin:0 0 8px;font-size:12px;color:#4b5563;">Questions? Reply to this email or reach us at <a href="mailto:support@exius.ca" style="color:#2dd4bf;text-decoration:none;">support@exius.ca</a></p>
              <p style="margin:0;font-size:11px;color:#374151;">© ${new Date().getFullYear()} Exius. All rights reserved.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

// ─── Templates ──────────────────────────────────────────────────────────────

const templates = {

  welcome: (firstName: string) => baseLayout(`
    <tr>
      <td style="background:#ffffff;padding:40px 40px 32px;">
        <h1 style="margin:0 0 8px;font-size:26px;font-weight:700;color:#0f1419;line-height:1.2;">Welcome to Exius, ${firstName}!</h1>
        <p style="margin:0 0 24px;font-size:15px;color:#4b5563;line-height:1.6;">Your account is live. Here's everything you need to start growing your crypto savings today.</p>

        <!-- What is Exius -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:12px;margin-bottom:28px;">
          <tr>
            <td style="padding:24px;">
              <h2 style="margin:0 0 12px;font-size:16px;font-weight:700;color:#0f1419;">What is Exius?</h2>
              <p style="margin:0;font-size:14px;color:#4b5563;line-height:1.7;">
                Exius is a crypto savings platform that earns you <strong style="color:#0f1419;">up to 26% APY</strong> on your digital assets — with <strong style="color:#0f1419;">daily compounding</strong> and <strong style="color:#0f1419;">no lockups</strong>. Choose between Flexible Savings (withdraw anytime) or Fixed-Term Savings for even higher rates.
              </p>
              <table cellpadding="0" cellspacing="0" style="margin-top:16px;width:100%;">
                <tr>
                  <td style="padding:8px 12px;background:#ecfdf5;border-radius:8px;margin-right:8px;width:48%;">
                    <span style="font-size:13px;color:#065f46;font-weight:600;">⚡ Flexible Savings</span><br/>
                    <span style="font-size:12px;color:#047857;">Up to 16% APY • Withdraw anytime</span>
                  </td>
                  <td style="width:4%;"></td>
                  <td style="padding:8px 12px;background:#eff6ff;border-radius:8px;width:48%;">
                    <span style="font-size:13px;color:#1e40af;font-weight:600;">🔒 Fixed-Term Savings</span><br/>
                    <span style="font-size:12px;color:#1d4ed8;">Up to 26% APY • 1, 3 or 12 months</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- How to start -->
        <h2 style="margin:0 0 16px;font-size:16px;font-weight:700;color:#0f1419;">How to deposit and start earning:</h2>

        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding-bottom:14px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:10px;">
                <tr>
                  <td style="padding:16px 20px;">
                    <table cellpadding="0" cellspacing="0"><tr>
                      <td style="width:32px;height:32px;background:#2dd4bf;border-radius:50%;text-align:center;vertical-align:middle;font-size:13px;font-weight:700;color:#0f1419;flex-shrink:0;">1</td>
                      <td style="padding-left:14px;font-size:14px;color:#374151;line-height:1.5;"><strong style="color:#0f1419;">Log in to your dashboard</strong><br/>Head to <a href="https://exius.ca/dashboard" style="color:#2dd4bf;text-decoration:none;">exius.ca/dashboard</a> and sign in to your account.</td>
                    </tr></table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom:14px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:10px;">
                <tr>
                  <td style="padding:16px 20px;">
                    <table cellpadding="0" cellspacing="0"><tr>
                      <td style="width:32px;height:32px;background:#2dd4bf;border-radius:50%;text-align:center;vertical-align:middle;font-size:13px;font-weight:700;color:#0f1419;flex-shrink:0;">2</td>
                      <td style="padding-left:14px;font-size:14px;color:#374151;line-height:1.5;"><strong style="color:#0f1419;">Pick your crypto &amp; savings type</strong><br/>Choose from BTC, ETH, USDT, SOL, and more. Select Flexible or Fixed-Term based on your goals.</td>
                    </tr></table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom:14px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:10px;">
                <tr>
                  <td style="padding:16px 20px;">
                    <table cellpadding="0" cellspacing="0"><tr>
                      <td style="width:32px;height:32px;background:#2dd4bf;border-radius:50%;text-align:center;vertical-align:middle;font-size:13px;font-weight:700;color:#0f1419;flex-shrink:0;">3</td>
                      <td style="padding-left:14px;font-size:14px;color:#374151;line-height:1.5;"><strong style="color:#0f1419;">Enter your deposit amount</strong><br/>Minimum deposit is $50 USD. You'll see the exact crypto amount and wallet address to send to.</td>
                    </tr></table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom:14px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:10px;">
                <tr>
                  <td style="padding:16px 20px;">
                    <table cellpadding="0" cellspacing="0"><tr>
                      <td style="width:32px;height:32px;background:#2dd4bf;border-radius:50%;text-align:center;vertical-align:middle;font-size:13px;font-weight:700;color:#0f1419;flex-shrink:0;">4</td>
                      <td style="padding-left:14px;font-size:14px;color:#374151;line-height:1.5;"><strong style="color:#0f1419;">Send crypto &amp; confirm with your phrase</strong><br/>Send the exact amount to the provided address. Enter the 5-word tracking phrase shown to confirm your deposit.</td>
                    </tr></table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#ecfdf5;border:1px solid #a7f3d0;border-radius:10px;">
                <tr>
                  <td style="padding:16px 20px;">
                    <table cellpadding="0" cellspacing="0"><tr>
                      <td style="width:32px;height:32px;background:#10b981;border-radius:50%;text-align:center;vertical-align:middle;font-size:13px;font-weight:700;color:#ffffff;flex-shrink:0;">5</td>
                      <td style="padding-left:14px;font-size:14px;color:#065f46;line-height:1.5;"><strong>Start earning daily interest</strong><br/>Once confirmed, your balance starts compounding every single day automatically.</td>
                    </tr></table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- CTA -->
        <table cellpadding="0" cellspacing="0" style="margin-top:32px;width:100%;">
          <tr>
            <td align="center">
              <a href="https://exius.ca/dashboard" style="display:inline-block;background:#2dd4bf;color:#0f1419;font-size:15px;font-weight:700;text-decoration:none;padding:14px 36px;border-radius:10px;letter-spacing:-0.2px;">Go to My Dashboard →</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `),

  depositPending: (userName: string, coin: string, usdAmount: number, trackingPhrase: string) => baseLayout(`
    <tr>
      <td style="background:#ffffff;padding:40px 40px 32px;">
        <table cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
          <tr>
            <td style="width:48px;height:48px;background:#fef3c7;border-radius:12px;text-align:center;vertical-align:middle;font-size:22px;">⏳</td>
            <td style="padding-left:16px;">
              <h1 style="margin:0;font-size:22px;font-weight:700;color:#0f1419;">Deposit Received</h1>
              <p style="margin:4px 0 0;font-size:14px;color:#6b7280;">Pending blockchain confirmation</p>
            </td>
          </tr>
        </table>

        <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.6;">Hi ${userName}, we've received your deposit request. It's currently pending confirmation — we'll notify you the moment it's verified and starts earning interest.</p>

        <!-- Details card -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#fffbeb;border:1px solid #fde68a;border-radius:12px;margin-bottom:24px;">
          <tr><td style="padding:24px;">
            <h3 style="margin:0 0 16px;font-size:13px;font-weight:700;color:#92400e;text-transform:uppercase;letter-spacing:1px;">Deposit Details</h3>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid #fde68a;font-size:13px;color:#78350f;width:45%;">Asset</td>
                <td style="padding:8px 0;border-bottom:1px solid #fde68a;font-size:14px;font-weight:600;color:#0f1419;text-align:right;">${coin}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid #fde68a;font-size:13px;color:#78350f;">Amount (USD)</td>
                <td style="padding:8px 0;border-bottom:1px solid #fde68a;font-size:14px;font-weight:600;color:#0f1419;text-align:right;">$${usdAmount.toFixed(2)}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid #fde68a;font-size:13px;color:#78350f;">Tracking Phrase</td>
                <td style="padding:8px 0;border-bottom:1px solid #fde68a;font-size:13px;font-weight:600;color:#0f1419;text-align:right;font-family:monospace;">${trackingPhrase}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;font-size:13px;color:#78350f;">Status</td>
                <td style="padding:8px 0;text-align:right;"><span style="background:#fef3c7;color:#b45309;font-size:12px;font-weight:700;padding:4px 10px;border-radius:20px;border:1px solid #fde68a;">Pending</span></td>
              </tr>
            </table>
          </td></tr>
        </table>

        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0fdf4;border-radius:10px;margin-bottom:24px;">
          <tr><td style="padding:16px 20px;">
            <p style="margin:0;font-size:13px;color:#166534;line-height:1.6;">
              <strong>What happens next?</strong> Our team will verify your deposit on the blockchain. This typically takes <strong>20–60 minutes</strong>. You'll receive a confirmation email as soon as it's approved and earning interest.
            </p>
          </td></tr>
        </table>

        <table cellpadding="0" cellspacing="0" style="width:100%;">
          <tr><td align="center">
            <a href="https://exius.ca/dashboard" style="display:inline-block;background:#2dd4bf;color:#0f1419;font-size:15px;font-weight:700;text-decoration:none;padding:14px 36px;border-radius:10px;">View Dashboard</a>
          </td></tr>
        </table>
      </td>
    </tr>
  `),

  depositConfirmed: (userName: string, coin: string, usdAmount: number, apy: number, savingsType: string) => {
    const dailyRate = (apy / 100 / 365)
    const dailyEarnings = usdAmount * dailyRate
    const monthlyEarnings = dailyEarnings * 30
    return baseLayout(`
    <tr>
      <td style="background:#ffffff;padding:40px 40px 32px;">
        <table cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
          <tr>
            <td style="width:48px;height:48px;background:#d1fae5;border-radius:12px;text-align:center;vertical-align:middle;font-size:22px;">✅</td>
            <td style="padding-left:16px;">
              <h1 style="margin:0;font-size:22px;font-weight:700;color:#0f1419;">Deposit Confirmed!</h1>
              <p style="margin:4px 0 0;font-size:14px;color:#6b7280;">Your crypto is now earning daily interest</p>
            </td>
          </tr>
        </table>

        <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.6;">Great news, ${userName}! Your deposit has been verified and is now actively earning <strong style="color:#0f1419;">${apy}% APY</strong> — compounded daily, directly into your balance.</p>

        <!-- Earnings projection -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#ecfdf5;border:1px solid #a7f3d0;border-radius:12px;margin-bottom:24px;">
          <tr><td style="padding:24px;">
            <h3 style="margin:0 0 16px;font-size:13px;font-weight:700;color:#065f46;text-transform:uppercase;letter-spacing:1px;">Your Earnings Snapshot</h3>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid #a7f3d0;font-size:13px;color:#047857;">Asset</td>
                <td style="padding:8px 0;border-bottom:1px solid #a7f3d0;font-size:14px;font-weight:600;color:#0f1419;text-align:right;">${coin}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid #a7f3d0;font-size:13px;color:#047857;">Deposited Amount</td>
                <td style="padding:8px 0;border-bottom:1px solid #a7f3d0;font-size:14px;font-weight:600;color:#0f1419;text-align:right;">$${usdAmount.toFixed(2)}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid #a7f3d0;font-size:13px;color:#047857;">Savings Type</td>
                <td style="padding:8px 0;border-bottom:1px solid #a7f3d0;font-size:14px;font-weight:600;color:#0f1419;text-align:right;">${savingsType === 'flexible' ? 'Flexible' : 'Fixed-Term'}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid #a7f3d0;font-size:13px;color:#047857;">APY</td>
                <td style="padding:8px 0;border-bottom:1px solid #a7f3d0;text-align:right;"><span style="background:#2dd4bf;color:#0f1419;font-size:13px;font-weight:700;padding:4px 10px;border-radius:20px;">${apy}%</span></td>
              </tr>
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid #a7f3d0;font-size:13px;color:#047857;">Est. Daily Earnings</td>
                <td style="padding:8px 0;border-bottom:1px solid #a7f3d0;font-size:14px;font-weight:700;color:#10b981;text-align:right;">+$${dailyEarnings.toFixed(4)}/day</td>
              </tr>
              <tr>
                <td style="padding:8px 0;font-size:13px;color:#047857;">Est. Monthly Earnings</td>
                <td style="padding:8px 0;font-size:14px;font-weight:700;color:#10b981;text-align:right;">+$${monthlyEarnings.toFixed(2)}/month</td>
              </tr>
            </table>
          </td></tr>
        </table>

        <table cellpadding="0" cellspacing="0" style="width:100%;">
          <tr><td align="center">
            <a href="https://exius.ca/dashboard" style="display:inline-block;background:#2dd4bf;color:#0f1419;font-size:15px;font-weight:700;text-decoration:none;padding:14px 36px;border-radius:10px;">Track Your Earnings →</a>
          </td></tr>
        </table>
      </td>
    </tr>
  `)
  },

  depositRejected: (userName: string, coin: string, usdAmount: number, reason: string) => baseLayout(`
    <tr>
      <td style="background:#ffffff;padding:40px 40px 32px;">
        <table cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
          <tr>
            <td style="width:48px;height:48px;background:#fee2e2;border-radius:12px;text-align:center;vertical-align:middle;font-size:22px;">⚠️</td>
            <td style="padding-left:16px;">
              <h1 style="margin:0;font-size:22px;font-weight:700;color:#0f1419;">Deposit Not Confirmed</h1>
              <p style="margin:4px 0 0;font-size:14px;color:#6b7280;">Action may be required</p>
            </td>
          </tr>
        </table>

        <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.6;">Hi ${userName}, we were unable to confirm your recent deposit. Please review the details below and contact our support team if you need assistance.</p>

        <table width="100%" cellpadding="0" cellspacing="0" style="background:#fff1f2;border:1px solid #fecdd3;border-radius:12px;margin-bottom:24px;">
          <tr><td style="padding:24px;">
            <h3 style="margin:0 0 16px;font-size:13px;font-weight:700;color:#9f1239;text-transform:uppercase;letter-spacing:1px;">Deposit Details</h3>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid #fecdd3;font-size:13px;color:#be123c;">Asset</td>
                <td style="padding:8px 0;border-bottom:1px solid #fecdd3;font-size:14px;font-weight:600;color:#0f1419;text-align:right;">${coin}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid #fecdd3;font-size:13px;color:#be123c;">Amount (USD)</td>
                <td style="padding:8px 0;border-bottom:1px solid #fecdd3;font-size:14px;font-weight:600;color:#0f1419;text-align:right;">$${usdAmount.toFixed(2)}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid #fecdd3;font-size:13px;color:#be123c;">Status</td>
                <td style="padding:8px 0;border-bottom:1px solid #fecdd3;text-align:right;"><span style="background:#fee2e2;color:#dc2626;font-size:12px;font-weight:700;padding:4px 10px;border-radius:20px;border:1px solid #fecdd3;">Not Confirmed</span></td>
              </tr>
              <tr>
                <td style="padding:8px 0;font-size:13px;color:#be123c;vertical-align:top;">Reason</td>
                <td style="padding:8px 0;font-size:13px;color:#0f1419;text-align:right;">${reason}</td>
              </tr>
            </table>
          </td></tr>
        </table>

        <table cellpadding="0" cellspacing="0" style="width:100%;">
          <tr><td align="center">
            <a href="mailto:support@exius.ca" style="display:inline-block;background:#0f1419;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:14px 36px;border-radius:10px;">Contact Support</a>
          </td></tr>
        </table>
      </td>
    </tr>
  `),

  adminNewDeposit: (userEmail: string, coin: string, usdAmount: number, trackingPhrase: string, transactionId: string) => baseLayout(`
    <tr>
      <td style="background:#ffffff;padding:40px 40px 32px;">
        <table cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
          <tr>
            <td style="width:48px;height:48px;background:#fef3c7;border-radius:12px;text-align:center;vertical-align:middle;font-size:22px;">🚨</td>
            <td style="padding-left:16px;">
              <h1 style="margin:0;font-size:22px;font-weight:700;color:#0f1419;">New Deposit — Action Required</h1>
              <p style="margin:4px 0 0;font-size:14px;color:#6b7280;">A user has submitted a deposit for review</p>
            </td>
          </tr>
        </table>

        <table width="100%" cellpadding="0" cellspacing="0" style="background:#fffbeb;border:1px solid #fde68a;border-radius:12px;margin-bottom:24px;">
          <tr><td style="padding:24px;">
            <h3 style="margin:0 0 16px;font-size:13px;font-weight:700;color:#92400e;text-transform:uppercase;letter-spacing:1px;">Deposit Summary</h3>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid #fde68a;font-size:13px;color:#78350f;">User</td>
                <td style="padding:8px 0;border-bottom:1px solid #fde68a;font-size:14px;font-weight:600;color:#0f1419;text-align:right;">${userEmail}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid #fde68a;font-size:13px;color:#78350f;">Asset</td>
                <td style="padding:8px 0;border-bottom:1px solid #fde68a;font-size:14px;font-weight:600;color:#0f1419;text-align:right;">${coin}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid #fde68a;font-size:13px;color:#78350f;">USD Value</td>
                <td style="padding:8px 0;border-bottom:1px solid #fde68a;font-size:14px;font-weight:700;color:#0f1419;text-align:right;">$${usdAmount.toFixed(2)}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid #fde68a;font-size:13px;color:#78350f;">Tracking Phrase</td>
                <td style="padding:8px 0;border-bottom:1px solid #fde68a;font-size:13px;font-weight:600;color:#0f1419;text-align:right;font-family:monospace;">${trackingPhrase}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;font-size:13px;color:#78350f;">Transaction ID</td>
                <td style="padding:8px 0;font-size:12px;font-weight:600;color:#6b7280;text-align:right;font-family:monospace;">${transactionId}</td>
              </tr>
            </table>
          </td></tr>
        </table>

        <table cellpadding="0" cellspacing="0" style="width:100%;">
          <tr><td align="center">
            <a href="https://exius.ca/adash/transactions" style="display:inline-block;background:#ef4444;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:14px 36px;border-radius:10px;">Review in Admin Dashboard →</a>
          </td></tr>
        </table>
      </td>
    </tr>
  `),

  adminNewSignup: (userEmail: string, firstName: string, lastName: string, accountType: string) => baseLayout(`
    <tr>
      <td style="background:#ffffff;padding:40px 40px 32px;">
        <table cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
          <tr>
            <td style="width:48px;height:48px;background:#ede9fe;border-radius:12px;text-align:center;vertical-align:middle;font-size:22px;">👤</td>
            <td style="padding-left:16px;">
              <h1 style="margin:0;font-size:22px;font-weight:700;color:#0f1419;">New User Signup</h1>
              <p style="margin:4px 0 0;font-size:14px;color:#6b7280;">A new account has been created</p>
            </td>
          </tr>
        </table>

        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f3ff;border:1px solid #ddd6fe;border-radius:12px;margin-bottom:24px;">
          <tr><td style="padding:24px;">
            <h3 style="margin:0 0 16px;font-size:13px;font-weight:700;color:#5b21b6;text-transform:uppercase;letter-spacing:1px;">New User Details</h3>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid #ddd6fe;font-size:13px;color:#7c3aed;">Name</td>
                <td style="padding:8px 0;border-bottom:1px solid #ddd6fe;font-size:14px;font-weight:600;color:#0f1419;text-align:right;">${firstName} ${lastName}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid #ddd6fe;font-size:13px;color:#7c3aed;">Email</td>
                <td style="padding:8px 0;border-bottom:1px solid #ddd6fe;font-size:14px;font-weight:600;color:#0f1419;text-align:right;">${userEmail}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid #ddd6fe;font-size:13px;color:#7c3aed;">Account Type</td>
                <td style="padding:8px 0;border-bottom:1px solid #ddd6fe;font-size:14px;font-weight:600;color:#0f1419;text-align:right;text-transform:capitalize;">${accountType}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;font-size:13px;color:#7c3aed;">Joined</td>
                <td style="padding:8px 0;font-size:14px;font-weight:600;color:#0f1419;text-align:right;">${new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
              </tr>
            </table>
          </td></tr>
        </table>

        <table cellpadding="0" cellspacing="0" style="width:100%;">
          <tr><td align="center">
            <a href="https://exius.ca/adash/users" style="display:inline-block;background:#7c3aed;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:14px 36px;border-radius:10px;">View in Admin Dashboard →</a>
          </td></tr>
        </table>
      </td>
    </tr>
  `),
}

// ─── Public email functions ──────────────────────────────────────────────────

export const sendWelcomeEmail = async (userEmail: string, firstName: string) => {
  return sendEmail({
    to: userEmail,
    subject: `Welcome to Exius, ${firstName}! 🎉`,
    html: templates.welcome(firstName),
  })
}

export const sendAdminSignupNotification = async (
  adminEmails: string[],
  userEmail: string,
  firstName: string,
  lastName: string,
  accountType: string
) => {
  if (!adminEmails.length) return { success: true }
  return sendEmail({
    to: adminEmails,
    subject: `New signup: ${firstName} ${lastName} (${userEmail})`,
    html: templates.adminNewSignup(userEmail, firstName, lastName, accountType),
  })
}

export const sendDepositPendingEmail = async (
  userEmail: string,
  userName: string,
  coin: string,
  usdAmount: number,
  trackingPhrase: string
) => {
  return sendEmail({
    to: userEmail,
    subject: `Deposit received — pending confirmation`,
    html: templates.depositPending(userName, coin, usdAmount, trackingPhrase),
  })
}

export const sendAdminDepositNotification = async (
  adminEmails: string[],
  userEmail: string,
  coin: string,
  amount: number,
  usdValue: number,
  trackingPhrase: string,
  transactionId: string
) => {
  if (!adminEmails.length) return { success: true }
  return sendEmail({
    to: adminEmails,
    subject: `New deposit: ${coin} $${usdValue.toFixed(2)} from ${userEmail}`,
    html: templates.adminNewDeposit(userEmail, coin, usdValue, trackingPhrase, transactionId),
  })
}

export const sendDepositConfirmedEmail = async (
  userEmail: string,
  userName: string,
  coin: string,
  usdAmount: number,
  apy: number,
  savingsType: string
) => {
  return sendEmail({
    to: userEmail,
    subject: `✅ Your ${coin} deposit is confirmed and earning ${apy}% APY`,
    html: templates.depositConfirmed(userName, coin, usdAmount, apy, savingsType),
  })
}

export const sendDepositRejectedEmail = async (
  userEmail: string,
  userName: string,
  coin: string,
  usdAmount: number,
  reason: string
) => {
  return sendEmail({
    to: userEmail,
    subject: `Update on your ${coin} deposit`,
    html: templates.depositRejected(userName, coin, usdAmount, reason),
  })
}
