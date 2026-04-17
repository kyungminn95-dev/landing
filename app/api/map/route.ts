import { NextResponse } from "next/server";

export async function GET() {
  const clientId = "pvgg11sxz1";
  const clientSecret = "Cc3QYL0t3I86a9rVNm6OupnyI4rePZSHH8fRDASg";

  // 서울시 마포구 독막로6길 6 좌표 (경도, 위도)
  const lng = 126.9237;
  const lat = 37.5476;

  const url = `https://naveropenapi.apigw.ntruss.com/map-static/v2/raster?w=800&h=400&center=${lng},${lat}&level=16&markers=type:d|size:mid|pos:${lng}%20${lat}`;

  const res = await fetch(url, {
    headers: {
      "X-NCP-APIGW-API-KEY-ID": clientId,
      "X-NCP-APIGW-API-KEY": clientSecret,
    },
  });

  if (!res.ok) {
    return new NextResponse("Map fetch failed", { status: 500 });
  }

  const buffer = await res.arrayBuffer();
  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
