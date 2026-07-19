import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  App,
  Block,
  BlockTitle,
  Button,
  Glass,
  List,
  ListInput,
  ListItem,
  Navbar,
  Notification,
  Page,
  Segmented,
  SegmentedButton,
} from 'konsta/react';
import { l_ } from './Localization';
import './styles.css';

const languages = [
  ['en', '🇬🇧'],
  ['zh', '🇨🇳'],
  ['ar', '🇦🇪'],
  ['es', '🇪🇸'],
  ['ru', '🇷🇺'],
  ['fr', '🇫🇷'],
];

const patentDocuments = [
  {
    id: 'en-pdf',
    kind: 'PDF',
    titleKey: 'patent_invention_title',
    subtitleKey: 'patent_invention_subtitle',
    textKey: 'patent_invention_text',
    preview: '/demo/previews/patent-en-1.png',
    source: '/demo/patents/Patent_2620986C1_en.pdf',
    filename: 'Patent_2620986C1_en.pdf',
  },
  {
    id: 'en-certificate',
    kind: 'PNG',
    titleKey: 'patent_certificate_title',
    subtitle: 'English certificate · 2620986',
    textKey: 'patent_certificate_text',
    preview: '/demo/patents/BioTechPatent_en.png',
    source: '/demo/patents/BioTechPatent_en.png',
    filename: 'BioTechPatent_en.png',
  },
  {
    id: 'original-pdf',
    kind: 'PDF',
    titleKey: 'patent_original_title',
    subtitle: '2620986 C1 · 30.05.2017',
    textKey: 'patent_original_text',
    preview: '/demo/previews/patent-ru-1.png',
    source: '/demo/patents/Patent_2620986C1_ru.pdf',
    filename: 'Patent_2620986C1_ru.pdf',
  },
  {
    id: 'google-patents',
    kind: 'ONLINE',
    titleKey: 'google_patents_title',
    subtitle: '2620986 C1 · Google Patents',
    textKey: 'google_patents_text',
    preview: '/demo/previews/google-patents-thumbnail.png',
    source: 'https://patents.google.com/patent/RU2620986C1/en',
    external: true,
  },
  {
    id: 'hemangiomas-chapter',
    kind: 'ONLINE',
    title: 'Method and Model for Estimating the Thickness of Hemangiomas',
    subtitle: 'Fedosov, Goldstein & Diomidov · 2015',
    text: 'Chapter in conference proceedings: Physics. Technologies. Innovations, Vol. 1, pp. 196–204. Ural Federal University.',
    preview: '/demo/previews/publication-record.svg',
    source: 'https://sciencedata.urfu.ru/portal/en/persons/--(ffbec4cd-b593-4af0-a10c-5965d72e1627).html',
    external: true,
  },
  {
    id: 'hemangioma-model',
    kind: 'ONLINE',
    title: 'Mathematical Model for Determining Hemangioma Thickness',
    subtitle: 'Fedosov, Goldstein & Diomidov · 2014',
    text: 'Conference proceedings: Physics. Technologies. Innovations (FTI-2014), pp. 97–98. Ural Federal University.',
    preview: '/demo/previews/publication-record.svg',
    source: 'https://scholar.google.com/citations?user=KNHlJ94AAAAJ',
    external: true,
  },
];

