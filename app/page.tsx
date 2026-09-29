"use client";

import { useEffect, useState } from "react";
import {
  trackSection,
  trackFile,
  getSessionData,
} from "./lib/session";

type Screen = "login" | "archive" | "incident";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("login");
  const [notice, setNotice] = useState(false);

  useEffect(() => {
    if (screen === "archive") {
      trackSection("archive");

      const session = getSessionData();

      if (session.sectionVisits >= 3) {
        setNotice(true);
      }
    }
  }, [screen]);

  if (screen === "login") {
    return <Login onEnter={() => setScreen("archive")} />;
  }

  if (screen === "incident") {
    return (
      <Incident
        onBack={() => setScreen("archive")}
      />
    );
  }

  return (
    <ArchiveHome
      notice={notice}
      onOpenIncident={() => {
        trackFile("INC-147");
        setScreen("incident");
      }}
    />
  );
}


/* ------------------------------------------------ */
/* LOGIN */
/* ------------------------------------------------ */

function Login({ onEnter }: { onEnter: () => void }) {
  return (
    <main className="min-h-screen bg-[#050505] text-[#d6d6d6] font-mono flex items-center justify-center p-6">

      <div className="w-full max-w-2xl border border-[#222] bg-[#080808]">

        <div className="border-b border-[#222] px-6 py-3 flex justify-between text-[10px] text-gray-600">
          <span>ARCHIVE SYSTEM</span>
          <span>TERMINAL 03</span>
        </div>

        <div className="p-10 md:p-14">

          <div className="text-[10px] text-gray-600 mb-8">
            INTERNAL INFORMATION ARCHIVE
          </div>

          <h1 className="text-3xl md:text-5xl tracking-[0.2em]">
            ARCHIVE SYSTEM
          </h1>

          <div className="h-px bg-[#222] my-8" />

          <div className="text-xs text-gray-600 space-y-2">
            <p>ACCESS LEVEL: PUBLIC</p>
            <p>SYSTEM STATUS: ONLINE</p>
            <p>
              DATABASE STATUS:{" "}
              <span className="text-gray-400">
                OPERATIONAL
              </span>
            </p>
          </div>

          <button
            onClick={onEnter}
            className="mt-12 border border-[#444] px-8 py-3 text-xs tracking-[0.2em] hover:bg-[#151515] hover:border-[#777] transition"
          >
            ENTER ARCHIVE
          </button>

          <p className="mt-10 text-[10px] text-gray-700">
            Unauthorized access is prohibited.
          </p>

        </div>

        <div className="border-t border-[#222] px-6 py-3 text-[10px] text-gray-700">
          ARCHIVE SYSTEM v3.7
        </div>

      </div>

    </main>
  );
}


/* ------------------------------------------------ */
/* ARCHIVE HOME */
/* ------------------------------------------------ */

function ArchiveHome({
  notice,
  onOpenIncident,
}: {
  notice: boolean;
  onOpenIncident: () => void;
}) {
  return (
    <main className="min-h-screen bg-[#050505] text-[#d6d6d6] font-mono">

      <header className="h-14 border-b border-[#222] px-6 flex items-center justify-between">

        <span className="text-xs tracking-[0.2em]">
          ARCHIVE SYSTEM
        </span>

        <span className="text-[10px] text-gray-700">
          TERMINAL 03
        </span>

      </header>

      <div className="max-w-4xl mx-auto px-6 py-16">

        <div className="text-[10px] text-gray-700 tracking-widest">
          PUBLIC ARCHIVE
        </div>

        <h1 className="text-2xl md:text-3xl tracking-widest mt-3">
          DATABASE INDEX
        </h1>

        <p className="text-xs text-gray-600 mt-4">
          Select a file to continue.
        </p>

        {/* SYSTEM NOTICE */}

        {notice && (
          <div className="mt-8 border border-[#3a3a3a] bg-[#0b0b0b] px-5 py-4">

            <div className="text-[10px] text-gray-500 tracking-widest">
              SYSTEM NOTICE
            </div>

            <p className="text-xs text-gray-400 mt-2">
              Unusual session activity detected.
            </p>

          </div>
        )}

        {/* MAIN FILE */}

        <div className="mt-10">

          <button
            onClick={onOpenIncident}
            className="w-full text-left border border-[#333] bg-[#080808] p-6 hover:border-[#777] hover:bg-[#0c0c0c] transition group"
          >

            <div className="flex items-center justify-between">

              <div>

                <div className="text-[10px] text-gray-600 tracking-widest">
                  RECENTLY MODIFIED
                </div>

                <h2 className="text-lg text-gray-300 mt-3 group-hover:text-white">
                  INCIDENT REPORT 147
                </h2>

                <p className="text-xs text-gray-600 mt-2">
                  Employee disappearance
                </p>

              </div>

              <div className="text-right">

                <div className="text-[10px] text-gray-700">
                  2026-09-29
                </div>

                <div className="text-[10px] text-gray-600 mt-2">
                  RESTRICTED
                </div>

              </div>

            </div>

            <div className="mt-6 pt-4 border-t border-[#1c1c1c] text-[10px] text-gray-700">
              FILE ID: INC-147
            </div>

          </button>

        </div>

        {/* SECONDARY FILES */}

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="border border-[#1c1c1c] p-5 opacity-50">

            <div className="text-[10px] text-gray-700">
              SECURITY ARCHIVE
            </div>

            <div className="text-xs text-gray-600 mt-3">
              Access restricted.
            </div>

          </div>

          <div className="border border-[#1c1c1c] p-5 opacity-50">

            <div className="text-[10px] text-gray-700">
              EMPLOYEE DIRECTORY
            </div>

            <div className="text-xs text-gray-600 mt-3">
              Access restricted.
            </div>

          </div>

        </div>

        <div className="mt-12 text-[10px] text-gray-800">
          Last database synchronization: 2026-09-29
        </div>

      </div>

    </main>
  );
}


