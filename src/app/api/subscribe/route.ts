import { NextRequest, NextResponse } from "next/server";

// 配置您的QQ邮箱地址（接收订阅通知的邮箱）
// 在 .env.local 文件中设置:
// QQ_EMAIL=your-qq@qq.com
// QQ_EMAIL_PASSWORD=your_qq_email_auth_code (QQ邮箱授权码，不是登录密码)
const QQ_EMAIL = process.env.QQ_EMAIL || "your-qq@qq.com";
const QQ_EMAIL_PASSWORD = process.env.QQ_EMAIL_PASSWORD || "";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // 记录订阅信息
    console.log("New newsletter subscription:", email);
    console.log("Sending notification to QQ email:", QQ_EMAIL);

    // 使用 Nodemailer 通过QQ邮箱SMTP发送邮件
    if (QQ_EMAIL_PASSWORD && QQ_EMAIL !== "your-qq@qq.com") {
      try {
        const nodemailer = await import('nodemailer');
        const createTransport = nodemailer.default.createTransport;

        const transporter = createTransport({
          host: 'smtp.qq.com',
          port: 465,
          secure: true, // 使用SSL
          auth: {
            user: QQ_EMAIL,
            pass: QQ_EMAIL_PASSWORD, // QQ邮箱授权码，不是登录密码
          },
        });

        const mailOptions = {
          from: QQ_EMAIL,
          to: QQ_EMAIL, // 发送给自己
          subject: '新用户订阅通知 - TinyMint Store',
          html: `
            <h2>新用户订阅通知</h2>
            <p>有新的用户订阅了您的邮件列表：</p>
            <p><strong>订阅邮箱：</strong> ${email}</p>
            <p><strong>订阅时间：</strong> ${new Date().toLocaleString('zh-CN')}</p>
            <p><strong>时间戳：</strong> ${new Date().toISOString()}</p>
            <hr>
            <p style="color: #999; font-size: 12px;">此邮件由 TinyMint Store 自动发送</p>
          `,
        };

        await transporter.sendMail(mailOptions);
        console.log("Email notification sent successfully to QQ email:", QQ_EMAIL);
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
        // 即使邮件发送失败，也返回成功，因为订阅已记录
        // 但记录错误以便调试
        if (emailError instanceof Error && emailError.message) {
          console.error("Error details:", emailError.message);
        }
      }
    } else {
      console.log("QQ email configuration not found.");
      console.log("Please set QQ_EMAIL and QQ_EMAIL_PASSWORD in .env.local");
      console.log("Subscription email:", email, "should be sent to:", QQ_EMAIL);
    }

    // 返回成功响应
    return NextResponse.json(
      { message: "Subscription successful", email },
      { status: 200 }
    );
  } catch (error) {
    console.error("Subscription error:", error);
    return NextResponse.json(
      { error: "Failed to process subscription" },
      { status: 500 }
    );
  }
}
