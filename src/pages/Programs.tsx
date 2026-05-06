import { Link, useSearchParams } from 'react-router-dom';
import { PROGRAM_TAB_LABELS, type ProgramCategoryKey } from '../data/partners';
import './Programs.css';

const CATEGORY_KEYS = new Set<string>(['pathway', 'undergraduate', 'postgraduate']);

export default function Programs() {
  const [params] = useSearchParams();
  const rawCategory = params.get('category') ?? '';
  const partnerSlug = params.get('partner');
  const category = CATEGORY_KEYS.has(rawCategory) ? (rawCategory as ProgramCategoryKey) : null;

  return (
    <main className="page-enter programs-page">
      <div className="container programs-page__inner">
        <h1 className="h-display programs-page__title">Program list</h1>
        <p className="programs-page__lede">
          This is a placeholder for the filtered program catalogue. When you connect a real programs index, use the query
          parameters below to deep-link from partner pages.
        </p>
        <dl className="programs-page__meta">
          <div className="programs-page__meta-row">
            <dt>category:</dt>{' '}
            <dd>
              {category ? PROGRAM_TAB_LABELS[category] : '(none or invalid)'} ({rawCategory || '—'})
            </dd>
          </div>
          <div className="programs-page__meta-row">
            <dt>partner:</dt> <dd>{partnerSlug || '—'}</dd>
          </div>
        </dl>
        <Link to="/services" className="btn btn-primary">
          Back to Services
        </Link>
      </div>
    </main>
  );
}
