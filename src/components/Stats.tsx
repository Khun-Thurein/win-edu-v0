import type { ReactNode } from 'react';
import './Stats.css';

type StatsProps = {
  children?: ReactNode;
  plain?: boolean;
};

export default function Stats({ children, plain = false }: StatsProps) {
  return (
    <section className={`stats section${plain ? ' stats--plain' : ''}`}>
      <div className="container">
        <div className="section__head">
          <div>
            <span className="eyebrow eyebrow--light">By the Numbers</span>
            <h2 className="h-display section__title stats__title">
              Outcomes that <em>speak</em>
              <br />
              for themselves.
            </h2>
          </div>
        </div>
      </div>
      {children}
    </section>
  );
}
