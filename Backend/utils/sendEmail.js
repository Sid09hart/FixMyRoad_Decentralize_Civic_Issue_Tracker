const{Resend} = require("resend");
require("dotenv").config();

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({subject,html})=>{
    try{
        const {data,error} =await resend.emails.send({
            from: "FixMyRoad <onboarding@resend.dev>", 
    to: process.env.AUTHORITY_EMAIL,
    subject,
    html,
        });
          if (error) {
      console.error("❌ Email sending error:", error);
      return;
    }
        console.log("📬 Email sent with ID:", data.id);

    }catch(err){
    console.error("❌ Resend email failed:", err);

    }
};
module.exports = sendEmail;
