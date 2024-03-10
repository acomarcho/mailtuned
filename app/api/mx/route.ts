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

  type MxRecordData = {
    value: string;
    priority: number;
  };
  type SpfRequest = {
    domain: string;
    data: MxRecordData[];
  };
  const requestBody: SpfRequest = await request.json();

  try {
    const datas = requestBody.data.map((mxRecord) => {
      return {
        data: mxRecord.value,
        name: "@",
        ttl: 3600,
        priority: mxRecord.priority,
        type: "MX",
      };
    });

    await axios.patch(
      `https://api.godaddy.com/v1/domains/${requestBody.domain}/records`,
      datas,
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
          message: error.response?.data.message || "Failed to add MX records",
        },
        { status: error.response?.status }
      );
    }
  }

  return Response.json(
    { message: "Added MX records successfully!" },
    { status: 200 }
  );
}
