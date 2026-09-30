"use client";

import { useState } from "react";

type Stage = "intro" | "employee" | "camera" | "session" | "ending";

export default function Home() {
  const [stage, setStage] = useState<Stage>("intro");

  return (
    <main className="min-h-screen bg-[#050505] text-[#d6d6d6] font-mono">
      {stage === "intro" && (
        <Intro onContinue={() => setStage("employee")} />
      )}

      {stage === "employee" && (
        <EmployeeRecord
          onContinue={() => setStage("camera")}
        />
      )}

      {stage === "camera" && (
        <Camera
          onContinue={() => setStage("session")}
        />
      )}

      {stage === "session" && (
        <LastSession
          onContinue={() => setStage("ending")}
        />
      )}

      {stage === "ending" && <Ending />}
    </main>
  );
}


// intro

function Intro({
  onContinue,
}: {
  onContinue: () => void;
}) {
  return (
    <Screen>

      <SystemLabel>
        ARCHIVE TERMINAL 03
      </SystemLabel>

      <h1 className="text-3xl md:text-5xl tracking-[0.2em] mt-4">
        CASE FILE: EMP-147
      </h1>

      <div className="h-px bg-[#222] my-10" />

      <div className="space-y-6 text-sm text-gray-500 leading-7">

        <p>
          EMP-147 was last seen using this terminal
          on September 29, 2026.
        </p>

        <p>
          The employee was reported missing shortly
          after their final session.
        </p>

        <p>
          Your task is to reconstruct their final
          session and determine what happened.
        </p>

      </div>

      <Objective>
        Find the last recorded activity of EMP-147.
      </Objective>

      <button
        onClick={onContinue}
        className="mt-8 border border-[#444] px-8 py-3 text-xs tracking-[0.2em] hover:bg-[#151515] hover:border-[#777] transition"
      >
        OPEN EMPLOYEE RECORD
      </button>

    </Screen>
  );
}


// employee record

function EmployeeRecord({
  onContinue,
}: {
  onContinue: () => void;
}) {
  return (
    <Screen>

      <SystemLabel>
        CASE FILE / EMP-147
      </SystemLabel>

      <h1 className="text-3xl tracking-[0.2em] mt-4">
        EMPLOYEE RECORD
      </h1>

      <div className="h-px bg-[#222] my-10" />

      <div className="border border-[#222] p-6">

        <Info label="EMPLOYEE ID" value="EMP-147" />

        <Info label="STATUS" value="MISSING" />

        <Info
          label="LAST SEEN"
          value="2026-09-29 / 23:17"
        />

        <Info
          label="LOCATION"
          value="ARCHIVE TERMINAL 03"
        />

        <Info
          label="LAST RECORDED ACTIVITY"
          value="SECURITY CAMERA 04"
        />

      </div>

      <div className="mt-10 text-sm text-gray-500 leading-7">

        <p>
          No further activity was recorded after
          the employee accessed Security Camera 04.
        </p>

        <p className="mt-6">
          The recording has been preserved.
        </p>

      </div>

      <Objective>
        View Security Camera 04.
      </Objective>

      <button
        onClick={onContinue}
        className="mt-8 border border-[#444] px-8 py-3 text-xs tracking-[0.2em] hover:bg-[#151515] hover:border-[#777] transition"
      >
        VIEW CAMERA 04
      </button>

    </Screen>
  );
}


// camera

function Camera({
  onContinue,
}: {
  onContinue: () => void;
}) {
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

          <span>
            23:17:04
          </span>

        </div>

        <div className="aspect-video flex items-center justify-center relative overflow-hidden">

          <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,#fff_4px)]" />

          <div className="text-[10px] text-gray-700">
            SECURITY FOOTAGE
          </div>

        </div>

      </div>

      <div className="mt-8 text-sm text-gray-500 leading-7">

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
        Find out what EMP-147 was looking at.
      </Objective>

      <button
        onClick={onContinue}
        className="mt-8 border border-[#444] px-8 py-3 text-xs tracking-[0.2em] hover:bg-[#151515] hover:border-[#777] transition"
      >
        OPEN LAST SESSION
      </button>

    </Screen>
  );
}


// last session

function LastSession({
  onContinue,
}: {
  onContinue: () => void;
}) {
  return (
    <Screen>

      <SystemLabel>
        RECOVERED DATA / EMP-147
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
          EMP-147 searched: "WHO IS WATCHING"
        </Log>

        <Log time="23:19:12">
          EMP-147 searched: "TERMINAL 03"
        </Log>

        <Log time="23:19:44">
          EMP-147 searched: "ME"
        </Log>

        <Log time="23:20:01">
          EMP-147 stopped responding.
        </Log>

      </div>

      <Objective>
        Find the last thing EMP-147 saw.
      </Objective>

      <button
        onClick={onContinue}
        className="mt-8 border border-[#444] px-8 py-3 text-xs tracking-[0.2em] hover:bg-[#151515] hover:border-[#777] transition"
      >
        CONTINUE INVESTIGATION
      </button>

    </Screen>
  );
}


// ending temp.

function Ending() {
  return (
    <Screen>

      <SystemLabel>
        ARCHIVE SYSTEM
      </SystemLabel>

      <div className="mt-20 text-center">

        <p className="text-sm text-gray-600">
          Investigation complete.
        </p>

        <p className="mt-6 text-xs text-gray-700">
          ENDING — TEMPORARY
        </p>

      </div>

    </Screen>
  );
}


// components

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