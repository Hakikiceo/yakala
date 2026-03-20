import { redirect } from "next/navigation";

import { buildCentralAuthHref, buildIhaleReturnTo, getRequestOrigin } from "@/lib/ihale-handoff";

export default async function IhaleLoginShortcutPageEn() {
  const origin = await getRequestOrigin();
  const returnTo = buildIhaleReturnTo(origin, "en");
  redirect(buildCentralAuthHref({ locale: "en", mode: "login", returnTo }));
}
