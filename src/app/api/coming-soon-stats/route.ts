import { getEarlyAccessCount } from "@/lib/early-access-counter";

export const runtime = "nodejs";

export async function GET() {
  const count = await getEarlyAccessCount();
  return Response.json({ count });
}

