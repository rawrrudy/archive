"use client";

import { useCallback, useEffect, useState } from "react";
import HorrorOverlay from "./components/HorrorOverlay";

type Stage =
  | "intro"
  | "apartment"
  | "computer"
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
          <p>&gt; Personal Notes</p>
          <p>&gt; Browser History</p>
          <p>&gt; Security Cameras</p>
        </div>
      </div>

      <Objective>
        Review Evan&apos;s personal notes.
      </Objective>

      <button
        onClick={onContinue}
        className="mt-8 border border-[#444] px-8 py-3 text-xs tracking-[0.2em] hover:bg-[#151515] hover:border-[#777] transition"
      >
        OPEN PERSONAL NOTES
      </button>
    </Screen>
  );
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
  const [signalLost, setSignalLost] = useState(false);

  useEffect(() => {
    setSignalLost(false);

    if (!altered) {
      return;
    }

    const warningTimer = setTimeout(() => {
      triggerWarning();
    }, 4500);

    const signalTimer = setTimeout(() => {
      setSignalLost(true);
    }, 5000);

    return () => {
      clearTimeout(warningTimer);
      clearTimeout(signalTimer);
    };
  }, [altered, triggerWarning]);

  return (
    <Screen wide>
      <SystemLabel>
        SECURITY NETWORK / CAMERA 04
      </SystemLabel>

      <h1 className="text-2xl tracking-[0.2em] mt-4">
        CAMERA 04
      </h1>

      <div className="mt-8 border border-[#222] bg-black">


        <div className="border-b border-[#222] px-4 py-2 flex justify-between text-[10px] text-gray-600">

          <span>
            CAM-04 / ARCHIVE ROOM
          </span>

          {altered ? (
            <span className="text-gray-500">
              SIGNAL CORRUPTION
            </span>
          ) : (
            <span>
              ARCHIVE FEED
            </span>
          )}

          <span>
            {altered ? "23:20:07" : "23:17:04"}
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
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              signalLost ? "opacity-0" : "opacity-100"
            }`}
          />


          {signalLost && (
            <div className="absolute inset-0 bg-black flex items-center justify-center">
              <div className="text-[10px] text-gray-700 tracking-[0.3em]">
                SIGNAL LOST
              </div>
            </div>
          )}

          {/* Altered CCTV interference */}
          {altered && !signalLost && (
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
              23:17:04 — EMP-147 enters the archive room.
            </p>

            <p>
              23:17:11 — Employee sits at Terminal 03.
            </p>

            <p>
              23:17:36 — Employee accesses the archive.
            </p>

            <p>
              23:18:02 — Employee opens an unidentified file.
            </p>

          </div>

          <Objective>
            Review EMP-147&apos;s final terminal session.
          </Objective>

          <button
            onClick={onContinue}
            className="mt-8 border border-[#444] px-8 py-3 text-xs tracking-[0.2em] hover:bg-[#151515] hover:border-[#777] transition"
          >
            VIEW TERMINAL SESSION
          </button>
        </>
      )}



      {altered && (
        <>
          <div className="mt-8 border border-[#292929] p-6 text-sm text-gray-500 leading-7">

            <p>
              23:17:04 — EMP-147 enters the archive room.
            </p>

            <p>
              23:17:11 — Employee sits at Terminal 03.
            </p>

            <p className="text-gray-400">
              23:18:02 — EMP-147 looks directly at the camera.
            </p>

            <p className="text-gray-400">
              23:18:04 — Employee points behind the camera.
            </p>

            <p className="text-gray-600">
              23:18:05 — AUDIO UNAVAILABLE.
            </p>

            <p className="text-gray-500">
              23:18:06 — Camera attempts to refocus.
            </p>

            <p className="text-gray-700">
              23:18:07 — SIGNAL INTERRUPTION.
            </p>

          </div>

          <Objective>
            Determine what EMP-147 saw.
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