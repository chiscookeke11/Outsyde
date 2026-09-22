"use client";

import {
    Download,
    FileJson,
    FileSpreadsheet,
} from "lucide-react";


const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://127.0.0.1:8000";


export default function ExportPage() {

    function downloadJSON() {
        window.open(
            `${API_URL}/export/searches/json`,
            "_blank"
        );
    }


    function downloadCSV() {
        window.open(
            `${API_URL}/export/searches/csv`,
            "_blank"
        );
    }


    return (
        <div className="min-h-screen bg-neutral-50">
            <div className="flex">



                <div className="min-w-0 flex-1">


                    <main className="px-6 py-8 lg:px-8">
                        <div className="mx-auto max-w-5xl">

                            <div className="mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-500">
                                        <Download size={21} />
                                    </div>

                                    <div>
                                        <h1 className="text-2xl font-semibold text-neutral-900">
                                            Export
                                        </h1>

                                        <p className="mt-1 text-sm text-neutral-500">
                                            Download your saved weather searches.
                                        </p>
                                    </div>
                                </div>
                            </div>


                            <div className="grid gap-5 md:grid-cols-2">

                                {/* JSON */}
                                <div className="rounded-3xl border border-neutral-200 bg-white p-6">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-500">
                                        <FileJson size={23} />
                                    </div>

                                    <h2 className="mt-6 text-lg font-semibold text-neutral-900">
                                        JSON Export
                                    </h2>

                                    <p className="mt-2 text-sm leading-6 text-neutral-500">
                                        Export all saved weather searches as structured JSON data.
                                    </p>

                                    <button
                                        onClick={downloadJSON}
                                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 px-4 py-3 text-sm font-medium text-white hover:bg-neutral-800"
                                    >
                                        <Download size={16} />
                                        Download JSON
                                    </button>

                                </div>


                                {/* CSV */}
                                <div className="rounded-3xl border border-neutral-200 bg-white p-6">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                        <FileSpreadsheet size={23} />
                                    </div>

                                    <h2 className="mt-6 text-lg font-semibold text-neutral-900">
                                        CSV Export
                                    </h2>

                                    <p className="mt-2 text-sm leading-6 text-neutral-500">
                                        Export saved searches in a spreadsheet-friendly CSV format.
                                    </p>

                                    <button
                                        onClick={downloadCSV}
                                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 px-4 py-3 text-sm font-medium text-white hover:bg-neutral-800"
                                    >
                                        <Download size={16} />
                                        Download CSV
                                    </button>

                                </div>

                            </div>


                            <div className="mt-6 rounded-2xl border border-sky-100 bg-sky-50 p-5">
                                <p className="text-sm font-medium text-neutral-900">
                                    Export your weather data
                                </p>

                                <p className="mt-1 text-sm leading-6 text-neutral-600">
                                    JSON is useful for developers and applications,
                                    while CSV can be opened directly in spreadsheet
                                    applications such as Excel or Google Sheets.
                                </p>
                            </div>

                        </div>
                    </main>
                </div>

            </div>
        </div>
    );
}