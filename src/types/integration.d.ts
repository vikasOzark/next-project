export type IntegrationObjectType = {
    id: string;
    providerName: $Enums.INTEGRATION_PROVIDER;
    config_json: Prisma.JsonValue;
    isActive: boolean;
    createdAt: Date;
    uniqueCompanyId: string;
    userId: string;
    webhookurl: string;
    webhookSecret: string;
};
export type IntegrationReturnType = Prisma.PrismaPromise<
    IntegrationObjectType[]
>;
