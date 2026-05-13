import { notFound } from "next/navigation";
import TenantDetailPageB from "@/components/version-b/TenantDetailPageB";
import { findTenantByRouteSlug } from "@/lib/tenants";

type Props = { params: Promise<{ slug: string }> };

export default async function PlatformAdminTenantDetail({ params }: Props) {
  const { slug } = await params;
  const tenant = findTenantByRouteSlug(slug);
  if (!tenant) notFound();
  return <TenantDetailPageB tenant={tenant} />;
}
