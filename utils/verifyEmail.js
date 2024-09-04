const axios = require("axios");

async function verifyEmailWithMailboxlayer(email) {
  const accessKey = process.env.accessKey; // Replace with your Mailboxlayer access key

  try {
    const response = await axios.get(
      `http://apilayer.net/api/check?access_key=${accessKey}&email=${email}`
    );

    if (response.data.smtp_check === true) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error during email verification:", error);
    return false;
  }
}

module.exports = verifyEmailWithMailboxlayer;
