type NotifyChannel = "email" | "whatsapp" | "telegram";

type AccessApprovalNotificationInput = {
  appKey: string;
  email: string | null;
  notifyChannel: string | null;
  notifyTarget: string | null;
};

function asChannel(value: string | null): NotifyChannel {
  if (value === "whatsapp" || value === "telegram" || value === "email") {
    return value;
  }

  return "email";
}

function getAppDisplayName(appKey: string) {
  if (appKey === "ihaleradar") {
    return "Ihale Radar";
  }

  return appKey;
}

async function sendByResendEmail({
  to,
  appDisplayName,
}: {
  to: string;
  appDisplayName: string;
}) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const from = process.env.CENTRAL_NOTIFY_FROM_EMAIL;

  if (!resendApiKey || !from) {
    return { ok: false as const, reason: "email_not_configured" as const };
  }

  const subject = `${appDisplayName} erisim onayiniz aktif`;
  const text =
    `Merhaba,\n\n` +
    `${appDisplayName} erisim talebiniz onaylandi. ` +
    `https://www.yakala.io/login adresinden giris yapabilirsiniz.\n\n` +
    `YAKALA.IO`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${resendApiKey}`,
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text,
    }),
  });

  if (!response.ok) {
    return { ok: false as const, reason: "email_send_failed" as const };
  }

  return { ok: true as const };
}

async function sendByWebhook(input: {
  appKey: string;
  appDisplayName: string;
  channel: NotifyChannel;
  target: string;
  email: string | null;
}) {
  const webhookUrl = process.env.CENTRAL_NOTIFICATION_WEBHOOK_URL;

  if (!webhookUrl) {
    return { ok: false as const, reason: "webhook_not_configured" as const };
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.CENTRAL_NOTIFICATION_WEBHOOK_TOKEN
        ? `Bearer ${process.env.CENTRAL_NOTIFICATION_WEBHOOK_TOKEN}`
        : "",
    },
    body: JSON.stringify({
      event: "access_approved",
      appKey: input.appKey,
      appDisplayName: input.appDisplayName,
      channel: input.channel,
      target: input.target,
      email: input.email,
      message: `${input.appDisplayName} erisim talebiniz onaylandi.`,
      loginUrl: "https://www.yakala.io/login",
      timestamp: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    return { ok: false as const, reason: "webhook_send_failed" as const };
  }

  return { ok: true as const };
}

export async function notifyAccessApproved(input: AccessApprovalNotificationInput) {
  const channel = asChannel(input.notifyChannel);
  const appDisplayName = getAppDisplayName(input.appKey);

  if (channel === "email") {
    if (!input.email) {
      return { ok: false as const, reason: "missing_email" as const };
    }

    return sendByResendEmail({
      to: input.email,
      appDisplayName,
    });
  }

  if (!input.notifyTarget) {
    return { ok: false as const, reason: "missing_channel_target" as const };
  }

  return sendByWebhook({
    appKey: input.appKey,
    appDisplayName,
    channel,
    target: input.notifyTarget,
    email: input.email,
  });
}