const certificates = [
  ['aws', 'PDF', 'AWS Cloud Essentials', 'AWS', 'AWS_Essentials.pdf'],
  ['langchain', 'PDF', 'Build AI Autonomous Agents', 'LangChain & Hugging Face', 'Certificate_Build_AI_Autonomous_Agents_with_LangChain_and_Hugging Face.pdf'],
  ['claude-101', 'PDF', 'Claude 101', 'Anthropic Academy', 'Clouade_101.pdf', 'https://verify.skilljar.com/c/578echzjdw5b'],
  ['claude-fluency', 'PDF', 'Claude AI Fluency', 'Anthropic Academy', 'Clouade_AI_Fluency.pdf', 'https://verify.skilljar.com/c/42a2c8rad7ah'],
  ['claude-code', 'PDF', 'Claude Code in Action', 'Anthropic Academy', 'Cloude_Code_In_Action.pdf', 'https://verify.skilljar.com/c/4u54rs82dokd'],
  ['ml-specialization', 'PDF', 'Machine Learning Specialization', 'Stanford Online · Course', 'Coursera_Stanford_A_Machine_Learning_COURSE.pdf', 'https://coursera.org/verify/specialization/NRNBSTTHBHTX', 'ml_course_text'],
  ['advanced-algorithms', 'PDF', 'Advanced Learning Algorithms', 'Stanford Online · Course certificate', 'Coursera_Stanford_Advanced_Learning_Algorithms.pdf', 'https://coursera.org/share/242e91b6dbe682074095de2a35ae6014', 'ml_certificate_text'],
  ['reinforcement-learning', 'PDF', 'Reinforcement Learning', 'Stanford Online · Course certificate', 'Coursera_Stanford_Reinforcement_Learning.pdf', 'https://coursera.org/share/2643adfc072f53b5cb6c79f3332e009d', 'ml_certificate_text'],
  ['supervised-learning', 'PDF', 'Supervised Machine Learning', 'Stanford Online · Course certificate', 'Coursera_Stanford_Supervised_Machine_Learning.pdf', 'https://coursera.org/share/0d369ad646eff02cbcc59c3469bd0060', 'ml_certificate_text'],
  ['databricks', 'PDF', 'Databricks', 'Databricks Academy', 'Databricks_Generic_2206_3_1612960_1781711679.pdf', 'https://drive.google.com/file/d/1SDWbVwS-k0hSsUBzk3mZDEt-YUcOODa/view?usp=share_link'],
  ['digital-competences', 'PDF', 'Digital Competences Report', 'Professional development', 'Digital_competences_report.pdf'],
  ['google-ai', 'PNG', 'Introduction to AI', 'Google · Coursera', 'Google_ai.png', 'https://coursera.org/verify/specialization/Q3T18GZDQQPY'],
  ['ibm-workflows', 'PDF', 'Agentic AI and Agentic Workflows', 'IBM · Course', 'IBM_Agentic_AI_And_Agentic_Workflows_COURSE.pdf', 'https://coursera.org/verify/specialization/I0DR1TLA8G9M', 'agentic_course_text'],
  ['ibm-langchain', 'PDF', 'Agentic AI: LangChain and LangGraph', 'IBM · Course certificate', 'IBM_Agentic_AI_LangChain_LangGraph.pdf', 'https://coursera.org/share/289f0e4826d000f8c7ce42c5a40b990f', 'agentic_certificate_text'],
  ['ibm-frameworks', 'PDF', 'Agentic AI: LangGraph, CrewAI, AutoGen and BeeAI', 'IBM · Course certificate', 'IBM_Agentic_AI_LangGraph_CrewAI_AutoGen_BeeAI.pdf', 'https://coursera.org/share/b00cef55f4093bd0db44827bbccd9154', 'agentic_certificate_text'],
  ['ibm-fundamentals', 'PDF', 'Fundamentals of Building AI Agents', 'IBM · Course certificate', 'IBM_Fundamentals_Building_AI_Agents.pdf', 'https://coursera.org/share/8a40f683363d3e1338bafc035777c23d', 'agentic_certificate_text'],
  ['openai-agents', 'PDF', 'Agents and Workflows', 'OpenAI Academy', 'OpenAI_Agents_And_Workflows.pdf', 'https://academy.openai.com/public/certificate/kyebwfhzky'],
].map(([id, kind, title, subtitle, filename, verificationUrl, textKey]) => ({
  id,
  kind,
  title,
  subtitle,
  filename,
  source: `/demo/certifications/${filename}`,
  verificationUrl,
  textKey,
  preview:
    kind === 'PDF'
      ? `/demo/previews/certifications/${filename.replace(/\.pdf$/, '.png')}`
      : id === 'google-ai'
        ? '/demo/previews/certifications/Google_ai.jpg'
        : '/demo/previews/certifications/KET.jpg',
}));

function GlobeIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="nav-icon">
      <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3.8 12h16.4M12 3.5c2.1 2.3 3.2 5.1 3.2 8.5s-1.1 6.2-3.2 8.5c-2.1-2.3-3.2-5.1-3.2-8.5S9.9 5.8 12 3.5Z" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="copy-icon">
      <rect x="8" y="8" width="10" height="11" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 8V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h1" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function PreviewModal({ document, onClose, t }) {
  if (!document) return null;
  const isPdf = document.kind === 'PDF';

  return (
    <div className="preview-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="preview-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="preview-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="preview-toolbar">
          <div>
            <p className="eyebrow">{t('preview')}</p>
            <h2 id="preview-title">{document.title}</h2>
          </div>
          <div className="preview-actions">
            {!document.external && (
              <Button small rounded inline className="preview-download" onClick={() => downloadFile(document)}>
                {document.kind === 'PDF' ? t('download_pdf') : t('download_image')}
              </Button>
            )}
            <Button small rounded inline onClick={onClose} aria-label={t('close_preview')}>
              {t('close')}
            </Button>
          </div>
        </div>
        <div className="preview-content">
          {isPdf ? (
            <iframe title={`${t('preview')}: ${document.title}`} src={document.source} />
          ) : (
            <img src={document.source} alt={`${t('preview')}: ${document.title}`} />
          )}
        </div>
      </section>
    </div>
  );
}

function downloadFile(document) {
  const anchor = window.document.createElement('a');
  anchor.href = document.source;
  anchor.download = document.filename;
  window.document.body.append(anchor);
  anchor.click();
  anchor.remove();
}

function DocumentListItem({ document, onPreview, onCopy, t }) {
  const title = document.titleKey ? t(document.titleKey) : document.title;
  const subtitle = document.subtitleKey ? t(document.subtitleKey) : document.subtitle;
  const text = document.textKey ? t(document.textKey) : document.text || t('certificate_file');
  const copyUrl = document.verificationUrl || new URL(document.source, window.location.origin).href;
  const copyUrlLabel = copyUrl.length > 58 ? `${copyUrl.slice(0, 56)}..` : copyUrl;

  const open = () => {
    if (document.external) {
      window.open(document.source, '_blank', 'noopener,noreferrer');
      return;
    }
    onPreview({ ...document, title });
  };

  return (
    <ListItem
      link
      dividers
      chevronMaterial={false}
      className="document-list-item cursor-pointer"
      title={title}
      subtitle={subtitle}
      text={text}
      footer={
        <span
          role="button"
          tabIndex={0}
          className="document-source"
          title={copyUrl}
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            onCopy(copyUrl);
          }}
          onKeyDown={(event) => {
            if (event.key !== 'Enter' && event.key !== ' ') return;
            event.preventDefault();
            event.stopPropagation();
            onCopy(copyUrl);
          }}
        >
          {copyUrlLabel}
        </span>
      }
      media={
        <span
          role="button"
          tabIndex={0}
          className="document-thumbnail"
          aria-label={`${t('preview')}: ${title}`}
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            open();
          }}
          onKeyDown={(event) => {
            if (event.key !== 'Enter' && event.key !== ' ') return;
            event.preventDefault();
            event.stopPropagation();
            open();
          }}
        >
          <img src={document.preview} alt="" />
          <span>{document.kind}</span>
        </span>
      }
      linkProps={{
        href: document.external ? document.source : '#preview',
        target: document.external ? '_blank' : undefined,
        rel: document.external ? 'noreferrer' : undefined,
        onClick: (event) => {
          event.preventDefault();
          open();
        },
      }}
    />
  );
}

