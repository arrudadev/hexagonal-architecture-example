export type Email = {
  to: string
  subject: string
  message: string
}

export interface IEmailService {
  sendEmail(email: Email): Promise<void>
}
