import sgMail from "@sendgrid/mail";
process.env.TS_NODE_DEV && require("dotenv").config();

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("No SENDGRID_API_KEY");
}

export const registrationEmail = (name: string, email: string) => {
  if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email,
      from: "bishekast@gmail.com",
      subject: `${name} به بی شکست خوش آمدید`,
      // text: `${name} ثبت نام شما در بی شکست با موفقیت انجام شد`,
      html: `<img src="https://res.cloudinary.com/dutzk4kjd/image/upload/v1651150678/Bishekast/retina-logo-3_jkto9d.png" , alt="لوگو بی شکست" , width="100px">
      <p>${name} ثبت نام شما در بی شکست با موفقیت انجام شد</p>`,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
  }
};
