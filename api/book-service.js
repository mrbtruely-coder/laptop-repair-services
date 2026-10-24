import nodemailer from 'nodemailer';

const SERVICE_DISPLAY_MAP = {
  'laptop-repair': 'Laptop Hardware Diagnostics & Motherboard Servicing',
  'computer-repair': 'Desktop & PC Repair & Troubleshooting',
  'networking': 'Structured IT Networking, CAT6 Cabling & Wi-Fi Setup',
  'cctv-repair-installation': 'CCTV Camera Surveillance, Mounting & DVR Setup',
};

function formatPhoneDisplay(rawPhone) {
  if (!rawPhone) return 'Not provided';
  const clean = String(rawPhone).replace(/\D/g, '');
  if (clean.length === 10) {
    return `+91 ${clean.slice(0, 5)} ${clean.slice(5)}`;
  }
  if (clean.length === 12 && clean.startsWith('91')) {
    return `+91 ${clean.slice(2, 7)} ${clean.slice(7)}`;
  }
  return String(rawPhone);
}

function getRawDigits(rawPhone) {
  const clean = String(rawPhone || '').replace(/\D/g, '');
  return clean.length === 10 ? `91${clean}` : clean;
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed. Use POST.' });
  }

  try {
    const {
      fullName = 'Valued Customer',
      phone = '',
      email = '',
      service = '',
      subcategory = '',
      address = '',
      city = 'Hyderabad',
      ticketId = 'TF-' + Math.floor(100000 + Math.random() * 900000),
      discountAmount = 150,
      payableAmount = 0,
      contactMethod = 'phone',
      slotDate = '',
      slotTime = '',
      description = '',
      paymentMethod = '',
    } = req.body || {};

    if (!fullName || !phone) {
      return res.status(400).json({
        success: false,
        error: 'Full name and mobile number are required.',
      });
    }

    const serviceName = SERVICE_DISPLAY_MAP[service] || service || 'Doorstep IT & Appliance Repair';
    const submittedTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const formattedCustomerPhone = formatPhoneDisplay(phone);
    const whatsappPhoneDigits = getRawDigits(phone);
    const paymentModeLabel =
      paymentMethod === 'doorstep_upi'
        ? 'Doorstep UPI (Pay After Service)'
        : 'Doorstep Cash / Pay After Service';

    // Configure Nodemailer directly with verified host & port 465 (SSL)
    const transporter = nodemailer.createTransport({
      host: 'mail.goexpertsapps.com',
      port: 465,
      secure: true,
      auth: {
        user: 'bookings@doorstephub.com',
        pass: 'jwT6NlDRBYh5',
      },
      tls: {
        rejectUnauthorized: false,
      },
      connectionTimeout: 12000,
      greetingTimeout: 12000,
      socketTimeout: 15000,
    });

    // 1. Customer Confirmation Email
    const customerHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Booking Confirmation - Door Step Service</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #06223A; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #FFFFFF;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #06223A; padding: 25px 12px;">
          <tr>
            <td align="center">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 620px; background-color: #0B2D4C; border: 1px solid rgba(34, 197, 94, 0.3); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                <tr>
                  <td style="background: linear-gradient(135deg, #06223A 0%, #0F3B63 100%); padding: 25px 20px; text-align: center; border-bottom: 2px solid #22C55E;">
                    <span style="display: inline-block; background-color: #22C55E; color: #06223A; font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 20px; text-transform: uppercase;">
                      BOOKING CONFIRMED
                    </span>
                    <h1 style="margin: 8px 0 0; color: #FFFFFF; font-size: 22px; font-weight: 800;">
                      LAPTOP REPAIRS & SERVICES
                    </h1>
                    <p style="margin: 4px 0 0; color: #86EFAC; font-size: 13px;">
                      Same-Day Doorstep Technician Dispatch in ${city}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 24px 20px;">
                    <h2 style="margin: 0 0 10px; color: #FFFFFF; font-size: 18px;">
                      Hello ${fullName},
                    </h2>
                    <p style="margin: 0 0 16px; color: rgba(255, 255, 255, 0.85); font-size: 14px; line-height: 1.5;">
                      Your service booking has been <strong>successfully registered</strong>. Our certified technician is being dispatched to your location.
                    </p>
                    
                    <div style="background-color: #06223A; border: 1px solid rgba(34, 197, 94, 0.3); border-radius: 12px; padding: 14px 18px; margin-bottom: 18px;">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td>
                            <span style="font-size: 10px; text-transform: uppercase; color: rgba(255, 255, 255, 0.6); display: block;">Service Ticket ID</span>
                            <span style="font-size: 22px; font-weight: 800; color: #22C55E; font-family: monospace;">${ticketId}</span>
                          </td>
                          <td align="right">
                            <span style="background-color: rgba(34, 197, 94, 0.2); border: 1px solid rgba(34, 197, 94, 0.4); color: #86EFAC; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 20px;">
                              ACTIVE DISPATCH
                            </span>
                          </td>
                        </tr>
                      </table>
                    </div>

                    <!-- Complete User Booking Details Table -->
                    <table width="100%" border="0" cellspacing="0" cellpadding="8" style="background-color: rgba(6, 34, 58, 0.75); border: 1px solid rgba(34, 197, 94, 0.2); border-radius: 12px; font-size: 13px; margin-bottom: 20px;">
                      <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                        <td style="color: rgba(255, 255, 255, 0.6); width: 38%;">Customer Name:</td>
                        <td style="color: #FFFFFF; font-weight: bold; font-size: 14px;">${fullName}</td>
                      </tr>
                      <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                        <td style="color: rgba(255, 255, 255, 0.6);">Mobile Number:</td>
                        <td style="color: #FFFFFF; font-weight: bold;">${formattedCustomerPhone}</td>
                      </tr>
                      <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                        <td style="color: rgba(255, 255, 255, 0.6);">Customer Email:</td>
                        <td style="color: #FFFFFF; font-weight: 600;">${email || 'Not provided'}</td>
                      </tr>
                      <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                        <td style="color: rgba(255, 255, 255, 0.6);">Service Category:</td>
                        <td style="color: #22C55E; font-weight: 700;">${serviceName}</td>
                      </tr>
                      ${subcategory ? `
                      <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                        <td style="color: rgba(255, 255, 255, 0.6);">Issue / Subcategory:</td>
                        <td style="color: #FFFFFF; font-weight: 600;">${subcategory}</td>
                      </tr>` : ''}
                      <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                        <td style="color: rgba(255, 255, 255, 0.6);">City:</td>
                        <td style="color: #FFFFFF; font-weight: 600;">${city}</td>
                      </tr>
                      <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                        <td style="color: rgba(255, 255, 255, 0.6);">Service Address / Locality:</td>
                        <td style="color: #FFFFFF; font-weight: 600;">${address ? address + ', ' : ''}${city}</td>
                      </tr>
                      ${slotDate || slotTime ? `
                      <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                        <td style="color: rgba(255, 255, 255, 0.6);">Scheduled Slot:</td>
                        <td style="color: #FFFFFF; font-weight: 600;">${slotDate || 'Today'} (${slotTime || 'Within 45-90 mins'})</td>
                      </tr>` : ''}
                      <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                        <td style="color: rgba(255, 255, 255, 0.6);">Preferred Contact:</td>
                        <td style="color: #FFFFFF; font-weight: 600; text-transform: uppercase;">${contactMethod}</td>
                      </tr>
                      ${description ? `
                      <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                        <td style="color: rgba(255, 255, 255, 0.6);">Issue Description / Notes:</td>
                        <td style="color: #FAF6F0; font-style: italic;">${description}</td>
                      </tr>` : ''}
                      <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                        <td style="color: rgba(255, 255, 255, 0.6);">Payment Method:</td>
                        <td style="color: #FFFFFF; font-weight: 600;">${paymentModeLabel}</td>
                      </tr>
                      <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                        <td style="color: rgba(255, 255, 255, 0.6);">Doorstep Visit Fee:</td>
                        <td style="color: #22C55E; font-weight: 700;">FREE (Pay After Service)</td>
                      </tr>
                      <tr>
                        <td style="color: rgba(255, 255, 255, 0.6);">Service Warranty:</td>
                        <td style="color: #86EFAC; font-weight: 700;">Up to 90 Days Warranty</td>
                      </tr>
                    </table>

                    <div style="background-color: rgba(34, 197, 94, 0.1); border-left: 3px solid #22C55E; border-radius: 4px; padding: 12px 14px; margin-bottom: 20px;">
                      <strong style="color: #22C55E; font-size: 12px;">What Happens Next?</strong>
                      <p style="margin: 4px 0 0; color: #FFFFFF; font-size: 12px; line-height: 1.5;">
                        1. Our local coordinator in ${city} will verify your exact location & confirm technician arrival.<br>
                        2. Certified engineer equipped with genuine diagnostic parts visits your doorstep.<br>
                        3. Upfront transparent pricing. Pay only after inspection/repair!
                      </p>
                    </div>

                    <div style="text-align: center; padding-top: 5px;">
                      <a href="tel:+919515661677" style="display: inline-block; background-color: #22C55E; color: #06223A; font-size: 13px; font-weight: 800; text-decoration: none; padding: 12px 28px; border-radius: 24px; box-shadow: 0 4px 15px rgba(34, 197, 94, 0.4);">
                        Call Support: +91 95156 61677
                      </a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="background-color: #06223A; padding: 16px 20px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                    <p style="margin: 0 0 4px; color: rgba(255, 255, 255, 0.7); font-size: 11px;">
                      Laptop Repairs & Services • Same-day Doorstep Support across Bengaluru, Vizag, Chennai & Hyderabad
                    </p>
                    <p style="margin: 0; color: rgba(255, 255, 255, 0.4); font-size: 10px;">
                      © 2026 Door Step Service. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    // 2. Team Notification Email (Sent to doorstephub@gmail.com)
    const teamHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>NEW BOOKING: ${ticketId}</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 16px; color: #333;">
        <table style="max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 10px; border: 2px solid #22C55E; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          <tr style="background-color: #06223A; color: #ffffff;">
            <td style="padding: 16px 20px;">
              <div style="font-size: 11px; font-weight: bold; color: #22C55E; text-transform: uppercase;">NEW CUSTOMER BOOKING RECEIVED</div>
              <h2 style="margin: 4px 0 0; color: #ffffff; font-size: 19px;">Ticket #${ticketId} — ${city}</h2>
              <div style="font-size: 11px; color: #cbd5e1; margin-top: 4px;">Time: ${submittedTime}</div>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px;">
              <h3 style="margin-top: 0; color: #06223A; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px;">Customer Information</h3>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 14px;">
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; width: 35%;">Customer Name:</td>
                  <td style="padding: 6px 0; font-size: 15px; font-weight: bold; color: #06223A;">${fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold;">Mobile Number:</td>
                  <td style="padding: 6px 0;">
                    <a href="tel:${phone}" style="font-size: 16px; font-weight: bold; color: #2563eb; text-decoration: none;">${formattedCustomerPhone}</a>
                    &nbsp;|&nbsp;
                    <a href="https://wa.me/${whatsappPhoneDigits}?text=Hello%20${encodeURIComponent(fullName)},%20we%20received%20your%20service%20booking%20#${ticketId}" style="color: #16a34a; font-weight: bold; text-decoration: none;">WhatsApp Customer</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold;">Customer Email:</td>
                  <td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #2563eb;">${email || 'Not provided'}</a></td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold;">City:</td>
                  <td style="padding: 6px 0; font-weight: bold; color: #16a34a;">${city}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold;">Full Address / Locality:</td>
                  <td style="padding: 6px 0; background: #f8fafc; padding: 6px 10px; border-radius: 4px;">${address || 'Address pending verification'}</td>
                </tr>
              </table>

              <h3 style="color: #06223A; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px;">Service Details</h3>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 14px;">
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; width: 35%;">Service Category:</td>
                  <td style="padding: 6px 0; font-weight: bold; color: #06223A;">${serviceName}</td>
                </tr>
                ${subcategory ? `<tr><td style="padding: 6px 0; font-weight: bold;">Subcategory:</td><td style="padding: 6px 0; font-weight: 600;">${subcategory}</td></tr>` : ''}
                ${description ? `<tr><td style="padding: 6px 0; font-weight: bold;">Issue Description:</td><td style="padding: 6px 0; font-style: italic; background: #fffbeb; padding: 6px 8px; border-radius: 4px;">${description}</td></tr>` : ''}
                <tr>
                  <td style="padding: 6px 0; font-weight: bold;">Scheduled Slot:</td>
                  <td style="padding: 6px 0; font-weight: bold;">${slotDate || 'Today'} (${slotTime || 'Within 45-90 mins'})</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold;">Preferred Contact:</td>
                  <td style="padding: 6px 0; text-transform: uppercase; font-weight: bold;">${contactMethod}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold;">Payment Mode:</td>
                  <td style="padding: 6px 0;">${paymentModeLabel}</td>
                </tr>
              </table>

              <div style="margin-top: 16px; text-align: center; padding-top: 12px; border-top: 1px solid #e2e8f0;">
                <a href="tel:${phone}" style="display: inline-block; background: #16a34a; color: #ffffff; text-decoration: none; padding: 10px 22px; border-radius: 6px; font-weight: bold; margin-right: 8px;">
                  📞 Call Customer Now (${formattedCustomerPhone})
                </a>
                <a href="https://wa.me/${whatsappPhoneDigits}?text=Hello%20${encodeURIComponent(fullName)},%20we%20received%20your%20booking%20#${ticketId}" style="display: inline-block; background: #25D366; color: #ffffff; text-decoration: none; padding: 10px 22px; border-radius: 6px; font-weight: bold;">
                  💬 WhatsApp Customer
                </a>
              </div>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const sendPromises = [];

    // Dispatch 1: Customer email (if provided)
    if (email && email.includes('@')) {
      sendPromises.push(
        transporter.sendMail({
          from: '"Door Step Service" <bookings@doorstephub.com>',
          to: email,
          subject: `Booking Confirmed: Doorstep Repair Dispatch (#${ticketId})`,
          html: customerHtml,
        }).catch((err) => {
          console.warn('Customer email sending error:', err.message);
          return null;
        })
      );
    }

    // Dispatch 2: Team alert email (doorstephub@gmail.com)
    sendPromises.push(
      transporter.sendMail({
        from: '"Door Step Service Bookings" <bookings@doorstephub.com>',
        to: 'doorstephub@gmail.com',
        subject: `🚨 NEW BOOKING: ${fullName} - ${serviceName} (${city}) [#${ticketId}]`,
        html: teamHtml,
      }).catch((err) => {
        console.warn('Team email sending error:', err.message);
        return null;
      })
    );

    await Promise.all(sendPromises);

    return res.status(200).json({
      success: true,
      message: 'Booking completed successfully and emails sent.',
      ticketId,
      sentToCustomer: email || null,
      sentToTeam: 'doorstephub@gmail.com',
    });
  } catch (err) {
    console.error('Serverless booking error:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to process booking: ' + err.message,
    });
  }
}
