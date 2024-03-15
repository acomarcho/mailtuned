import { headers } from "next/headers";

export async function GET() {
  const headersList = headers();
  const authorization = headersList.get("Authorization");

  if (!authorization) {
    return Response.json(
      { message: "Must have authorization header" },
      { status: 401 }
    );
  }

  const response = await fetch("https://api.godaddy.com/v1/domains?limit=1000", {
    headers: {
      Authorization: authorization,
    },
  });
  const data = await response.json();

  return Response.json({ data }, { status: response.status });
}
