"use client";

import { useCallback, useEffect, useState } from "react";
import HorrorOverlay from "./components/HorrorOverlay";
import { Seymour_One } from "next/font/google";

type Stage =
  | "intro"
  | "apartment"
  | "computer"
  | "diary"
  | "browser"
  | "research"
  | "cameras"
  | "camera"
  | "session"
  | "ending";

function playWarningSound() {
  const audio = new Audio("/sounds/archive_warning.wav");
  audio.volume = 0.9;
  audio.play().catch(() => {});
}

export default function Home() {
  const [stage, setStage] = useState<Stage>("intro");
  const [cameraVisits, setCameraVisits] = useState(0);
  const [warningScare, setWarningScare] = useState(false);

  const triggerWarning = useCallback(() => {
    setWarningScare(false);

    setTimeout(() => {
      playWarningSound();
      setWarningScare(true);

      setTimeout(() => {
        setWarningScare(false);
      }, 900);
    }, 50);
  }, []);

  return (
    <>
      <HorrorOverlay active={warningScare}>
        SECONDARY SUBJECT DETECTED
      </HorrorOverlay>

      <main className="min-h-screen bg-[#050505] text-[#d6d6d6] font-mono">
        {stage === "intro" && (
          <Intro
            onContinue={() => {
              setStage("apartment");
            }}
          />
        )}

        {stage === "apartment" && (
          <Apartment
            onContinue={() => {
              setStage("computer")
            }}
          />
        )}

        {stage === "computer" && (
          <Computer
            onContinue={() => {
              setStage("diary");
            }}
          />
        )}

        {stage === "browser" && (
          <BrowserHistory
            onContinue={() => setStage("research")}
          />
        )}

        {stage === "research" && (
          <Research
            onContinue={() => setStage("cameras")}
          />
        )}

        {stage === "diary" && (
          <Diary
            onContinue={() => {
              setStage("browser");
            }}
          />
        )}

        {stage === "cameras" && (
          <Cameras
            onCamera04={() => {
              setStage("camera");
            }}
          />
        )}

        {stage === "camera" && (
          <Camera
            visitNumber={cameraVisits}
            triggerWarning={triggerWarning}
            onContinue={() => {
              if (cameraVisits === 0) {
                setStage("session");
              } else {
                setStage("ending");
              }
            }}
          />
        )}

        {stage === "session" && (
          <LastSession
            onContinue={() => {
              setCameraVisits(1);
              setStage("camera");
            }}
          />
        )}

        {stage === "ending" && <Ending />}
      </main>
    </>
  );
}


function Intro({
  onContinue,
}: {
  onContinue: () => void;
}) {
  return (
    <Screen>
      <SystemLabel>
        MISSING PERSON INVESTIGATION
      </SystemLabel>

      <h1 className="text-3xl md:text-5xl tracking-[0.2em] mt-4">
        CASE FILE: EVAN MERCER
      </h1>

      <div className="h-px bg-[#222] my-10" />

      <div className="space-y-6 text-sm text-gray-500 leading-7">
        <p>
          Evan Mercer has been reported missing.
        </p>

        <p>
          His apartment was found locked form the inside.
          No signs of forced entry were discovered.
        </p>

        <p>
          His phone, wallet, and keys were found inside
          the apartment.
        </p>

        <p>
          You have been assigned to investigate his disappearance.
        </p>
      </div>

      <Objective>
        Search the apartment for clues.
      </Objective>

      <button
        onClick={onContinue}
        className="mt-8 border-[#444] px-8 py-3 text-xs tracking-[0.2em] hover:bg-[#151515] hover:border-[#777] transition"
      >
        ENTER APARTMENT
      </button>
    </Screen>
  );
}

function Apartment({
  onContinue,
}: {
  onContinue: () => void;
}) {
  return (
    <Screen>
      <SystemLabel>
        APARTMENT 48 / INVESTIGATION
      </SystemLabel>

      <h1 className="text-3xl tracking-[0.2em] mt-4">
        EVAN&apos;S APARTMENT
      </h1>

      <div className="h-px bg-[#222] my-10" />

      <div className="space-y-6 text-sm text-gray-500 leading-7">
        <p>
          The apartment is quiet.
        </p>

        <p>
          Nothing appears to be disturbed.
          Evan&apos;s belongings are still here.
        </p>

        <p>
          His computer is still running..?
        </p>
      </div>

      <Objective>
        Check Evan&apos;s computer.
      </Objective>

      <button
        onClick={onContinue}
        className="mt-8 border border-[#444] px-8 py-3 text-xs tracking-[0.2em] hover:bg-[#151515] hover:border-[#777] transition"
      >
        CHECK COMPUTER
      </button>
    </Screen>
  );
}

