import AsciiCube from "./AsciiCube";

const sections = [
  {
    title: "about me",
    lines: [
      [
        <>
          i like{" "}
          <a
            href="https://wordmuse.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 transition-colors hover:text-white/60"
          >
            building
          </a>
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
    <main className="min-h-screen flex-1 p-6 sm:p-10 flex items-stretch justify-between gap-8">
      <div className="font-[family-name:var(--font-jakarta)] lowercase text-white">
        <h1 className="font-display text-9xl leading-none tracking-wide" style={{ fontSize: '150px', letterSpacing: '0.03em' }}>
            傅<span className="ml-16">健宸</span>
        </h1>
        <p className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl" style={{ fontSize: '50px', letterSpacing: '-0.06em', marginLeft: '0.2em' }}>
          warren fu.
        </p>

        <div className="mt-10 flex flex-col gap-8" style={{ letterSpacing: '-0.1em', marginLeft: '0.5em' }}>
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-2xl font-semibold sm:text-3xl">{section.title}</h2>
              <div className="mt-3 flex flex-col gap-1 text-lg font-normal sm:text-xl">
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