/* ------------------------------------------------ */
/* INCIDENT REPORT */
/* ------------------------------------------------ */

function Incident({
  onBack,
}: {
  onBack: () => void;
}) {
  return (
    <main className="min-h-screen bg-[#050505] text-[#d6d6d6] font-mono">

      <header className="h-14 border-b border-[#222] px-6 flex items-center justify-between">

        <button
          onClick={onBack}
          className="text-[10px] text-gray-600 hover:text-gray-300"
        >
          ← RETURN TO ARCHIVE
        </button>

        <span className="text-[10px] text-gray-700">
          INCIDENT REPORT 147
        </span>

      </header>

      <article className="max-w-3xl mx-auto px-6 py-16">

        <div className="text-[10px] text-gray-700 tracking-widest">
          INCIDENT REPORT
        </div>

        <h1 className="text-3xl tracking-widest mt-3">
          INC-147
        </h1>

        <div className="h-px bg-[#222] my-8" />

        <div className="grid grid-cols-2 gap-6 text-xs mb-12">

          <div>
            <div className="text-[10px] text-gray-700">
              DATE
            </div>

            <div className="text-gray-400 mt-2">
              2026-09-29
            </div>
          </div>

          <div>
            <div className="text-[10px] text-gray-700">
              STATUS
            </div>

            <div className="text-gray-400 mt-2">
              RESTRICTED
            </div>
          </div>

        </div>

        <section className="space-y-6 text-sm text-gray-500 leading-7">

          <p>
            An employee reported unusual activity
            originating from Archive Terminal 03.
          </p>

          <p>
            According to the initial report, the
            terminal displayed information which had
            not yet been entered into the archive.
          </p>

          <p>
            The employee was instructed to terminate
            the session and leave the facility.
          </p>

          <p>
            The employee did not comply.
          </p>

        </section>

        <div className="my-12 border border-[#222] p-6">

          <div className="text-[10px] text-gray-700 tracking-widest">
            ACCESS LOG
          </div>

          <div className="mt-6 space-y-4 text-xs">

            <LogRow
              label="LAST ACCESS"
              value="2026-09-29 / 23:17"
            />

            <LogRow
              label="ACCESSOR"
              value="EMP-148"
            />

            <LogRow
              label="TERMINAL"
              value="03"
            />

            <LogRow
              label="SESSION"
              value="ACTIVE"
            />

          </div>

        </div>

        <div className="border-l border-[#444] pl-5 text-xs text-gray-600">

          <p>
            Additional information has been
            restricted by system administrator.
          </p>

        </div>

      </article>

    </main>
  );
}


/* ------------------------------------------------ */
/* SMALL COMPONENT */
/* ------------------------------------------------ */

function LogRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between border-b border-[#151515] pb-2">

      <span className="text-gray-700">
        {label}
      </span>

      <span className="text-gray-400">
        {value}
      </span>

    </div>
  );
}