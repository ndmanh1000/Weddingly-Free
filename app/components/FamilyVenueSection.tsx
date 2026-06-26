"use client";

import Link from "next/link";
import { FaMapMarkerAlt } from "react-icons/fa";
import { config } from "@/lib/config";

const MAROON = "#6b1f2b";

type FamilyVenueSectionProps = {
  active?: boolean;
};

function DirectionsButton({ href }: { href: string }) {
  return (
    <Link
      href={href}
      target="_blank"
      className="mt-4 inline-flex items-center gap-3 font-ovo text-sm tracking-widest"
      style={{ color: MAROON }}
    >
      <span
        className="flex h-9 w-9 items-center justify-center rounded-full text-white"
        style={{ backgroundColor: MAROON }}
      >
        <FaMapMarkerAlt className="text-sm" />
      </span>
      CHỈ ĐƯỜNG
    </Link>
  );
}

function DateTimeBlock() {
  const eventDate = new Date(config.eventDate);
  const day = String(eventDate.getDate()).padStart(2, "0");
  const month = String(eventDate.getMonth() + 1).padStart(2, "0");
  const year = String(eventDate.getFullYear()).slice(-2);
  const weekday = eventDate
    .toLocaleDateString("vi-VN", { weekday: "long" })
    .toUpperCase();

  return (
    <div className="my-8 flex items-center justify-center gap-4 font-ovo">
      <div className="text-right text-sm leading-tight">
        <p>{config.intimateParty.time}</p>
      </div>
      <div className="flex flex-col items-center border-x px-4" style={{ borderColor: MAROON }}>
        <span className="text-3xl leading-none">{day}</span>
        <span className="text-3xl leading-none my-1">{month}</span>
        <span className="text-3xl leading-none">{year}</span>
      </div>
      <div className="text-left text-sm leading-tight">
        <p>{weekday}</p>
      </div>
    </div>
  );
}

export default function FamilyVenueSection({ active = true }: FamilyVenueSectionProps) {
  const [groomName, brideName] = config.coupleNames.split(/[-–]/).map((n) => n.trim());

  return (
    <div
      className={`h-full w-full overflow-y-auto px-6 py-8 ${active ? "fadeInMove active" : "fadeInMove"}`}
      style={{
        background: "linear-gradient(180deg, #f7f2ea 0%, #efe8dc 100%)",
        color: MAROON,
      }}
    >
      {/* Family intro */}
      <div className="mx-auto max-w-[360px] text-center">
        <div className="grid grid-cols-2 gap-4 text-sm font-legan">
          <div>
            <p className="font-ovo text-base tracking-widest mb-3">{config.families.groomTitle}</p>
            <p>{config.families.groomFather}</p>
            <p>{config.families.groomMother}</p>
          </div>
          <div>
            <p className="font-ovo text-base tracking-widest mb-3">{config.families.brideTitle}</p>
            <p>{config.families.brideFather}</p>
            <p>{config.families.brideMother}</p>
          </div>
        </div>

        <div className="my-6 flex justify-center">
          <div
            className="flex h-16 w-10 items-center justify-center rounded-full border text-lg font-ovo"
            style={{ borderColor: MAROON }}
          >
            {groomName?.[0]}
            {brideName?.[0]}
          </div>
        </div>

        <p className="text-sm font-legan leading-relaxed px-2">{config.invitationMessage}</p>

        <div className="my-5 h-8 w-px mx-auto" style={{ backgroundColor: MAROON }} />

        <p className="font-ovo text-2xl tracking-widest">{groomName?.toUpperCase()}</p>
        <p className="font-thesignature text-3xl my-1">and</p>
        <p className="font-ovo text-2xl tracking-widest">{brideName?.toUpperCase()}</p>

        <span
          className="mt-6 inline-block rounded-full px-8 py-2 text-xs font-ovo tracking-widest text-white"
          style={{ backgroundColor: MAROON }}
        >
          {config.ceremonyLabel}
        </span>
      </div>

      <div className="mx-auto mt-10 max-w-[360px] border-t border-dashed pt-8 text-center" style={{ borderColor: "#b8a89a" }}>
        <p className="text-xs font-legan mb-1">{config.lunarDate}</p>
        <p className="text-sm font-legan mb-1">Địa điểm</p>
        <p className="font-ovo text-lg tracking-widest mb-2">{config.groomHome.title}</p>
        <p className="text-sm font-legan leading-relaxed px-2">{config.groomHome.address}</p>
        <DirectionsButton href={config.groomHome.googleMapsLink} />

        <div className="my-8">
          <span
            className="inline-block rounded-full px-6 py-2 text-xs font-ovo tracking-widest text-white"
            style={{ backgroundColor: MAROON }}
          >
            {config.intimateParty.label}
          </span>
        </div>

        <DateTimeBlock />

        <p className="text-xs font-legan mb-1">{config.lunarDate}</p>
        <p className="text-sm font-legan mb-1">Địa điểm</p>
        <p className="font-ovo text-lg tracking-widest mb-2">{config.mainVenue.title}</p>
        <p className="text-sm font-legan leading-relaxed px-2">{config.mainVenue.address}</p>
        <DirectionsButton href={config.mainVenue.googleMapsLink} />
      </div>
    </div>
  );
}
