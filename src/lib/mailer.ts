import nodemailer from 'nodemailer';

interface SendLeadNotificationParams {
  clientName: string;
  clientPhone: string;
  clientEmail?: string | null;
  enquiryType: string;
  requirement?: string | null;
  message?: string | null;
  preferredDate?: string | null;
  preferredTime?: string | null;
  propertyTitle?: string | null;
}

export async function sendLeadAlertEmail(data: SendLeadNotificationParams) {
  const adminEmail = process.env.ADMIN_ALERT_EMAIL || 'rudrapropertypune@gmail.com';
  const smtpUser = process.env.EMAIL_SERVER_USER;
  const smtpPass = process.env.EMAIL_SERVER_PASSWORD;

  // If no SMTP credentials provided, log and return safely
  if (!smtpUser || !smtpPass) {
    console.log(
      `[LEAD ALERT] Saved to DB. Client: ${data.clientName} (${data.clientPhone}) | Req: ${data.requirement || data.enquiryType}`
    );
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailHtml = `
      <div style="font-family: Arial, sans-serif; background-color: #f8fafc; padding: 25px; color: #1e293b;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
          <div style="background-color: #08183A; padding: 20px; text-align: center; border-bottom: 3px solid #C59B27;">
            <h2 style="color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 1px;">RUDRA PROPERTY — NEW LEAD ALERT</h2>
            <p style="color: #EAD07C; margin: 5px 0 0 0; font-size: 12px; text-transform: uppercase;">Pune's Trusted Real Estate Partner</p>
          </div>

          <div style="padding: 24px;">
            <div style="background-color: #FEF3C7; border-left: 4px solid #D97706; padding: 12px; margin-bottom: 20px; border-radius: 4px;">
              <strong style="color: #92400E; font-size: 14px;">⚡ New Customer Requirement Received!</strong>
            </div>

            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-weight: bold; width: 35%;">Customer Name:</td>
                <td style="padding: 10px 0; color: #0f172a; font-weight: bold;">${data.clientName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-weight: bold;">Phone Number:</td>
                <td style="padding: 10px 0; color: #0f172a;"><a href="tel:+91${data.clientPhone}" style="color: #2563eb; text-decoration: none; font-weight: bold;">+91 ${data.clientPhone}</a></td>
              </tr>
              ${data.clientEmail ? `
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-weight: bold;">Email:</td>
                <td style="padding: 10px 0; color: #0f172a;">${data.clientEmail}</td>
              </tr>` : ''}
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-weight: bold;">Inquiry Type:</td>
                <td style="padding: 10px 0; color: #0f172a; font-weight: bold;">${data.enquiryType}</td>
              </tr>
              ${data.requirement ? `
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-weight: bold;">Preference & Budget:</td>
                <td style="padding: 10px 0; color: #0f172a;">${data.requirement}</td>
              </tr>` : ''}
              ${data.preferredDate ? `
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-weight: bold;">Preferred Visit:</td>
                <td style="padding: 10px 0; color: #16a34a; font-weight: bold;">${data.preferredDate} (${data.preferredTime || 'Any Time'})</td>
              </tr>` : ''}
              ${data.message ? `
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-weight: bold;">Message:</td>
                <td style="padding: 10px 0; color: #0f172a;">${data.message}</td>
              </tr>` : ''}
            </table>

            <div style="margin-top: 25px; text-align: center;">
              <a href="https://wa.me/91${data.clientPhone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(data.clientName)},%20greetings%20from%20Rudra%20Property%20Pune." style="display: inline-block; background-color: #16a34a; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px; margin-right: 10px;">Chat on WhatsApp</a>
              <a href="tel:+91${data.clientPhone.replace(/[^0-9]/g, '')}" style="display: inline-block; background-color: #08183A; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px;">Call Customer Now</a>
            </div>
          </div>

          <div style="background-color: #f8fafc; padding: 15px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">
            Rudra Property Consultancy | Office No. 47, Prestige Chamber, Keshav Nagar–Mundhwa, Pune 411036
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Rudra Property Website" <${smtpUser}>`,
      to: adminEmail,
      subject: `🚨 [New Lead] ${data.clientName} - ${data.requirement || data.enquiryType}`,
      html: mailHtml,
    });
    console.log(`[EMAIL DISPATCHED] Lead alert sent to ${adminEmail}`);
  } catch (error) {
    console.error('Failed to send lead email alert:', error);
  }
}
