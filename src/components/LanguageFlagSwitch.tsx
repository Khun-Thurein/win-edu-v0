import usFlag1x1 from 'flag-icons/flags/1x1/us.svg?url';
import mmFlag1x1 from 'flag-icons/flags/1x1/mm.svg?url';
import './LanguageFlagSwitch.css';

type LanguageFlagSwitchProps = {
  /** When true, Myanmar is selected; when false, English (US). */
  isMyanmar: boolean;
  onToggle: () => void;
  id?: string;
  className?: string;
};

export default function LanguageFlagSwitch({ isMyanmar, onToggle, id, className = '' }: LanguageFlagSwitchProps) {
  const switchId = id ?? 'lang-flag-switch';

  return (
    <div className={`lang-flag-switch-root ${className}`}>
      <label htmlFor={switchId} className="lang-flag-switch">
        <input
          id={switchId}
          type="checkbox"
          className="lang-flag-switch__checkbox"
          checked={isMyanmar}
          onChange={onToggle}
          aria-label={isMyanmar ? 'Language: Myanmar. Switch to English.' : 'Language: English. Switch to Myanmar.'}
        />
        <div className="lang-flag-switch__container">
          <div className="lang-flag-switch__thumb" aria-hidden>
            <img
              className={`fi ${isMyanmar ? 'fi-mm' : 'fi-us'} fis lang-flag-switch__flag-img`}
              src={isMyanmar ? mmFlag1x1 : usFlag1x1}
              alt=""
              draggable={false}
            />
          </div>
        </div>
      </label>
    </div>
  );
}
