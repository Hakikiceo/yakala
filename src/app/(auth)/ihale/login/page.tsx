import { redirect } from "next/navigation";

import { buildCentralAuthHref, buildIhaleReturnTo, getRequestOrigin } from "@/lib/ihale-handoff";

export default async function IhaleLoginShortcutPage() {
  const origin = await getRequestOrigin();
  const returnTo = buildIhaleReturnTo(origin, "tr");
  redirect(buildCentralAuthHref({ locale: "tr", mode: "login", returnTo }));
}
