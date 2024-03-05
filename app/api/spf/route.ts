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

  type SpfRequest = {
    domain: string;
    data: string;
  };
  const requestBody: SpfRequest = await request.json();

  try {
    await axios.patch(
      `https://api.godaddy.com/v1/domains/${requestBody.domain}/records`,
      [
        {
          data: requestBody.data,
          name: "@",
          ttl: 3600,
          type: "TXT",
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
          message: error.response?.data.message || "Failed to add SPF record",
        },
        { status: error.response?.status }
      );
    }
  }

  return Response.json(
    { message: "Added SPF record successfully!" },
    { status: 200 }
  );
}
