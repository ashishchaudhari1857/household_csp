export const sendSMS = async (to, message) => {
  // TODO: Integrate with Twilio
  return { status: 'sent', to, message };
};

export const sendEmail = async (to, subject, body) => {
  // TODO: Integrate with SendGrid
  return { status: 'sent', to, subject };
};

export const sendPush = async (userId, payload) => {
  // TODO: Integrate with Firebase
  return { status: 'sent', userId };
};