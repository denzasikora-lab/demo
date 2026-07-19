import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { App, Block, BlockTitle, Button, List, ListItem, Navbar, Page } from 'konsta/react';
import './styles.css';

const documents = [
  {
    id: 'en-pdf',
    kind: 'PDF',
    title: 'Патент на английском',
    subtitle: 'Patent RU 2620986 C1',
    text: 'Официальный англоязычный перевод: Method for determining the thickness of a flat layer.',
    preview: '/demo/previews/patent-en-1.png',
    source: '/demo/patents/Patent_2620986C1_en.pdf',
    filename: 'Patent_2620986C1_en.pdf',
    downloadLabel: 'Скачать PDF',
  },
  {
    id: 'en-certificate',
    kind: 'PNG',
    title: 'Патентный сертификат',
    subtitle: 'English certificate · RU 2620986',
    text: 'Англоязычное изображение патентного сертификата с данными авторов и патентообладателя.',
    preview: '/demo/patents/BioTechPatent_en.png',
    source: '/demo/patents/BioTechPatent_en.png',
    filename: 'BioTechPatent_en.png',
    downloadLabel: 'Скачать PNG',
  },
  {
    id: 'ru-pdf',
    kind: 'PDF',
    title: 'Оригинал патента на русском',
    subtitle: 'RU 2620986 C1 · 30.05.2017',
    text: 'Оригинальный русскоязычный документ: описание изобретения к патенту.',
    preview: '/demo/previews/patent-ru-1.png',
    source: '/demo/patents/Patent_2620986C1_ru.pdf',
    filename: 'Patent_2620986C1_ru.pdf',
    downloadLabel: 'Скачать PDF',
  },
  {
    id: 'google-patents',
    kind: 'ONLINE',
    title: 'Google Patents',
    subtitle: 'RU2620986C1 · Google Patents',
    text: 'Открыть карточку патента в Google Patents: библиографические данные, описание и полный текст.',
    preview: '/demo/patents/BioTechPatent_en.png',
    source: 'https://patents.google.com/patent/RU2620986C1/en',
    downloadLabel: 'Открыть',
    external: true,
  },
];

function PreviewModal({ document, onClose }) {
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
            <p className="eyebrow">Предпросмотр</p>
            <h2 id="preview-title">{document.title}</h2>
          </div>
          <Button small rounded onClick={onClose} aria-label="Закрыть предпросмотр">
            Закрыть
          </Button>
        </div>
        <div className="preview-content">
          {isPdf ? (
            <iframe title={`Предпросмотр: ${document.title}`} src={document.source} />
          ) : (
            <img src={document.source} alt={`Предпросмотр: ${document.title}`} />
          )}
        </div>
      </section>
    </div>
  );
}

function AppContent() {
  const [selectedDocument, setSelectedDocument] = useState(null);

  const openDocument = (document) => {
    if (document.external) {
      window.open(document.source, '_blank', 'noopener,noreferrer');
      return;
    }
    setSelectedDocument(document);
  };

  return (
    <App theme="ios" className="k-ios patent-app">
      <Page className="patent-page">
        <Navbar title="Патент" />
        <header className="hero">
          <p className="eyebrow">Публикация · RU 2620986 C1</p>
          <h1>Способ определения толщины плоского слоя</h1>
          <p>
            Подборка оригинальных документов, перевода и официальной страницы патента.
          </p>
        </header>

        <BlockTitle className="documents-title">Материалы</BlockTitle>
        <Block className="documents-block">
          <List strongIos outlineIos className="documents-list">
            {documents.map((document) => (
              <ListItem
                key={document.id}
                link
                chevronMaterial={false}
                title={document.title}
                subtitle={document.subtitle}
                text={document.text}
                media={
                  <button
                    className="document-thumbnail"
                    type="button"
                    aria-label={`Открыть предпросмотр: ${document.title}`}
                    onClick={(event) => {
                      event.stopPropagation();
                      openDocument(document);
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
                        openDocument(document);
                        return;
                      }
                      const download = document.filename;
                      const anchor = Object.assign(window.document.createElement('a'), {
                        href: document.source,
                        download,
                      });
                      anchor.click();
                    }}
                  >
                    {document.downloadLabel}
                  </Button>
                }
                linkProps={{
                  href: document.external ? document.source : '#preview',
                  target: document.external ? '_blank' : undefined,
                  rel: document.external ? 'noreferrer' : undefined,
                  onClick: (event) => {
                    event.preventDefault();
                    openDocument(document);
                  },
                }}
              />
            ))}
          </List>
        </Block>

        <Block className="notice-block">
          <p>
            Нажмите на карточку, чтобы посмотреть документ. Кнопка справа запускает
            скачивание файла или открывает Google Patents в новой вкладке.
          </p>
        </Block>
      </Page>
      <PreviewModal document={selectedDocument} onClose={() => setSelectedDocument(null)} />
    </App>
  );
}

createRoot(document.getElementById('root')).render(<AppContent />);
