/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { forwardRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import config from "@/data/rcrc";
import { unslugify } from "@/lib/function";

interface RegistrationTicketProps {
    ticketData: any;
    ticketUrl: string;
}

const RegistrationTicket = forwardRef<HTMLDivElement, RegistrationTicketProps>(
    ({ ticketData, ticketUrl }, ref) => {
        return (
            <div
                ref={ref}
                className="relative w-full max-w-[560px] overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-2xl"
            >
                <div className="flex flex-col sm:flex-row">
                    {/* Side Branding Panel */}
                    <div className="relative flex w-full flex-col items-center justify-center bg-[#111827] px-6 py-8 text-center sm:w-44 sm:py-0">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,150,12,0.25),transparent)]" />
                        <div className="absolute top-0 right-0 bottom-0 hidden w-px bg-gradient-to-b from-transparent via-amber-500/30 to-transparent sm:block" />
                        <div className="absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent sm:hidden" />

                        <h2 className="relative z-10 hidden text-lg font-black tracking-[0.2em] text-white uppercase [writing-mode:vertical-lr] sm:block sm:rotate-180">
                            {config.event.name}
                        </h2>
                        <h2 className="relative z-10 text-lg font-black tracking-[0.2em] text-white uppercase sm:hidden">
                            {config.event.name}
                        </h2>
                        <p className="relative z-10 mt-2 text-[9px] font-bold tracking-[0.4em] text-amber-500 uppercase">
                            {config.event.theme}
                        </p>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex flex-1 flex-col p-6 text-left sm:p-8">
                        <div className="mb-6 flex items-start justify-between gap-4">
                            <div className="min-w-0">
                                <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                    Attendee
                                </p>
                                <h3 className="mt-1 truncate text-2xl leading-tight font-black text-slate-900">
                                    {ticketData.full_name}
                                </h3>
                            </div>
                            <div className="flex shrink-0 -space-x-2">
                                <div className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-white bg-white shadow-sm ring-1 ring-slate-100">
                                    <img
                                        src={config.hierarchy[0].logo || ""}
                                        alt="RCCG"
                                        className="h-full w-full object-contain p-1"
                                    />
                                </div>
                                <div className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-white bg-white shadow-sm ring-1 ring-slate-100">
                                    <img
                                        src={config.hierarchy[1].logo || ""}
                                        alt="CRM"
                                        className="h-full w-full object-contain p-1"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex-1 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-[9px] font-bold tracking-widest text-slate-400 uppercase">
                                            Category
                                        </p>
                                        <p className="mt-0.5 text-xs font-bold text-slate-700">
                                            {ticketData.category}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-bold tracking-widest text-slate-400 uppercase">
                                            Chapter
                                        </p>
                                        <p className="mt-0.5 text-xs font-bold text-amber-700">
                                            {unslugify(
                                                ticketData.chapter,
                                            ).toUpperCase()}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[9px] font-bold tracking-widest text-slate-400 uppercase">
                                        Unit / Department
                                    </p>
                                    <p className="mt-0.5 text-xs font-bold text-slate-700">
                                        {ticketData.unit || "General Attendee"}
                                    </p>
                                </div>
                                <p className="font-mono text-[9px] tracking-wider text-slate-300">
                                    ID:{" "}
                                    {ticketData.id
                                        .substring(0, 13)
                                        .toUpperCase()}
                                </p>
                            </div>

                            <div className="flex shrink-0 flex-col items-center gap-2">
                                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3 shadow-inner">
                                    <QRCodeSVG
                                        value={ticketUrl}
                                        size={110}
                                        level="H"
                                    />
                                </div>
                                <p className="text-[8px] font-bold tracking-[0.2em] text-slate-400 uppercase">
                                    Scan to Verify
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
);

RegistrationTicket.displayName = "RegistrationTicket";

export default RegistrationTicket;
