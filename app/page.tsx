import AsciiCube from "./AsciiCube";

const sections = [
  {
    title: "about me",
    lines: [
      [
        <>
          i like{" "}
          <span className="group cursor-default">
            <span className="group-hover:hidden">building</span>
            <span className="hidden group-hover:inline">coming soon</span>
          </span>
        </>,
        "math",
        "biology",
      ],
      ["jjk", "linkin park", "calvin harris", "hades I and II", "and dancing."],
    ],
  },
  {
    title: "school",
    lines: [["i'm an incoming freshman at", "columbia university", "in new york city."]],
  },
  {
    title: "work",
    lines: [["mskcc", "live, by po-shen loh"]],
  },
  {
    title: "favorite drink",
    lines: [["diet coke"]],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen flex-1 p-6 sm:p-10 flex flex-col items-stretch gap-8 md:flex-row md:justify-between">
      <div className="font-[family-name:var(--font-jakarta)] lowercase text-white">
        <h1 className="font-display leading-none tracking-wide" style={{ fontSize: 'clamp(100px, 25vw, 150px)', letterSpacing: '0.03em' }}>
            傅<span className="ml-[0.3em]">健宸</span>
        </h1>
        <p className="mt-1 font-bold tracking-tight" style={{ fontSize: 'clamp(30px, 9vw, 50px)', letterSpacing: '-0.06em', marginLeft: '0.2em' }}>
          warren fu.
        </p>

        <div className="mt-10 flex flex-col gap-8" style={{ letterSpacing: '-0.1em', marginLeft: '0.5em' }}>
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-lg font-semibold sm:text-3xl">{section.title}</h2>
              <div className="mt-2 flex flex-col gap-1 text-xs font-normal sm:mt-3 sm:text-xl" style={{ letterSpacing: '-0.07em' }}>
                {section.lines.map((line, i) => (
                  <div key={i} className="flex flex-wrap gap-x-6">
                    {line.map((item, j) => (
                      <span key={j}>{item}</span>
                    ))}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <AsciiCube />
    </main>
  );
}
