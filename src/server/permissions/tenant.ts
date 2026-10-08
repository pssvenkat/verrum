export type TenantContext = {
  organizationId: string;
  userId: string;
  role: "owner" | "admin" | "manager" | "viewer";
};

export function assertSameTenant(context: TenantContext, record: { organizationId?: string; tenantId?: string }) {
  const recordTenant = record.organizationId ?? record.tenantId;

  if (!recordTenant || recordTenant !== context.organizationId) {
    throw new Error("Access denied for tenant boundary");
  }
}
