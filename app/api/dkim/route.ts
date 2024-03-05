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

  type DkimRequest = {
    domain: string;
    name: string;
    type: string;
    data: string;
  };
  const requestBody: DkimRequest = await request.json();

  try {
    await axios.patch(
      `https://api.godaddy.com/v1/domains/${requestBody.domain}/records`,
      [
        {
          data: requestBody.data,
          name: requestBody.name,
          ttl: 3600,
          type: requestBody.type,
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
          message: error.response?.data.message || "Failed to add DKIM record",
        },
        { status: error.response?.status }
      );
    }
  }

  return Response.json(
    { message: "Added DKIM record successfully!" },
    { status: 200 }
  );
}
