import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

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
    const info = await transporter.sendMail({
      from: `"UniSphere" <${process.env.EMAIL_USER}>`,
      to: studentEmail,
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

    console.log('Enrollment email sent:', info.messageId);
    return { success: true, data: info };
  } catch (err) {
    console.error('Email sending failed:', err);
    return { success: false, error: err };
  }
};

export const sendPasswordResetEmail = async (
  email: string,
  name: string,
  resetUrl: string
) => {
  try {
    const info = await transporter.sendMail({
      from: `"UniSphere" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Reset your UniSphere password',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h1 style="color: #0f172a; margin-bottom: 20px;">Password Reset Request</h1>
          <p style="color: #475569; font-size: 16px; line-height: 1.6;">Hi <strong>${name}</strong>,</p>
          <p style="color: #475569; font-size: 16px; line-height: 1.6;">
            We received a request to reset your password. Click the button below to choose a new password:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #4f46e5; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">Reset Password</a>
          </div>
          <p style="color: #475569; font-size: 14px; line-height: 1.6;">
            If you didn't request a password reset, you can safely ignore this email. This link will expire in 1 hour.
          </p>
          <p style="color: #475569; font-size: 14px; line-height: 1.6;">
            If the button above doesn't work, copy and paste this link into your browser:
            <br />
            <a href="${resetUrl}" style="color: #4f46e5;">${resetUrl}</a>
          </p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
          <p style="color: #94a3b8; font-size: 14px; text-align: center; margin: 0;">
            This is an automated email from UniSphere.
          </p>
        </div>
      `
    });

    console.log('Password reset email sent:', info.messageId);
    return { success: true, data: info };
  } catch (err) {
    console.error('Password reset email failed:', err);
    return { success: false, error: err };
  }
};
