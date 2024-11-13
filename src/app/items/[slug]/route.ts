/* eslint-disable @typescript-eslint/no-unused-vars */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const slug = (await params).slug;
}
