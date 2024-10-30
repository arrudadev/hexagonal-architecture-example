import { IEmailService } from '@/core/ports/services/EmailService'

export class EmailService implements IEmailService {
  async sendEmail(email: {
    to: string
    subject: string
    message: string
  }): Promise<void> {
    console.log(
      `Sending email to ${email.to} with subject: ${email.subject} and message: ${email.message}`,
    )
  }
}
