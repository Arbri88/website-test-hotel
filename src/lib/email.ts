import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.example.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'user@example.com',
    pass: process.env.SMTP_PASS || 'password',
  },
})

export async function sendBookingConfirmation(
  to: string,
  name: string,
  booking: { roomName: string; checkIn: string; checkOut: string; guests: number; totalPrice: number; bookingId: string }
) {
  try {
    await transporter.sendMail({
      from: '"Terrazza di Sole" <noreply@terrazzadisole.com>',
      to,
      subject: 'Booking Confirmation - Terrazza di Sole',
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1A4B7A;">Grazie, ${name}!</h1>
          <p>Your reservation at Terrazza di Sole has been confirmed.</p>
          <div style="background: #FAF3E0; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Room:</strong> ${booking.roomName}</p>
            <p><strong>Check-in:</strong> ${booking.checkIn}</p>
            <p><strong>Check-out:</strong> ${booking.checkOut}</p>
            <p><strong>Guests:</strong> ${booking.guests}</p>
            <p><strong>Total:</strong> €${booking.totalPrice.toFixed(2)}</p>
            <p><strong>Booking ID:</strong> ${booking.bookingId}</p>
          </div>
          <p>We look forward to welcoming you to the Amalfi Coast.</p>
          <p style="color: #C75B39;"><em>La dolce vita, elevated.</em></p>
        </div>
      `,
    })
    return { success: true }
  } catch (error) {
    console.error('Failed to send booking email:', error)
    return { success: false, error }
  }
}

export async function sendWelcomeEmail(to: string, name: string) {
  try {
    await transporter.sendMail({
      from: '"Terrazza di Sole" <noreply@terrazzadisole.com>',
      to,
      subject: 'Welcome to Terrazza di Sole',
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1A4B7A;">Benvenuto, ${name}!</h1>
          <p>Welcome to Terrazza di Sole. We are delighted to have you.</p>
          <p style="color: #C75B39;"><em>La dolce vita, elevated.</em></p>
        </div>
      `,
    })
    return { success: true }
  } catch (error) {
    console.error('Failed to send welcome email:', error)
    return { success: false, error }
  }
}

export async function sendReviewNotification(
  adminEmail: string,
  review: { userName: string; roomName: string; rating: number; comment: string }
) {
  try {
    await transporter.sendMail({
      from: '"Terrazza di Sole" <noreply@terrazzadisole.com>',
      to: adminEmail,
      subject: 'New Review Received',
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1A4B7A;">New Review</h1>
          <p><strong>Guest:</strong> ${review.userName}</p>
          <p><strong>Room:</strong> ${review.roomName}</p>
          <p><strong>Rating:</strong> ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</p>
          <p><strong>Comment:</strong></p>
          <blockquote style="border-left: 3px solid #E8A435; padding-left: 15px; margin: 10px 0;">
            ${review.comment}
          </blockquote>
        </div>
      `,
    })
    return { success: true }
  } catch (error) {
    console.error('Failed to send review notification:', error)
    return { success: false, error }
  }
}

// Aliases to match the import names used by the API route handlers
export const sendBookingConfirmationEmail = sendBookingConfirmation
export const sendReviewNotificationEmail = sendReviewNotification
