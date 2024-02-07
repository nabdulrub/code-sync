import { Emails, Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const emailService = resend.emails;

export default emailService;
