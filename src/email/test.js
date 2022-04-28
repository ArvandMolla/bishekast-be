import { createRequire } from "module";
const require = createRequire(import.meta.url);

const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: "",
  server: "us20",
});

const event = {
  name: "JS Developers Meetup",
};

const footerContactInfo = {
  company: "بی شکست",
  address1: "تهران ستارخان حبیب الله",
  address2: "پلاک 110",
  city: "تهران",
  state: "GA",
  zip: "30308",
  country: "ایران",
};

const campaignDefaults = {
  from_name: "بی شکست",
  from_email: "gettintogether@bishekast.com",
  subject: "خوش آمدید",
  language: "EN_US",
};

async function run() {
  try {
    const response = await mailchimp.lists.createList({
      name: event.name,
      contact: footerContactInfo,
      permission_reminder: "permission_reminder",
      email_type_option: true,
      campaign_defaults: campaignDefaults,
    });

    console.log(
      `Successfully created an audience. The audience id is ${response.id}.`
    );
  } catch (error) {
    console.log(error.message);
  }
}

run();
