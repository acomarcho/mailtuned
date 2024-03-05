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

  type DmarcRequest = {
    domain: string;
    data: string;
  };
  const requestBody: DmarcRequest = await request.json();

  try {
    await axios.delete(
      `https://api.godaddy.com/v1/domains/${requestBody.domain}/records/TXT/_dmarc`,
      {
        headers: {
          Authorization: authorization,
        },
      }
    );
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status !== 404) {
        return Response.json(
          {
            message:
              error.response?.data.message || "Failed to add DMARC record",
          },
          { status: error.response?.status }
        );
      }

      // Allow 404 errors to continue.
    }
  }

  try {
    await axios.patch(
      `https://api.godaddy.com/v1/domains/${requestBody.domain}/records`,
      [
        {
          data: requestBody.data,
          name: "_dmarc",
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
          message: error.response?.data.message || "Failed to add DMARC record",
        },
        { status: error.response?.status }
      );
    }
  }

  return Response.json(
    { message: "Added DMARC record successfully!" },
    { status: 200 }
  );
}
