"use client";

import { useState } from "react";

type Section = "dashboard" | "incidents" | "security" | "employees" | "files";

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [section, setSection] = useState<Section>("dashboard");

  if (!entered) {
    return (
      <main className="min-h-screen bg-[#050505] text-[#d6d6d6] font-mono flex items-center justify-center p-6">
        <div className="w-full max-w-3xl border border-[#222] bg-[#080808] shadow-2xl">
          <div className="border-b border-[#222] px-6 py-3 flex justify-between text-xs text-gray-600">
            <span>ARCHIVE SYSTEM</span>
            <span>TERMINAL 03</span>
          </div>

          <div className="p-10 md:p-16">
            <div className="text-xs text-gray-600 mb-8">
              INTERNAL INFORMATION ARCHIVE
            </div>

            <h1 className="text-3xl md:text-5xl tracking-[0.25em] mb-6">
              ARCHIVE SYSTEM
            </h1>

            <div className="h-px bg-[#222] mb-8" />

            <div className="space-y-2 text-sm text-gray-500 mb-12">
              <p>ACCESS LEVEL: PUBLIC</p>
              <p>SYSTEM STATUS: ONLINE</p>
              <p>
                DATABASE STATUS:{" "}
                <span className="text-gray-300">OPERATIONAL</span>
              </p>
            </div>

            <button
              onClick={() => setEntered(true)}
              className="border border-[#444] px-8 py-3 text-sm tracking-[0.2em] hover:bg-[#151515] hover:border-[#777] transition-all"
            >
              ENTER ARCHIVE
            </button>

            <p className="mt-10 text-[10px] text-gray-700">
              Unauthorized access is prohibited.
            </p>
          </div>

          <div className="border-t border-[#222] px-6 py-3 text-[10px] text-gray-700 flex justify-between">
            <span>ARCHIVE SYSTEM v3.7</span>
            <span>© 1998–2026</span>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-[#d6d6d6] font-mono">
      {/* TOP BAR */}
      <header className="h-14 border-b border-[#222] flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 bg-gray-400" />
          <span className="tracking-[0.2em] text-sm">
            ARCHIVE SYSTEM
          </span>
        </div>

        <div className="text-[10px] text-gray-600">
          TERMINAL 03&nbsp;&nbsp;|&nbsp;&nbsp;SESSION ACTIVE
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-3.5rem)]">

        // Sidebar
        <aside className="w-56 border-r border-[#222] p-5 hidden md:block">
          <div className="text-[10px] text-gray-700 tracking-widest mb-5">
            DIRECTORY
          </div>

          <nav className="space-y-1">
            <NavButton
              label="Dashboard"
              active={section === "dashboard"}
              onClick={() => setSection("dashboard")}
            />

            <NavButton
              label="Incident Reports"
              active={section === "incidents"}
              onClick={() => setSection("incidents")}
            />

            <NavButton
              label="Security"
              active={section === "security"}
              onClick={() => setSection("security")}
            />

            <NavButton
              label="Employees"
              active={section === "employees"}
              onClick={() => setSection("employees")}
            />

            <NavButton
              label="Recovered Files"
              active={section === "files"}
              onClick={() => setSection("files")}
            />
          </nav>

          <div className="mt-12 pt-5 border-t border-[#1b1b1b]">
            <div className="text-[10px] text-gray-700 mb-2">
              SYSTEM
            </div>

            <div className="text-xs text-gray-600">
              DATABASE: ONLINE
            </div>

            <div className="text-xs text-gray-600 mt-1">
              CONNECTION: SECURE
            </div>
          </div>
        </aside>

        // Main content
        <section className="flex-1 p-6 md:p-10 max-w-6xl">

          {section === "dashboard" && <Dashboard />}

          {section === "incidents" && <Incidents />}

          {section === "security" && <Security />}

          {section === "employees" && <Employees />}

          {section === "files" && <Files />}
        </section>
      </div>
    </main>
  );
}


// Components

function NavButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-2 text-xs transition-all ${
        active
          ? "bg-[#151515] text-gray-200 border-l border-gray-500"
          : "text-gray-600 hover:text-gray-300 hover:bg-[#0d0d0d]"
      }`}
    >
      {label}
    </button>
  );
}


function Dashboard() {
  return (
    <div>
      <div className="text-[10px] text-gray-700 tracking-widest mb-3">
        SYSTEM / DASHBOARD
      </div>

      <h1 className="text-2xl tracking-widest mb-2">
        DATABASE INDEX
      </h1>

      <p className="text-xs text-gray-600 mb-10">
        Welcome to the internal information archive.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

        <StatCard
          number="147"
          label="INCIDENT REPORTS"
        />

        <StatCard
          number="003"
          label="ACTIVE INVESTIGATIONS"
        />

        <StatCard
          number="148"
          label="EMPLOYEE RECORDS"
        />

      </div>

      <div className="mt-10 border border-[#222] p-6">

        <div className="text-[10px] text-gray-700 tracking-widest mb-5">
          SYSTEM INFORMATION
        </div>

        <div className="space-y-3 text-xs">

          <InfoRow
            label="DATABASE CREATED"
            value="1998-04-17"
          />

          <InfoRow
            label="LAST DATABASE UPDATE"
            value="2026-09-29"
          />

          <InfoRow
            label="ARCHIVE STATUS"
            value="OPERATIONAL"
          />

          <InfoRow
            label="SECURITY LEVEL"
            value="PUBLIC"
          />

        </div>
      </div>

      <div className="mt-8 text-[10px] text-gray-700">
        No system anomalies detected.
      </div>
    </div>
  );
}


function StatCard({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <div className="border border-[#222] p-5 hover:border-[#444] transition-all">
      <div className="text-3xl text-gray-300 mb-3">
        {number}
      </div>

      <div className="text-[10px] text-gray-600 tracking-widest">
        {label}
      </div>
    </div>
  );
}


function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between border-b border-[#151515] pb-2">
      <span className="text-gray-600">
        {label}
      </span>

      <span className="text-gray-400">
        {value}
      </span>
    </div>
  );
}


function Incidents() {
  return (
    <div>
      <SectionTitle
        path="SYSTEM / INCIDENT REPORTS"
        title="INCIDENT REPORTS"
      />

      <div className="space-y-2">

        <FileRow
          id="INC-001"
          title="Unauthorized Access"
          date="2001-03-14"
          status="CLOSED"
        />

        <FileRow
          id="INC-014"
          title="Employee Disappearance"
          date="2007-11-02"
          status="CLOSED"
        />

        <FileRow
          id="INC-027"
          title="Security Camera Failure"
          date="2013-06-19"
          status="CLOSED"
        />

        <FileRow
          id="INC-071"
          title="Unidentified Noise"
          date="2019-08-21"
          status="UNDER REVIEW"
        />

        <FileRow
          id="INC-147"
          title="████████████████"
          date="2026-09-29"
          status="RESTRICTED"
        />

      </div>
    </div>
  );
}


function Security() {
  return (
    <div>
      <SectionTitle
        path="SYSTEM / SECURITY"
        title="SECURITY NETWORK"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

        <Camera id="CAM-01" location="MAIN ENTRANCE" />

        <Camera id="CAM-02" location="EAST HALLWAY" />

        <Camera id="CAM-03" location="ARCHIVE ROOM" />

        <Camera id="CAM-04" location="████████" />

      </div>
    </div>
  );
}


function Camera({
  id,
  location,
}: {
  id: string;
  location: string;
}) {
  return (
    <div className="border border-[#222] bg-[#080808]">

      <div className="border-b border-[#222] px-4 py-2 flex justify-between text-[10px]">
        <span>{id}</span>
        <span className="text-gray-700">LIVE</span>
      </div>

      <div className="aspect-video bg-[#030303] flex items-center justify-center">
        <div className="text-[10px] text-gray-700">
          NO SIGNAL
        </div>
      </div>

      <div className="px-4 py-2 text-[10px] text-gray-600">
        {location}
      </div>

    </div>
  );
}


function Employees() {
  return (
    <div>
      <SectionTitle
        path="SYSTEM / EMPLOYEES"
        title="EMPLOYEE DIRECTORY"
      />

      <div className="border border-[#222]">

        {[
          ["EMP-001", "██████████", "ARCHIVED"],
          ["EMP-027", "██████████", "ARCHIVED"],
          ["EMP-083", "██████████", "MISSING"],
          ["EMP-119", "██████████", "ARCHIVED"],
          ["EMP-147", "██████████", "MISSING"],
          ["EMP-148", "██████████", "ACTIVE"],
        ].map(([id, name, status]) => (
          <div
            key={id}
            className="flex justify-between px-5 py-4 border-b border-[#181818] text-xs hover:bg-[#0c0c0c]"
          >
            <span className="text-gray-500">{id}</span>

            <span className="text-gray-400">{name}</span>

            <span className="text-gray-600">{status}</span>
          </div>
        ))}

      </div>
    </div>
  );
}


function Files() {
  return (
    <div>
      <SectionTitle
        path="SYSTEM / RECOVERED FILES"
        title="RECOVERED FILES"
      />

      <div className="space-y-2">

        <FileRow
          id="REC-001"
          title="Recovered Audio"
          date="2024-01-19"
          status="AVAILABLE"
        />

        <FileRow
          id="REC-017"
          title="Damaged Photograph"
          date="2025-06-03"
          status="AVAILABLE"
        />

        <FileRow
          id="REC-041"
          title="████████████"
          date="2026-09-29"
          status="RESTRICTED"
        />

      </div>
    </div>
  );
}


function FileRow({
  id,
  title,
  date,
  status,
}: {
  id: string;
  title: string;
  date: string;
  status: string;
}) {
  return (
    <div className="border border-[#222] px-5 py-4 flex items-center justify-between hover:bg-[#0c0c0c] hover:border-[#444] transition-all cursor-pointer">

      <div>
        <div className="text-xs text-gray-400">
          {title}
        </div>

        <div className="text-[10px] text-gray-700 mt-1">
          {id} · {date}
        </div>
      </div>

      <div className="text-[10px] text-gray-600">
        {status}
      </div>

    </div>
  );
}


function SectionTitle({
  path,
  title,
}: {
  path: string;
  title: string;
}) {
  return (
    <div className="mb-8">
      <div className="text-[10px] text-gray-700 tracking-widest mb-3">
        {path}
      </div>

      <h1 className="text-2xl tracking-widest">
        {title}
      </h1>

      <div className="h-px bg-[#222] mt-5" />
    </div>
  );
}