const { Resend } = require('resend')

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = process.env.EMAIL_FROM ?? 'CampWatch <noreply@campwatch.dev>'

async function sendAvailabilityAlert(alert) {
  const { email, parkName, startDate, endDate, system, bookingUrl } = alert

  const systemLabel = system === 'bcparks' ? 'BC Parks' : 'Recreation.gov'
  const fmt = d => new Date(d + 'T12:00:00').toLocaleDateString('en-CA', {
    weekday: 'short', month: 'long', day: 'numeric', year: 'numeric',
  })

  await resend.emails.send({
    from: FROM,
    to: email,
    subject: `🏕️ Campsite available at ${parkName}!`,
    html: `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"></head>
      <body style="font-family: system-ui, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #1c1917;">
        <div style="background: #1c6742; border-radius: 16px; padding: 24px; text-align: center; margin-bottom: 24px;">
          <h1 style="color: white; margin: 0; font-size: 24px;">🏕️ Spot available!</h1>
          <p style="color: #86efac; margin: 8px 0 0;">A cancellation just opened up</p>
        </div>

        <h2 style="font-size: 20px; margin-bottom: 4px;">${parkName}</h2>
        <p style="color: #78716c; margin: 0 0 20px;">${systemLabel}</p>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e7e5e4; color: #78716c; font-size: 14px;">Check-in</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e7e5e4; font-weight: 600; text-align: right;">${fmt(startDate)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #78716c; font-size: 14px;">Check-out</td>
            <td style="padding: 10px 0; font-weight: 600; text-align: right;">${fmt(endDate)}</td>
          </tr>
        </table>

        <a href="${bookingUrl}" style="display: block; background: #1c6742; color: white; text-align: center; padding: 14px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 16px; margin-bottom: 16px;">
          Book now →
        </a>

        <p style="color: #a8a29e; font-size: 12px; text-align: center;">
          Act fast — cancellations go quickly. CampWatch will keep checking for other alerts you have active.
        </p>
      </body>
      </html>
    `,
  })
}

module.exports = { sendAvailabilityAlert }
