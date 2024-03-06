import { headers } from "next/headers";
import axios, { AxiosError } from "axios";

export async function POST(request: Request) {
  const headersList = headers();
  const authorization = headersList.get("Authorization");

  if (!authorization) {
    return Response.json(
      { message: "Must have authorization header" },
      { status: 401 }
    );
  }

  type RedirectRequest = {
    domain: string;
    targetDomain: string;
  };
  const requestBody: RedirectRequest = await request.json();

  try {
    await axios.put(
      `https://api.godaddy.com/v1/domains/${requestBody.domain}/records/CNAME/www`,
      [
        {
          data: requestBody.targetDomain,
          ttl: 3600,
        },
      ],
      {
        headers: {
          Authorization: authorization,
        },
      }
    );
  } catch (error) {
    if (error instanceof AxiosError) {
      return Response.json(
        {
          message:
            error.response?.data.message || "Failed to add redirect record",
        },
        { status: error.response?.status }
      );
    }
  }

  return Response.json(
    { message: "Added redirect record successfully!" },
    { status: 200 }
  );
}
