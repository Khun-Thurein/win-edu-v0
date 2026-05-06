import { Link2, MapPin, Phone } from 'lucide-react';
import { PartnerSocialLinks } from './PartnerBrandSocialIcons';
import {
  formatPartnerAddress,
  normalizeWebsiteUrl,
  type SchoolPartner,
} from '../data/partners';
import './PartnerDetailPanel.css';

export type PartnerDetailVariant = 'page' | 'modal';

type Props = {
  partner: SchoolPartner;
  variant?: PartnerDetailVariant;
  /** School name heading — use h2 inside dialogs */
  titleLevel?: 'h1' | 'h2';
  idPrefix?: string;
};

export default function PartnerDetailPanel({
  partner,
  variant = 'page',
  titleLevel = 'h1',
  idPrefix = 'partner-detail',
}: Props) {
  const addressLine = formatPartnerAddress(partner.address);
  const showContactCards = Boolean(partner.phone || partner.website || addressLine);
  const TitleTag = titleLevel;
  const SummaryTag = titleLevel === 'h2' ? 'h3' : 'h2';
  const titleId = `${idPrefix}-title`;
  const summaryHeadingId = `${idPrefix}-summary-heading`;

  const layoutMods = [
    showContactCards ? '' : ' partner-detail__layout--full',
    variant === 'modal' ? ' partner-detail__layout--modal' : '',
  ].join('');

  return (
    <div className={`partner-detail__layout${layoutMods}`}>
      <div className="partner-detail__main">
        <header className="partner-detail__header">
          <div className="partner-detail__header-logo">
            <img
              src={partner.logo}
              alt={`${partner.name} logo`}
              className="partner-detail__header-logo-img"
            />
          </div>
          <div className="partner-detail__header-text">
            <TitleTag
              className="partner-detail__title"
              id={titleLevel === 'h2' ? titleId : undefined}
            >
              {partner.name}
            </TitleTag>
            <p className="partner-detail__country">{partner.meta}</p>
          </div>
        </header>

        {partner.tagline ? <p className="partner-detail__tagline">{partner.tagline}</p> : null}

        {partner.socials && Object.keys(partner.socials).length > 0 ? (
          <PartnerSocialLinks socials={partner.socials} />
        ) : null}

        {partner.summary ? (
          <section className="partner-detail__section" aria-labelledby={summaryHeadingId}>
            <SummaryTag id={summaryHeadingId} className="partner-detail__section-title">
              Summary
            </SummaryTag>
            <p className="partner-detail__summary">{partner.summary}</p>
          </section>
        ) : null}
      </div>

      {showContactCards ? (
        <aside className="partner-detail__sidebar" aria-label="Contact details">
          <section className="partner-detail__contact">
            <div className="partner-detail__contact-cards">
              {partner.phone ? (
                <div className="partner-detail__info-card">
                  <div className="partner-detail__info-icon" aria-hidden>
                    <Phone size={15} strokeWidth={2} />
                  </div>
                  <div className="partner-detail__info-body">
                    <p className="partner-detail__info-label">Phone</p>
                    <a className="partner-detail__info-value" href={`tel:${partner.phone.replace(/\s/g, '')}`}>
                      {partner.phone}
                    </a>
                  </div>
                </div>
              ) : null}

              {partner.website ? (
                <div className="partner-detail__info-card">
                  <div className="partner-detail__info-icon" aria-hidden>
                    <Link2 size={15} strokeWidth={2} />
                  </div>
                  <div className="partner-detail__info-body">
                    <p className="partner-detail__info-label">Website</p>
                    <a
                      className="partner-detail__info-value partner-detail__info-value--link"
                      href={normalizeWebsiteUrl(partner.website)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {partner.website.replace(/^https?:\/\//i, '')}
                    </a>
                  </div>
                </div>
              ) : null}

              {addressLine ? (
                <div className="partner-detail__info-card">
                  <div className="partner-detail__info-icon" aria-hidden>
                    <MapPin size={15} strokeWidth={2} />
                  </div>
                  <div className="partner-detail__info-body">
                    <p className="partner-detail__info-label">Address</p>
                    <p className="partner-detail__info-value partner-detail__info-value--multiline">{addressLine}</p>
                  </div>
                </div>
              ) : null}
            </div>
          </section>
        </aside>
      ) : null}
    </div>
  );
}