function Diary({
  onContinue,
}: {
  onContinue: () => void;
}) {
  const [page, setPage] = useState(0);

  const pages = [
    {
      number: "07",
      date: "May 21, 2026",
      entries: [
        "I installed the cameras today.",
        "Nothing happened last night, but I keep getting the feeling that someone is standing outside my door.",
        "This deep, eerie feeling that I can't explain.",
        "Probably just exhaustion I guess.",
      ],
      signature: "- Evan",
    },
    {
      number: "08",
      date: "May 22, 2026",
      entries: [
        "Checked the camera recordings from last night.",
        "Nothing unusual at first.",
        "But around 2:37 AM, I thought I saw someone standing at the end of the hallway.",
        "I replayed it three times. Nothing.",
        "Maybe I'm just seeing things.",
      ],
      signature: "- Evan",
    },
    {
      number: "09",
      date: "May 23, 2026",
      entries: [
        "It happened again.",
        "Camera 04.",
        "There was someone standing in the doorway.",
        "I looked away from the screen just for a split second.",
        "When I looked back, it was gone.",
        "I checked the hallway. There was nobody there.",
        "I don't know what to do now. I am pretty shaken up by this.",
      ],
      signature: "- Evan",
    },
    {
      number: "10",
      date: "May 24, 2026",
      entries: [
        "I've been looking at this the entire day.",
        "The figure doesn't appear when I'm actually looking at the hallway.",
        "It only appears in the recordings.",
        "I found a few posts online describing the same thing.",
        "Nobody knows what it is.",
      ],
      signature: "- Evan",
    },
    {
      number: "11",
      date: "May 26, 2026",
      entries: [
        "I think I understand the pattern now.",
        "The more I look for it, the more often it appears.",
        "I don't think the recordings are showing me something that happened.",
        "I think  they're showing me something that knows I'm watching.",
        "I'm going to stop looking."
      ],
      signature: "- Evan",
    },
  ];

  const currentPage = pages[page];

  return (
    <Screen>
      <SystemLabel>
        EVAN MERCER / PERSONAL NOTES
      </SystemLabel>

      <h1 className="text-3xl tracking-[0.2em] mt-4">
        PERSONAL NOTEBOOK
      </h1>

      <div className="mt-10 flex justify-center">
        <div
          className="relative w-full max-w-2xl min-h-[620px] px-12 py-14"
          style={{
            background:
              "linear-gradient(90deg, #b9aa87 0%, #d8cba9 4%, #d8cba9 96%, #b9aa87 100%)",
            boxShadow:
              "0 20px 50px rgba(0,0,0,0.55), inset 0 0 35px rgba(0,0,0,0.15)",
          }}
        >
          <div className="absolute left-7 top-0 bottom-0 w-px bg-black/20" />

          <div
            className="absolute inset-0 pointer-events-none-opacity-30"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, transparent 0px, transparent 31px, rgba(60,70,80,0.35) 32px)",
              backgroundPosition: "0 105px",
            }}
          />

          <div className="relative-z-10">
            <div
              className="text-3xl mb-10 text-[#29251f]"
              style={{
                fontFamily: "var(--font-archive)",
              }}
            >
              {currentPage.date}
            </div>

            <div
              className="text-2xl leading-[2rem] text-[#29251f]"
              style={{
                fontFamily: "var(--font-archive)",
              }}
            >
              {currentPage.entries.map((entry: string, index: number) => (
                <p
                  key={index}
                  className={index === 0 ? "" : "mt-6"}
                >
                  {entry}
                </p>
              ))}

              <p className="mt-12 text-right">
                {currentPage.signature}
              </p>
            </div>
          </div>

          <div 
            className="absolute bottom-6 right-8 text-base text-[#29251f]"
            style={{
              fontFamily: "var(--font-archive)",
            }}
          >
            Page {currentPage.number}
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-4">
        <button
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          className="border border-[#444] px-6 py-3 text-xs tracking-[0.2em] hover:bg-[#151515] hover:border-[#777] transition disabled:opacity-20 disabled:cursor-not-allowed"
        >
          ← PREVIOUS
        </button>

        <button
          onClick={() =>
            setPage((p) => Math.min(pages.length - 1, p + 1))
          }
          disabled={page === pages.length - 1}
          className="border border-[#444] px-6 py-3 text-xs tracking-[0.2em] hover:bg-[#151515] hover:border-[#777] transition disabled:opacity-20 disabled:cursor-not-allowed"
        >
          NEXT →
        </button>
      </div>

      <div className="text-center mt-4 text-[10px] text-gray-700 tracking-[0.2em]">
        PAGE {page + 1} / {pages.length}
      </div>

      <Objective>
        {page === pages.length - 1
          ? "Review Evan's browser history."
          : "Read Evan's personal notes."}
      </Objective>

      {page === pages.length - 1 && (
        <div className="flex justify-center">
          <button
            onClick={onContinue}
            className="mt-8 border border-[#555] px-8 py-3 text-xs tracking-[0.2em] hover:bg-[#151515] hover:border-[#999] transition"
          >
            OPEN BROWSER HISTORY
          </button>
        </div>
      )}
    </Screen>
  );
}

