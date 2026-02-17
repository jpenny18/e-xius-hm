// Email notification system using Resend
// API key will be added to .env.local later

export interface EmailData {
  to: string
  subject: string
  html: string
}

// Send email via Resend API
export const sendEmail = async (emailData: EmailData) => {
  try {
    // Check if Resend API key is configured
    const apiKey = process.env.RESEND_API_KEY
    
    if (!apiKey) {
      console.warn('Resend API key not configured. Email not sent:', emailData.subject)
      // For MVP, we'll just log instead of failing
      return { success: true, message: 'Email logging enabled (API key not configured)' }
    }
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Exius <notifications@exius.com>',
        to: emailData.to,
        subject: emailData.subject,
        html: emailData.html,
      }),
    })
    
    if (!response.ok) {
      throw new Error(`Failed to send email: ${response.statusText}`)
    }
    
    const data = await response.json()
    return { success: true, data }
  } catch (error: any) {
    console.error('Error sending email:', error)
    return { success: false, error: error.message }
  }
}

// Email templates
export const emailTemplates = {
  depositPending: (userName: string, coin: string, amount: number, trackingPhrase: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #0f1419; padding: 20px; text-align: center;">
        <h1 style="color: #2dd4bf; margin: 0;">Exius</h1>
      </div>
      <div style="padding: 30px; background: #fff;">
        <h2 style="color: #0a0d11;">Deposit Received</h2>
        <p>Hi ${userName},</p>
        <p>We've received your deposit request and it's currently being processed.</p>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 5px 0;"><strong>Coin:</strong> ${coin}</p>
          <p style="margin: 5px 0;"><strong>Amount:</strong> ${amount}</p>
          <p style="margin: 5px 0;"><strong>Tracking Phrase:</strong> <code>${trackingPhrase}</code></p>
          <p style="margin: 5px 0;"><strong>Status:</strong> <span style="color: #f59e0b;">Pending Confirmation</span></p>
        </div>
        
        <p>You'll receive another email once your deposit is confirmed and starts earning interest.</p>
        <p style="color: #666; font-size: 14px;">This usually takes 2-3 network confirmations (~20 minutes).</p>
      </div>
      <div style="background: #f9fafb; padding: 20px; text-align: center; color: #666; font-size: 12px;">
        <p>© 2026 Exius. All rights reserved.</p>
      </div>
    </div>
  `,
  
  depositConfirmed: (userName: string, coin: string, amount: number, apy: number, savingsType: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #0f1419; padding: 20px; text-align: center;">
        <h1 style="color: #2dd4bf; margin: 0;">Exius</h1>
      </div>
      <div style="padding: 30px; background: #fff;">
        <h2 style="color: #0a0d11;">✅ Deposit Confirmed!</h2>
        <p>Hi ${userName},</p>
        <p>Great news! Your deposit has been confirmed and is now earning interest.</p>
        
        <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2dd4bf;">
          <p style="margin: 5px 0;"><strong>Coin:</strong> ${coin}</p>
          <p style="margin: 5px 0;"><strong>Amount:</strong> ${amount}</p>
          <p style="margin: 5px 0;"><strong>APY:</strong> ${apy}%</p>
          <p style="margin: 5px 0;"><strong>Savings Type:</strong> ${savingsType}</p>
          <p style="margin: 5px 0;"><strong>Status:</strong> <span style="color: #10b981;">Confirmed & Earning</span></p>
        </div>
        
        <p>Your balance is now earning daily interest. You can track your earnings in your dashboard.</p>
        <a href="https://exius.com/dashboard" style="display: inline-block; margin-top: 20px; padding: 12px 24px; background: #2dd4bf; color: #0a0d11; text-decoration: none; border-radius: 8px; font-weight: bold;">View Dashboard</a>
      </div>
      <div style="background: #f9fafb; padding: 20px; text-align: center; color: #666; font-size: 12px;">
        <p>© 2026 Exius. All rights reserved.</p>
      </div>
    </div>
  `,
  
  depositRejected: (userName: string, coin: string, amount: number, reason: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #0f1419; padding: 20px; text-align: center;">
        <h1 style="color: #2dd4bf; margin: 0;">Exius</h1>
      </div>
      <div style="padding: 30px; background: #fff;">
        <h2 style="color: #0a0d11;">Deposit Status Update</h2>
        <p>Hi ${userName},</p>
        <p>We were unable to confirm your recent deposit.</p>
        
        <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ef4444;">
          <p style="margin: 5px 0;"><strong>Coin:</strong> ${coin}</p>
          <p style="margin: 5px 0;"><strong>Amount:</strong> ${amount}</p>
          <p style="margin: 5px 0;"><strong>Status:</strong> <span style="color: #ef4444;">Not Confirmed</span></p>
          <p style="margin: 5px 0;"><strong>Reason:</strong> ${reason}</p>
        </div>
        
        <p>Please contact our support team if you believe this is an error or need assistance.</p>
        <a href="mailto:support@exius.com" style="display: inline-block; margin-top: 20px; padding: 12px 24px; background: #0a0d11; color: #fff; text-decoration: none; border-radius: 8px; font-weight: bold;">Contact Support</a>
      </div>
      <div style="background: #f9fafb; padding: 20px; text-align: center; color: #666; font-size: 12px;">
        <p>© 2026 Exius. All rights reserved.</p>
      </div>
    </div>
  `,
  
  adminDepositNotification: (userEmail: string, coin: string, amount: number, usdValue: number, trackingPhrase: string, transactionId: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #7f1d1d; padding: 20px; text-align: center;">
        <h1 style="color: #fff; margin: 0;">🚨 New Deposit - Admin Alert</h1>
      </div>
      <div style="padding: 30px; background: #fff;">
        <h2 style="color: #0a0d11;">Action Required: Confirm Deposit</h2>
        <p>A new deposit has been submitted and requires confirmation.</p>
        
        <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
          <p style="margin: 5px 0;"><strong>User:</strong> ${userEmail}</p>
          <p style="margin: 5px 0;"><strong>Coin:</strong> ${coin}</p>
          <p style="margin: 5px 0;"><strong>Amount:</strong> ${amount} ${coin}</p>
          <p style="margin: 5px 0;"><strong>USD Value:</strong> $${usdValue}</p>
          <p style="margin: 5px 0;"><strong>Tracking Phrase:</strong> <code>${trackingPhrase}</code></p>
          <p style="margin: 5px 0;"><strong>Transaction ID:</strong> <code>${transactionId}</code></p>
        </div>
        
        <a href="https://exius.com/adash/transactions" style="display: inline-block; margin-top: 20px; padding: 12px 24px; background: #ef4444; color: #fff; text-decoration: none; border-radius: 8px; font-weight: bold;">Review in Admin Dashboard</a>
      </div>
      <div style="background: #f9fafb; padding: 20px; text-align: center; color: #666; font-size: 12px;">
        <p>© 2026 Exius Admin Portal</p>
      </div>
    </div>
  `,
}

// Send deposit pending notification to user
export const sendDepositPendingEmail = async (
  userEmail: string,
  userName: string,
  coin: string,
  amount: number,
  trackingPhrase: string
) => {
  return await sendEmail({
    to: userEmail,
    subject: '⏳ Deposit Received - Pending Confirmation',
    html: emailTemplates.depositPending(userName, coin, amount, trackingPhrase),
  })
}

// Send deposit confirmed notification to user
export const sendDepositConfirmedEmail = async (
  userEmail: string,
  userName: string,
  coin: string,
  amount: number,
  apy: number,
  savingsType: string
) => {
  return await sendEmail({
    to: userEmail,
    subject: '✅ Deposit Confirmed - Now Earning Interest!',
    html: emailTemplates.depositConfirmed(userName, coin, amount, apy, savingsType),
  })
}

// Send deposit rejected notification to user
export const sendDepositRejectedEmail = async (
  userEmail: string,
  userName: string,
  coin: string,
  amount: number,
  reason: string
) => {
  return await sendEmail({
    to: userEmail,
    subject: '❌ Deposit Status Update',
    html: emailTemplates.depositRejected(userName, coin, amount, reason),
  })
}

// Send admin notification for new deposit
export const sendAdminDepositNotification = async (
  adminEmails: string[],
  userEmail: string,
  coin: string,
  amount: number,
  usdValue: number,
  trackingPhrase: string,
  transactionId: string
) => {
  const emailPromises = adminEmails.map(adminEmail =>
    sendEmail({
      to: adminEmail,
      subject: `🚨 New Deposit: ${coin} - ${userEmail}`,
      html: emailTemplates.adminDepositNotification(userEmail, coin, amount, usdValue, trackingPhrase, transactionId),
    })
  )
  
  return await Promise.all(emailPromises)
}
