import { Separator } from "@/components/ui/separator";
import { Heading } from "./settings/_components/Heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCardIcon, DollarSignIcon, PackageIcon } from "lucide-react";
import { priceFormatter } from "@/lib/utils";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import { getSalesCount } from "@/actions/get-sales-count";
import { getStockCount } from "@/actions/get-stock-count";
import { Overview } from "@/components/Overview";
import { getGraphRevenue } from "@/actions/get-graph-revenue";

interface DashboardPageProps {
    params: { storeId: string }
}

export default async function DashboardPage({ params }: DashboardPageProps) {
    const totalRevenue = await getTotalRevenue(params.storeId)
    const salesCount = await getSalesCount(params.storeId)
    const stockCount = await getStockCount(params.storeId)
    const graphRevenue = await getGraphRevenue(params.storeId)

    return (
        <div className="p-8">
            <div className="space-y-4">
                <Heading title="Painel" description="Visão geral da sua loja" />

                <Separator />

                <div className="grid grid-cols-3 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-sm font-medium">
                                Rendimento Total
                            </CardTitle>
                            <DollarSignIcon className="size-4 text-muted-foreground" />
                        </CardHeader>

                        <CardContent>
                            <p className="text-2xl font-bold">
                                {priceFormatter.format(totalRevenue)}
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-sm font-medium">
                                Vendas
                            </CardTitle>
                            <CreditCardIcon className="size-4 text-muted-foreground" />
                        </CardHeader>

                        <CardContent>
                            <p className="text-2xl font-bold">
                                {salesCount === 0 ? "0" : `+${salesCount}`}
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-sm font-medium">
                                Produtos em Estoque
                            </CardTitle>
                            <PackageIcon className="size-4 text-muted-foreground" />
                        </CardHeader>

                        <CardContent>
                            <p className="text-2xl font-bold">
                                {stockCount}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>
                            Visão Geral
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="pl-2">
                        <Overview data={graphRevenue} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
