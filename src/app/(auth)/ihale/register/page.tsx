import { redirect } from "next/navigation";

import { buildCentralAuthHref, buildIhaleReturnTo, getRequestOrigin } from "@/lib/ihale-handoff";

export default async function IhaleRegisterShortcutPage() {
  const origin = await getRequestOrigin();
  const returnTo = buildIhaleReturnTo(origin, "tr");
  redirect(buildCentralAuthHref({ locale: "tr", mode: "register", returnTo }));
}
