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
  Page,
  Segmented,
  SegmentedButton,
  Toast,
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
    titleKey: 'patent_english_title',
    subtitle: '2620986 C1',
    textKey: 'patent_english_text',
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
];

const certificates = [
  ['aws', 'PDF', 'AWS Cloud Essentials', 'AWS', 'AWS_Essentials.pdf'],
  ['langchain', 'PDF', 'Build AI Autonomous Agents', 'LangChain & Hugging Face', 'Certificate_Build_AI_Autonomous_Agents_with_LangChain_and_Hugging Face.pdf'],
  ['claude-101', 'PDF', 'Claude 101', 'Anthropic Academy', 'Clouade_101.pdf'],
  ['claude-fluency', 'PDF', 'Claude AI Fluency', 'Anthropic Academy', 'Clouade_AI_Fluency.pdf'],
  ['claude-code', 'PDF', 'Claude Code in Action', 'Anthropic Academy', 'Cloude_Code_In_Action.pdf'],
  ['ml-specialization', 'PDF', 'Machine Learning Specialization', 'Stanford Online · Coursera', 'Coursera_Stanford_A_Machine_Learning_COURSE.pdf'],
  ['advanced-algorithms', 'PDF', 'Advanced Learning Algorithms', 'Stanford Online · Coursera', 'Coursera_Stanford_Advanced_Learning_Algorithms.pdf'],
  ['reinforcement-learning', 'PDF', 'Reinforcement Learning', 'Stanford Online · Coursera', 'Coursera_Stanford_Reinforcement_Learning.pdf'],
  ['supervised-learning', 'PDF', 'Supervised Machine Learning', 'Stanford Online · Coursera', 'Coursera_Stanford_Supervised_Machine_Learning.pdf'],
  ['databricks', 'PDF', 'Databricks', 'Databricks Academy', 'Databricks_Generic_2206_3_1612960_1781711679.pdf'],
  ['digital-competences', 'PDF', 'Digital Competences Report', 'Professional development', 'Digital_competences_report.pdf'],
  ['google-ai', 'PNG', 'Introduction to AI', 'Google · Coursera', 'Google_ai.png'],
  ['ibm-workflows', 'PDF', 'Agentic AI and Agentic Workflows', 'IBM · Coursera', 'IBM_Agentic_AI_And_Agentic_Workflows_COURSE.pdf'],
  ['ibm-langchain', 'PDF', 'Agentic AI: LangChain and LangGraph', 'IBM · Coursera', 'IBM_Agentic_AI_LangChain_LangGraph.pdf'],
  ['ibm-frameworks', 'PDF', 'Agentic AI: LangGraph, CrewAI, AutoGen and BeeAI', 'IBM · Coursera', 'IBM_Agentic_AI_LangGraph_CrewAI_AutoGen_BeeAI.pdf'],
  ['ibm-fundamentals', 'PDF', 'Fundamentals of Building AI Agents', 'IBM · Coursera', 'IBM_Fundamentals_Building_AI_Agents.pdf'],
  ['openai-agents', 'PDF', 'Agents and Workflows', 'OpenAI Academy', 'OpenAI_Agents_And_Workflows.pdf'],
  ['cambridge-key', 'JPEG', 'Cambridge English Entry Level Certificate', 'Cambridge English Assessment', 'КЕТ.jpeg'],
].map(([id, kind, title, subtitle, filename]) => ({
  id,
  kind,
  title,
  subtitle,
  filename,
  source: `/demo/certifications/${filename}`,
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
          <Button small rounded onClick={onClose} aria-label={t('close_preview')}>
            {t('close')}
          </Button>
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

function DocumentListItem({ document, onOpen, t }) {
  const title = document.titleKey ? t(document.titleKey) : document.title;
  const text = document.textKey ? t(document.textKey) : t('certificate_file');
  const actionText = document.external ? t('open') : document.kind === 'PDF' ? t('download_pdf') : t('download_image');

  const open = () => {
    if (document.external) {
      window.open(document.source, '_blank', 'noopener,noreferrer');
      return;
    }
    onOpen({ ...document, title });
  };

  return (
    <ListItem
      link
      dividers
      chevronMaterial={false}
      title={title}
      subtitle={document.subtitle}
      text={text}
      media={
        <button
          className="document-thumbnail"
          type="button"
          aria-label={`${t('preview')}: ${title}`}
          onClick={(event) => {
            event.stopPropagation();
            open();
          }}
        >
          <img src={document.preview} alt="" />
          <span>{document.kind}</span>
        </button>
      }
      after={
        <Button
          small
          rounded
          className="download-button"
          onClick={(event) => {
            event.stopPropagation();
            if (document.external) {
              open();
              return;
            }
            downloadFile(document);
          }}
        >
          {actionText}
        </Button>
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
  const [toastOpened, setToastOpened] = useState(false);
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
    if (!toastOpened) return undefined;
    const timeout = window.setTimeout(() => setToastOpened(false), 2600);
    return () => window.clearTimeout(timeout);
  }, [toastOpened]);

  const shareUrl = useMemo(() => window.location.href, [section]);
  const navigate = (target) => window.location.assign(`${import.meta.env.BASE_URL}${target}/`);
  const handleSetLz = (event) => setLz(event.target.value);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      const area = window.document.createElement('textarea');
      area.value = shareUrl;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      window.document.body.append(area);
      area.select();
      window.document.execCommand('copy');
      area.remove();
    }
    setToastOpened(true);
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
            <h1>{pageTitle}</h1>
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
          <List strongIos outlineIos dividers className="documents-list">
            {documents.map((document) => (
              <DocumentListItem key={document.id} document={document} onOpen={setSelectedDocument} t={t} />
            ))}
          </List>
        </Block>

        <Block className="notice-block">
          <p>{t('notice')}</p>
        </Block>
      </Page>
      <Toast position="center" opened={toastOpened}>
        <div className="shrink">{t('link_copied')}</div>
      </Toast>
      <PreviewModal document={selectedDocument} onClose={() => setSelectedDocument(null)} t={t} />
    </App>
  );
}

createRoot(document.getElementById('root')).render(<AppContent />);