function Computer({
  onContinue,
}: {
  onContinue: () => void;
}) {
  return (
    <Screen>
      <SystemLabel>
        EVAN&apos;S COMPUTER
      </SystemLabel>

      <h1 className="text-3xl tracking-[0.2em] mt-4">
        COMPUTER
      </h1>

      <div className="h-px bg-[#222] my-10" />

      <div className="border border-[#222] bg-[#080808] p-6">
        <div className="text-[10px] text-gray-700 tracking-[0.2em]">
          RECENT ACTIVITY
        </div>

        <div className="mt-6 space-y-4 text-sm text-gray-500">

          <button
            onClick={onContinue}
            className="block w-full text-left hover:text-gray-300 transition"
          >
            &gt; Personal Notes
          </button>

          <p>
            &gt; Browser History
          </p>

          <p>
            &gt; Security Cameras
          </p>

        </div>
      </div>

      <Objective>
        Review Evan&apos;s personal notes.
      </Objective>
    </Screen>
  );
}

function BrowserHistory({
  onContinue,
}: {
  onContinue: () => void;
}) {
  const searches = [
    "strange figure caught on camera",
    "person appearing in security footage",
    "why does it only appear in recordings",
    "can something see through a camera",
    "what happens if you find it",
  ];

  return (
    <Screen>
      <SystemLabel>
        EVAN&apos;S COMPUTER / BROWSER HISTORY
      </SystemLabel>

      <h1 className="text-3xl tracking-[0.2em] mt-4">
        BROWSER HISTORY
      </h1>

      <div className="h-px bg-[#222] my-10" />

      <div className="border border-[#222] bg-[#080808]">
        <div className="border-b border-[#222] px-5 py-4">
          <div className="text-[10px] text-gray-700 tracking-[0.2em]">
            SEARCH HISTORY
          </div>
        </div>

        <div className="divide-y divide-[#181818]">
          {searches.map((search, index) => (
            <div
              key={index}
              className="px-5 py-5"
            >
              <div className="text-[10px] text-gray-700 mb-2">
                SEARCH {String(index + 1).padStart(2, "0")}
              </div>

              <div className="text-sm text-gray-500">
                {search}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Objective>
        Something is wrong. Find out what Evan was researching.
      </Objective>

      <button
        onClick={onContinue}
        className="mt-8 border border-[#444] px-8 py-3 text-xs tracking-[0.2em] hover:bg-[#151515] hover:border-[#777] transition"
      >
        OPEN RESEARCH NOTES
      </button>
    </Screen>
  );
}

function Research({
  onContinue,
}: {
  onContinue: () => void;
}) {
  return (
    <Screen>
      <SystemLabel>
        EVAN MERCER / RESEARCH FILE
      </SystemLabel>

      <h1 className="text-3xl tracking-[0.2em] mt-4">
        RESEARCH NOTES
      </h1>

      <div className="h-px bg-[#222] my-10" />

      <div className="border border-[#222] bg-[#080808] p-8">
        <div className="text-[10px] text-gray-700 tracking-[0.2em] mb-8">
          PRIVATE NOTES / UNDATED
        </div>

        <div className="space-y-8 text-sm text-gray-500 leading-7">
          <div>
            <div className="text-gray-600 text-[10px] tracking-[0.2em] mb-2">
              OBSERVATION 01
            </div>

            <p>
              The figure does not appear in the room itself.
              It only appears in recorded footage.
            </p>
          </div>

          <div>
            <div className="text-gray-600 text-[10px] tracking-[0.2em] mb-2">
              OBSERVATION 04
            </div>

            <p>
              Every time I review the footage, its position
              changes.
            </p>
          </div>

          <div>
            <div className="text-gray-600 text-[10px] tracking-[0.2em] mb-2">
              OBSERVATION 07
            </div>

            <p>
              It appears more frequently the longer I
              investigate.
            </p>
          </div>

          <div className="border-t border-[#222] pt-8">
            <div className="text-gray-400 text-[10px] tracking-[0.2em] mb-3">
              WORKING THEORY
            </div>

            <p className="text-gray-400">
              The entity is connected to observation and
              recording.
            </p>
          </div>
        </div>
      </div>

      <Objective>
        Review the security camera recordings.
      </Objective>

      <button
        onClick={onContinue}
        className="mt-8 border border-[#444] px-8 py-3 text-xs tracking-[0.2em] hover:bg-[#151515] hover:border-[#777] transition"
      >
        OPEN SECURITY CAMERAS
      </button>
    </Screen>
  );
}

function Cameras({
  onCamera04,
}: {
  onCamera04: () => void;
}) {
  return (
    <Screen>
      <SystemLabel>
        EVAN MERCER / SECURITY SYSTEM
      </SystemLabel>

      <h1 className="text-3xl tracking-[0.2em] mt-4">
        SECURITY CAMERAS
      </h1>

      <div className="h-px bg-[#222] my-10" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="border border-[#222] bg-[#080808] p-6">

          <div className="flex justify-between">
            <span className="text-xs tracking-[0.2em]">
              CAMERA 01
            </span>

            <span className="text-[10px] text-gray-700">
              OFFLINE
            </span>
          </div>

          <div className="mt-8 aspect-video bg-black flex items-center justify-center">
            <span className="text-[10px] text-gray-700 tracking-[0.2em]">
              NO SIGNAL
            </span>
          </div>
        </div>

        <div className="border border-[#222] bg-[#080808] p-6">
          <div className="flex justify-between">
            <span className="text-xs tracking-[0.2em]">
              CAMERA 02
            </span>

            <span className="text-[10px] text-gray-700">
              OFFLINE
            </span>
          </div>

          <div className="mt-8 aspect-video bg-black flex items-center justify-center">
            <span className="text-[10px] text-gray-700 tracking-[0.2em]">
              NO SIGNAL
            </span>
          </div>
        </div>

        <div className="border border-[#222] bg-[#080808] p-6">
          <div className="flex justify-between">
            <span className="text-xs tracking-[0.2em]">
              CAMERA 03
            </span>

            <span className="text-[10px] text-gray-700">
              OFFLINE
            </span>
          </div>

          <div className="mt-8 aspect-video bg-black flex items-center justify-center">
            <span className="text-[10px] text-gray-700 tracking-[0.2em]">
              NO SIGNAL
            </span>
          </div>
        </div>

        <button
          onClick={onCamera04}
          className="text-left border border-[#444] bg-[#080808] p-6 hover:bg-[#101010] hover:border-[#777] transition"
        >
          <div className="flex justify-between">
            <span className="text-xs tracking-[0.2em]">
              CAMERA 04
            </span>

            <span className="text-[10px] text-gray-400">
              AVAILABLE
            </span>
          </div>

          <div className="mt-8 aspect-video bg-black flex items-center justify-center">
            <div className="text-center">
              <div className="text-[10px] text-gray-600 tracking-[0.2em]">
                ARCHIVE ROOM
              </div>

              <div className="mt-3 text-[10px] text-gray-800">
                CLICK TO VIEW
              </div>
            </div>
          </div>
        </button>
      </div>

      <Objective>
        Review the available security camera recordings.
      </Objective>
    </Screen>
  )
}

function Camera({
  visitNumber,
  onContinue,
  triggerWarning,
}: {
  visitNumber: number;
  onContinue: () => void;
  triggerWarning: () => void;
}) {
  const altered = visitNumber > 0;

  useEffect(() => {
    if (!altered) {
      return;
    }

    const warningTimer = setTimeout(() => {
      triggerWarning();
    }, 4500);

    return () => {
      clearTimeout(warningTimer);
    };
  }, [altered, triggerWarning]);

  return (
    <Screen wide>
      <SystemLabel>
        EVAN MERCER / SECURITY NETWORK
      </SystemLabel>

      <h1 className="text-2xl tracking-[0.2em] mt-4">
        CAMERA 04
      </h1>

      <div className="mt-8 border border-[#222] bg-black">
        <div className="border-b border-[#222] px-4 py-2 flex justify-between text-[10px] text-gray-600">
          <span>
            CAM-04 / APARTMENT HALLWAY
          </span>

          {altered ? (
            <span className="text-gray-500">
              ARCHIVE ANOMALY
            </span>
          ) : (
            <span>
              LIVE ARCHIVE
            </span>
          )}

          <span>
            {altered ? "02:13:47" : "02:13:47"}
          </span>
        </div>

        <div className="aspect-video flex items-center justify-center relative overflow-hidden bg-black">
          <video
            key={altered ? "altered-camera" : "normal-camera"}
            src={
              altered
                ? "/videos/camera04_cctv.mp4"
                : "/videos/camera04_normal.mp4"
            }
            autoPlay
            muted
            playsInline
            onEnded={(e) => {
              e.currentTarget.currentTime = 0;
              e.currentTarget.play();
            }}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {altered && (
            <>
              <div className="absolute inset-0 bg-red-950/5 pointer-events-none" />

              <div className="absolute inset-0 opacity-20 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,#fff_4px)]" />

              <div className="absolute inset-0 pointer-events-none animate-pulse bg-white/5" />
            </>
          )}
        </div>
      </div>

      {!altered && (
        <>
          <div className="mt-8 border border-[#222] p-6 text-sm text-gray-500 leading-7">
            <p>
              02:13:41 — Evan enters the hallway.
            </p>

            <p>
              02:13:44 — Evan stops outside the bedroom.
            </p>

            <p>
              02:13:47 — Evan looks toward the camera.
            </p>

            <p>
              02:13:51 — No additional movement detected.
            </p>
          </div>

          <Objective>
            Something in this footage does not match Evan&apos;s notes.
          </Objective>

          <button
            onClick={onContinue}
            className="mt-8 border border-[#444] px-8 py-3 text-xs tracking-[0.2em] hover:bg-[#151515] hover:border-[#777] transition"
          >
            REVIEW FINAL RESEARCH
          </button>
        </>
      )}

      {altered && (
        <>
          <div className="mt-8 border border-[#292929] p-6 text-sm text-gray-500 leading-7">
            <p>
              02:13:41 — Evan enters the hallway.
            </p>

            <p>
              02:13:44 — Evan stops outside the bedroom.
            </p>

            <p className="text-gray-400">
              02:13:47 — UNIDENTIFIED FIGURE DETECTED.
            </p>

            <p className="text-gray-400">
              02:13:48 — SUBJECT NOT PRESENT IN ORIGINAL RECORDING.
            </p>

            <p className="text-gray-600">
              02:13:51 — RECORDING INTEGRITY COMPROMISED.
            </p>
          </div>

          <Objective>
            The figure was not there before.
          </Objective>

          <button
            onClick={onContinue}
            className="mt-8 border border-[#444] px-8 py-3 text-xs tracking-[0.2em] hover:bg-[#151515] hover:border-[#777] transition"
          >
            CONTINUE
          </button>
        </>
      )}
    </Screen>
  );
}


function LastSession({
  onContinue,
}: {
  onContinue: () => void;
}) {
  return (
    <Screen>
      <SystemLabel>
        TERMINAL 03 / SESSION RECORD
      </SystemLabel>

      <h1 className="text-2xl tracking-[0.2em] mt-4">
        LAST SESSION
      </h1>

      <div className="h-px bg-[#222] my-10" />

      <div className="border border-[#222] p-6 text-xs">

        <Log time="23:17:36">
          EMP-147 accessed archive.
        </Log>

        <Log time="23:18:02">
          EMP-147 opened SECURITY/CAM-04.
        </Log>

        <Log time="23:18:47">
          EMP-147 searched: &quot;WHO IS WATCHING?&quot;
        </Log>

        <Log time="23:19:12">
          EMP-147 searched: &quot;TERMINAL 03&quot;
        </Log>

        <Log time="23:19:44">
          EMP-147 searched: &quot;ME&quot;
        </Log>

        <Log time="23:20:01">
          EMP-147 stopped responding.
        </Log>

      </div>


      <div className="mt-8 border border-[#333] bg-[#080808] p-6">

        <div className="text-[10px] text-gray-700 tracking-[0.2em]">
          SESSION STATUS
        </div>

        <div className="mt-6 space-y-4">

          <Info
            label="TERMINAL"
            value="03"
          />

          <Info
            label="ACCESSOR"
            value="EMP-147"
          />

          <Info
            label="SESSION START"
            value="23:17:36"
          />

          <Info
            label="STATUS"
            value="ACTIVE"
          />

        </div>

      </div>


      <div className="mt-8 text-xs text-gray-600 leading-6">

        <p>
          This session is still active.
        </p>

        <p className="mt-3">
          No termination event has been recorded.
        </p>

      </div>


      <Objective>
        Return to Camera 04.
      </Objective>

      <button
        onClick={onContinue}
        className="mt-8 border border-[#444] px-8 py-3 text-xs tracking-[0.2em] hover:bg-[#151515] hover:border-[#777] transition"
      >
        RETURN TO CAMERA 04
      </button>

    </Screen>
  );
}


function Ending() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRevealed(true);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Screen>

      <SystemLabel>
        ARCHIVE SYSTEM / TERMINAL 03
      </SystemLabel>

      <h1 className="text-2xl tracking-[0.2em] mt-4">
        CURRENT SESSION
      </h1>

      <div className="h-px bg-[#222] my-10" />

      <div className="border border-[#222] p-6">

        <Info
          label="SESSION"
          value="ACTIVE"
        />

        <Info
          label="TERMINAL"
          value="03"
        />

        <Info
          label="SESSION OWNER"
          value="EMP-147"
        />

        <Info
          label="SESSION START"
          value="23:17:36"
        />

        <div className="mt-6 border-t border-[#222] pt-6">

          <div className="text-[10px] text-gray-700 tracking-[0.2em]">
            CURRENT USER
          </div>

          <div
            className={`mt-3 text-lg tracking-[0.2em] transition-all duration-1000 ${
              revealed
                ? "text-red-500"
                : "text-gray-500"
            }`}
          >
            {revealed ? "YOU" : "EMP-147"}
          </div>

        </div>

      </div>


      {revealed && (
        <div className="mt-10 text-center">

          <p className="text-xs text-red-500 tracking-[0.25em]">
            SESSION HAS NOT ENDED.
          </p>

          <p className="mt-8 text-[10px] text-gray-700">
            TERMINAL 03 REMAINS ACTIVE.
          </p>

        </div>
      )}

    </Screen>
  );
}


function Screen({
  children,
  wide = false,
}: {
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="min-h-screen">

      <header className="h-14 border-b border-[#222] px-6 flex items-center justify-between">

        <span className="text-xs tracking-[0.2em]">
          ARCHIVE SYSTEM
        </span>

        <span className="text-[10px] text-gray-700">
          TERMINAL 03
        </span>

      </header>

      <div
        className={`mx-auto px-6 py-16 ${
          wide ? "max-w-5xl" : "max-w-3xl"
        }`}
      >
        {children}
      </div>

    </div>
  );
}


function SystemLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="text-[10px] text-gray-700 tracking-[0.2em]">
      {children}
    </div>
  );
}


function Objective({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-12 border-l border-[#555] pl-5">

      <div className="text-[10px] text-gray-700 tracking-[0.2em]">
        CURRENT OBJECTIVE
      </div>

      <div className="text-sm text-gray-400 mt-2">
        {children}
      </div>

    </div>
  );
}


function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col md:flex-row md:justify-between gap-2 border-b border-[#151515] py-4">

      <span className="text-[10px] text-gray-700">
        {label}
      </span>

      <span className="text-xs text-gray-400">
        {value}
      </span>

    </div>
  );
}


function Log({
  time,
  children,
}: {
  time: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-6 border-b border-[#151515] py-4">

      <span className="text-gray-700 shrink-0">
        {time}
      </span>

      <span className="text-gray-400">
        {children}
      </span>

    </div>
  );
}