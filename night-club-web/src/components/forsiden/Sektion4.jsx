"use client";
import { FaVolumeUp } from "react-icons/fa";

import { useState, useRef, useEffect } from "react";

const tracks = [
  {
    id: 1,
    title: "Black Box Funky",
    img: "/assets/content-img/track_thumb.jpg",
    audio: "/assets/media/black-box-funky.mp3",
  },
  {
    id: 2,
    title: "You Belong With Me",
    img: "/assets/content-img/track1.jpg",
    audio: "/assets/media/black-box-funky.mp3",
  },
  {
    id: 3,
    title: "Euphoria",
    img: "/assets/content-img/track2.jpg",
    audio: "/assets/media/euphoria.mp3",
  },
  {
    id: 4,
    title: "Fashion Red Tape",
    img: "/assets/content-img/track4.jpg",
    audio: "/assets/media/fashion-red-tape.mp3",
  },
  {
    id: 5,
    title: "Track 5",
    img: "/assets/content-img/track5.jpg",
    audio: "/assets/media/euphoria.mp3",
  },
];

function formatTime(seconds) {
  if (isNaN(seconds)) return "00:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function Sektion4() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);

  const audioRef = useRef(null);
  const activeTrack = tracks[activeIndex];

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.src = activeTrack.audio;
    audioRef.current.volume = volume;
    if (isPlaying) audioRef.current.play();
  }, [activeIndex]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? tracks.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === tracks.length - 1 ? 0 : prev + 1));
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const val = Number(e.target.value);
    audioRef.current.currentTime = val;
    setCurrentTime(val);
  };

  const handleVolume = (e) => {
    const val = Number(e.target.value);
    audioRef.current.volume = val;
    setVolume(val);
  };

  return (
    <section className="py-20 px-6 md:px-16 relative">
      {/* TITEL */}
      <div className="text-center mb-10">
        <h2 className="text-[32px] md:text-[38px] font-bold bg-[url('/assets/bottom_line.png')] bg-bottom bg-no-repeat pb-2 [background-size:140%_18px]">NIGHT CLUB TRACK</h2>
      </div>

      {/* ================= MOBIL ================= */}
      <div className="md:hidden flex flex-col gap-5">
        {/* SANG TITEL */}
        <h3 className="text-[var(--headlines)] text-xl font-bold uppercase text-center">{activeTrack.title}</h3>

        {/* TID */}
        <span className="text-[var(--headlines)] text-sm text-center">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
        <input type="range" min={0} max={duration || 0} value={currentTime} onChange={handleSeek} className="w-full accent-[var(--pink)] cursor-pointer" />

        {/* KONTROLLER */}
        <div className="flex items-center justify-center gap-6">
          <button onClick={handlePrev} className="text-[var(--headlines)] text-2xl hover:text-[var(--pink)]">
            ⏮
          </button>
          <button onClick={togglePlay} className="w-14 h-14 rounded-full border-2 border-[var(--pink)] flex items-center justify-center text-[var(--pink)] text-xl">
            {isPlaying ? "⏸" : "▶"}
          </button>
          <button onClick={handleNext} className="text-[var(--headlines)] text-2xl hover:text-[var(--pink)]">
            ⏭
          </button>
        </div>

        {/* VOLUMEN */}
        <div className="flex items-center justify-center gap-3">
          <FaVolumeUp size={30} />
          <input type="range" min={0} max={1} step={0.01} value={volume} onChange={handleVolume} className="w-40 accent-[var(--pink)] cursor-pointer" />
        </div>

        {/* AKTIVT BILLEDE — kun ét ad gangen */}
        <div onClick={() => setIsPlaying(true)} className="relative cursor-pointer overflow-hidden ">
          <img src={activeTrack.img} alt={activeTrack.title} className="w-full h-[350px] object-cover" />
          <div className="absolute inset-0 bg-[var(--background)]/30" />
          <div className="absolute bottom-0 right-0 w-18 h-18 bg-[var(--pink)] [clip-path:polygon(100%_0,100%_100%,0_100%)] z-40"></div>
          <div className="absolute top-0 left-0 w-18 h-18 bg-[var(--pink)] [clip-path:polygon(0_0,100%_0,0_100%)]" />
          <div className="absolute bottom-0 left-0 right-0 bg-[var(--background)] px-4 py-3 flex items-center z-30">
            <span className="text-[var(--headlines)] text-lg font-bold uppercase flex-1 text-center">{activeTrack.title}</span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full border-2 border-[var(--pink)] flex items-center justify-center">
              <span className="text-[var(--pink)] text-2xl">{isPlaying ? "⏸" : "▶"}</span>
            </div>
          </div>
        </div>

        {/* PILE UNDER BILLEDE */}
        <div className="flex justify-center gap-10 mt-5">
          <button onClick={handlePrev} className="w-15 h-15 border-2 border-[var(--headlines)] flex items-center justify-center text-[var(--headlines)] text-xl hover:border-[var(--pink)] hover:text-[var(--pink)] transition">
            ◀
          </button>
          <button onClick={handleNext} className="w-15 h-15 border-2 border-[var(--headlines)] flex items-center justify-center text-[var(--headlines)] text-xl hover:border-[var(--pink)] hover:text-[var(--pink)] transition">
            ▶
          </button>
        </div>
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:block">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-[250px_1fr] gap-8 items-center">
            {/* STORT BILLEDE */}
            <img src={activeTrack.img} alt={activeTrack.title} className="w-full h-[260px] object-cover" />

            {/* KONTROLLER */}
            <div className="flex flex-col gap-6">
              <h3 className="text-[var(--headlines)] text-xl font-bold uppercase">{activeTrack.title}</h3>

              {/* TIDSLINJE */}
              <input type="range" min={0} max={duration || 0} value={currentTime} onChange={handleSeek} className="w-full accent-[var(--pink)] cursor-pointer" />

              <div className="flex items-center justify-between">
                <span className="text-[var(--headlines)] text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>

                <div className="flex items-center gap-6">
                  <button onClick={handlePrev} className="text-[var(--headlines)] text-2xl hover:text-[var(--pink)]">
                    ⏮
                  </button>
                  <button onClick={togglePlay} className="w-14 h-14 rounded-full border-2 border-[var(--headlines)] flex items-center justify-center text-[var(--headlines)] text-xl hover:border-[var(--pink)] hover:text-[var(--pink)] transition">
                    {isPlaying ? "⏸" : "▶"}
                  </button>
                  <button onClick={handleNext} className="text-[var(--headlines)] text-2xl hover:text-[var(--pink)]">
                    ⏭
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <FaVolumeUp size={40} />
                  <input type="range" min={0} max={1} step={0.01} value={volume} onChange={handleVolume} className="w-28 accent-[var(--pink)] cursor-pointer" />
                </div>
              </div>
            </div>
          </div>

          {/* THUMBNAILS */}
          <div className="relative mt-10">
            <button
              onClick={handlePrev}
              className="absolute -left-14 top-1/2 -translate-y-1/2 w-10 h-10 border border-[var(--headlines)] flex items-center justify-center text-[var(--headlines)] hover:border-[var(--pink)] hover:text-[var(--pink)] transition z-10"
            >
              ◀
            </button>

            <div className="grid md:grid-cols-5 gap-0 overflow-hidden">
              {tracks.map((track, i) => (
                <div
                  key={track.id}
                  onClick={() => {
                    setActiveIndex(i);
                    setIsPlaying(true);
                  }}
                  className={`relative h-[160px] cursor-pointer overflow-hidden group ${i === activeIndex ? "ring-2 ring-[var(--pink)]" : ""}`}
                >
                  <img src={track.img} alt={track.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-[var(--background)]/30" />
                  <div className="absolute bottom-0 right-0 w-9 h-9 bg-[var(--pink)] [clip-path:polygon(100%_0,100%_100%,0_100%)]"></div>
                  <div className="absolute top-0 left-0 w-10 h-10 bg-[var(--pink)] [clip-path:polygon(0_0,100%_0,0_100%)]" />

                  <div className="absolute bottom-3 left-3">
                    <span className="text-[var(--headlines)] text-xs font-bold uppercase">{track.title}</span>
                  </div>
                  {i === activeIndex && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full border-2 border-[var(--pink)] flex items-center justify-center">
                        <span className="text-[var(--pink)] text-2xl">▶</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={handleNext}
              className="absolute -right-14 top-1/2 -translate-y-1/2 w-10 h-10 border border-[var(--headlines)] flex items-center justify-center text-[var(--headlines)] hover:border-[var(--pink)] hover:text-[var(--pink)] transition z-10"
            >
              ▶
            </button>
          </div>
        </div>
      </div>

      {/* AUDIO */}
      <audio ref={audioRef} src={activeTrack.audio} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata} onEnded={handleNext} />
    </section>
  );
}
