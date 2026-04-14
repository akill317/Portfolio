import { useLanguage } from '../contexts/LanguageContext'
import './Footer.css'

const CONTACT_EMAIL = '375051821@qq.com'

function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="site-footer" role="contentinfo">
      <p className="site-footer__line">{t('footerContactLine1')}</p>
      <p className="site-footer__line site-footer__line--contact">
        {t('footerContactLine2Prefix')}
        <a href={`mailto:${CONTACT_EMAIL}`} className="site-footer__link">
          {CONTACT_EMAIL}
        </a>
        {t('footerContactLine2Suffix')}
      </p>
    </footer>
  )
}

export default Footer
