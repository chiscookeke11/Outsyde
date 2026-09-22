import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";


export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-neutral-50 font-season-vf ">
            <div className="flex">
                <Sidebar />

                <div className="min-w-0 flex-1">
                    <Header />

                    <main className="px-6 py-8 lg:px-8">
                        <div className="mx-auto max-w-7xl">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}