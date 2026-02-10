import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not defined in the environment variables');
}

const resend = new Resend(process.env.RESEND_API_KEY);

interface EnrollmentEmailData {
  studentName: string;
  studentEmail: string;
  className: string;
  subjectName: string;
  departmentName: string;
}

export const sendEnrollmentEmail = async (data: EnrollmentEmailData) => {
  const { studentName, studentEmail, className, subjectName, departmentName } =
    data;

  try {
    const { data: resData, error } = await resend.emails.send({
      from: 'UniSphere <onboarding@resend.dev>', // Replace with your verified domain in production
      to: [studentEmail],
      subject: `Enrollment Confirmed: ${className}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h1 style="color: #0f172a; margin-bottom: 20px;">Enrollment Successful!</h1>
          <p style="color: #475569; font-size: 16px; line-height: 1.6;">Hi <strong>${studentName}</strong>,</p>
          <p style="color: #475569; font-size: 16px; line-height: 1.6;">
            Congratulations! You have successfully enrolled in the following class:
          </p>
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="margin: 0; color: #1e293b;"><strong>Class:</strong> ${className}</p>
            <p style="margin: 5px 0 0 0; color: #1e293b;"><strong>Subject:</strong> ${subjectName}</p>
            <p style="margin: 5px 0 0 0; color: #1e293b;"><strong>Department:</strong> ${departmentName}</p>
          </div>
          <p style="color: #475569; font-size: 16px; line-height: 1.6;">
            We're excited to have you in this class. You can now access all course materials and start learning.
          </p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
          <p style="color: #94a3b8; font-size: 14px; text-align: center; margin: 0;">
            This is an automated email from UniSphere.
          </p>
        </div>
      `
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error };
    }

    return { success: true, data: resData };
  } catch (err) {
    console.error('Email sending failed:', err);
    return { success: false, error: err };
  }
};
