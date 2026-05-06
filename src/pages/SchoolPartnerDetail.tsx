import { useMemo } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PartnerDetailPanel from '../components/PartnerDetailPanel';
import { getPartnerBySlug } from '../data/partners';
import './SchoolPartnerDetail.css';

export default function SchoolPartnerDetail() {
  const { slug } = useParams<{ slug: string }>();
  const partner = useMemo(() => getPartnerBySlug(slug), [slug]);

  if (!partner) {
    return <Navigate to="/services" replace />;
  }

  return (
    <main className="page-enter partner-detail">
      <div className="container partner-detail__container">
        <Link to="/services" className="partner-detail__back">
          <ArrowLeft size={18} aria-hidden />
          Back to Services
        </Link>

        <PartnerDetailPanel partner={partner} variant="page" titleLevel="h1" idPrefix={`partner-${partner.slug}`} />
      </div>
    </main>
  );
}
