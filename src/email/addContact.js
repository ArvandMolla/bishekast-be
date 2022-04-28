import { createRequire } from "module";
const require = createRequire(import.meta.url);

const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: "",
  server: "us20",
});

const listId = "77360cd9f2";
const subscribingUser = {
  firstName: "اروند",
  lastName: "ملا",
  email: "mr.arvand@gmail.com",
};

async function run() {
  const response = await mailchimp.lists.addListMember(listId, {
    email_address: subscribingUser.email,
    status: "subscribed",
    merge_fields: {
      FNAME: subscribingUser.firstName,
      LNAME: subscribingUser.lastName,
    },
  });

  console.log(
    `Successfully added contact as an audience member. The contact's id is ${response.id}.`
  );
}

run();
