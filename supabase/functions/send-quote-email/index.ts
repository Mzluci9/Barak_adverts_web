import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@3.5.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface QuoteRequest {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  projectDetails: string;
  deadline?: string;
  urgent: boolean;
  estimatedCost: number;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const quoteData: QuoteRequest = await req.json();
    
    console.log("Processing quote request from:", quoteData.email);

    // Send email to business owner
    const emailResponse = await resend.emails.send({
      from: "Barak Advert <onboarding@resend.dev>",
      to: ["michaelzewdu00@gmail.com"],
      subject: `New Quote Request - ${quoteData.service}${quoteData.urgent ? ' (URGENT)' : ''}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #FF6A00; border-bottom: 3px solid #FF6A00; padding-bottom: 10px;">
            New Quote Request${quoteData.urgent ? ' - URGENT' : ''}
          </h1>
          
          <h2 style="color: #333;">Customer Information</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; font-weight: bold; width: 150px;">Name:</td>
              <td style="padding: 8px;">${quoteData.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Email:</td>
              <td style="padding: 8px;"><a href="mailto:${quoteData.email}">${quoteData.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Phone:</td>
              <td style="padding: 8px;"><a href="tel:${quoteData.phone}">${quoteData.phone}</a></td>
            </tr>
            ${quoteData.company ? `
            <tr>
              <td style="padding: 8px; font-weight: bold;">Company:</td>
              <td style="padding: 8px;">${quoteData.company}</td>
            </tr>
            ` : ''}
          </table>

          <h2 style="color: #333; margin-top: 30px;">Project Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; font-weight: bold; width: 150px;">Service:</td>
              <td style="padding: 8px;">${quoteData.service}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Details:</td>
              <td style="padding: 8px;">${quoteData.projectDetails}</td>
            </tr>
            ${quoteData.deadline ? `
            <tr>
              <td style="padding: 8px; font-weight: bold;">Deadline:</td>
              <td style="padding: 8px;">${quoteData.deadline}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 8px; font-weight: bold;">Urgent:</td>
              <td style="padding: 8px;">${quoteData.urgent ? '✅ Yes' : 'No'}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Estimated Cost:</td>
              <td style="padding: 8px; color: #FF6A00; font-size: 18px; font-weight: bold;">$${quoteData.estimatedCost.toFixed(2)}</td>
            </tr>
          </table>

          <div style="margin-top: 30px; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
            <p style="margin: 0; font-size: 12px; color: #666;">
              This is an automated message from your Barak Advert website quote form.
              Reply directly to this email to contact the customer.
            </p>
          </div>
        </div>
      `,
    });

    // Send confirmation email to customer
    const confirmationResponse = await resend.emails.send({
      from: "Barak Advert <onboarding@resend.dev>",
      to: [quoteData.email],
      subject: "Quote Request Received - Barak Advert",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #FF6A00; border-bottom: 3px solid #FF6A00; padding-bottom: 10px;">
            Thank You for Your Quote Request!
          </h1>
          
          <p style="font-size: 16px; line-height: 1.6;">
            Dear ${quoteData.name},
          </p>
          
          <p style="font-size: 16px; line-height: 1.6;">
            We have received your quote request for <strong>${quoteData.service}</strong>.
            Our team will review your requirements and get back to you shortly.
          </p>

          ${quoteData.urgent ? `
          <div style="background-color: #fff3cd; border-left: 4px solid #FF6A00; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; font-weight: bold; color: #856404;">
              ⚡ Urgent Request Noted
            </p>
            <p style="margin: 5px 0 0 0; color: #856404;">
              We understand your request is urgent and will prioritize it accordingly.
            </p>
          </div>
          ` : ''}

          <h2 style="color: #333;">Your Request Summary</h2>
          <table style="width: 100%; border-collapse: collapse; background-color: #f9f9f9; border-radius: 5px;">
            <tr>
              <td style="padding: 12px; font-weight: bold; width: 150px;">Service:</td>
              <td style="padding: 12px;">${quoteData.service}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold;">Estimated Cost:</td>
              <td style="padding: 12px; color: #FF6A00; font-weight: bold;">$${quoteData.estimatedCost.toFixed(2)}</td>
            </tr>
          </table>

          <p style="font-size: 16px; line-height: 1.6; margin-top: 30px;">
            If you have any questions or need to modify your request, please don't hesitate to contact us.
          </p>

          <div style="margin-top: 30px; padding: 20px; background-color: #FF6A00; color: white; border-radius: 5px; text-align: center;">
            <h3 style="margin: 0 0 10px 0;">Contact Us</h3>
            <p style="margin: 5px 0;">📧 Email: info@barakadvert.com</p>
            <p style="margin: 5px 0;">📱 Phone: +123 456 7890</p>
            <p style="margin: 5px 0;">💬 WhatsApp: Available</p>
          </div>

          <p style="font-size: 14px; color: #666; margin-top: 30px; text-align: center;">
            Best regards,<br>
            <strong>Barak Advert Team</strong>
          </p>
        </div>
      `,
    });

    console.log("Emails sent successfully:", { emailResponse, confirmationResponse });

    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Quote request sent successfully"
      }), 
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-quote-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