function AppContent() {
  const [lz, setLz] = useState('en');
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [notificationOpened, setNotificationOpened] = useState(false);
  const section = window.location.pathname.replace(/\/$/, '').endsWith('/cert') ? 'cert' : 'patent';
  const t = (key) => l_[key]?.[lz] ?? l_[key]?.en ?? key;
  const documents = section === 'cert' ? certificates : patentDocuments;
  const pageTitle = section === 'cert' ? t('certificates_title') : t('patent_title');

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem('demo-language');
    if (languages.some(([code]) => code === savedLanguage)) setLz(savedLanguage);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('demo-language', lz);
  }, [lz]);

  useEffect(() => {
    if (!notificationOpened) return undefined;
    const timeout = window.setTimeout(() => setNotificationOpened(false), 2600);
    return () => window.clearTimeout(timeout);
  }, [notificationOpened]);

  const shareUrl = useMemo(() => window.location.href, [section]);
  const navigate = (target) => window.location.assign(`${import.meta.env.BASE_URL}${target}/`);
  const handleSetLz = (event) => setLz(event.target.value);

  const copyToClipboard = async (value = shareUrl) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const area = window.document.createElement('textarea');
      area.value = value;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      window.document.body.append(area);
      area.select();
      window.document.execCommand('copy');
      area.remove();
    }
    setNotificationOpened(false);
    window.setTimeout(() => setNotificationOpened(true), 0);
  };

  return (
    <App theme="ios" className="k-ios patent-app">
      <Page className="patent-page">
        <Navbar
          left={
            <button className="nav-left-action" type="button" onClick={() => navigate('patent')} aria-label={t('nav_patent')}>
              <GlobeIcon />
            </button>
          }
          title={pageTitle.length > 24 ? `${pageTitle.slice(0, 24)}..` : pageTitle}
          subtitle={<span onClick={copyToClipboard}>{t('copy_link')}</span>}
          style={{ letterSpacing: '-0.5px', fontSize: '8px' }}
          className="cursor-pointer text-sm patent-navbar"
          centerTitle
          right={
            <List className="language-picker cursor-pointer">
              <ListInput type="select" dropdown value={lz} className="cursor-pointer" onChange={handleSetLz} aria-label={t('language')}>
                {languages.map(([code, flag]) => <option key={code} value={code}>{flag}</option>)}
              </ListInput>
            </List>
          }
        />

        <header className="hero">
          <Glass className="hero-glass rounded-3xl p-6 sm:p-9">
            <p className="eyebrow">{section === 'cert' ? t('certificates_eyebrow') : t('patent_eyebrow')}</p>
            <h1>{section === 'cert' && <sup className="certificate-count">{documents.length}</sup>}{pageTitle}</h1>
            <p className="hero-description">{section === 'cert' ? t('certificates_description') : t('patent_description')}</p>
            <Button clear rounded className="copy-link" onClick={copyToClipboard}>
              <CopyIcon />
              {t('copy_link')}
            </Button>
          </Glass>
        </header>

        <Block className="segment-block">
          <Glass className="rounded-2xl p-2">
            <Segmented strong rounded>
              <SegmentedButton active={section === 'patent'} onClick={() => navigate('patent')}>
                {t('nav_patent')}
              </SegmentedButton>
              <SegmentedButton active={section === 'cert'} onClick={() => navigate('cert')}>
                {t('nav_certificates')}
              </SegmentedButton>
            </Segmented>
          </Glass>
        </Block>

        <BlockTitle className="documents-title">{t('materials')}</BlockTitle>
        <Block className="documents-block">
          <Glass className="documents-glass rounded-3xl p-2">
            <List strong inset dividers className="documents-list">
              {documents.map((document) => (
                <DocumentListItem key={document.id} document={document} onPreview={setSelectedDocument} onCopy={copyToClipboard} t={t} />
              ))}
            </List>
          </Glass>
        </Block>

        <Block className="notice-block">
          <p>{t('notice')}</p>
        </Block>
      </Page>
      <Notification
        opened={notificationOpened}
        icon={<CopyIcon />}
        title={t('link_copied')}
        titleRightText={t('now')}
        subtitle={pageTitle}
        text={t('link_copied_description')}
        onClick={() => setNotificationOpened(false)}
      />
      <PreviewModal document={selectedDocument} onClose={() => setSelectedDocument(null)} t={t} />
    </App>
  );
}

createRoot(document.getElementById('root')).render(<AppContent />);
