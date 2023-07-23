import React from 'react';
import { createRoot } from 'react-dom/client';

import ImageGallery from 'react-image-gallery'
import WhatsAppButton from './WhatsAppButton'; // Ajuste o caminho de acordo com a sua estrutura de pastas

// const PREFIX_URL = 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/';
const PREFIX_URL = './img/';


class App extends React.Component {

  constructor() {
    super();
    this.state = {
      showIndex: false,
      showBullets: true,
      infinite: true,
      showThumbnails: true,
      showFullscreenButton: true,
      showGalleryFullscreenButton: true,
      showPlayButton: true,
      showGalleryPlayButton: true,
      showNav: true,
      isRTL: false,
      slideDuration: 450,
      slideInterval: 2000,
      slideOnThumbnailOver: false,
      thumbnailPosition: 'bottom',
      showVideo: {},
      useWindowKeyDown: true,
    };

    this.images = [
      {
        thumbnail: `${PREFIX_URL}/fachada.jpg`,
        original: `${PREFIX_URL}/fachada.jpg`,
        embedUrl: 'https://www.youtube.com/embed/pFtt8qtC2kc?autoplay=1&showinfo=0',
        description: 'Visite sua nova moradia!',
        renderItem: this._renderVideo.bind(this)
      },
      // {
      //   original: `${PREFIX_URL}fachada.jpg`,
      //   thumbnail: `${PREFIX_URL}1t.jpg`,
      //   originalClass: 'featured-slide',
      //   thumbnailClass: 'featured-thumb',
      //   description: 'Custom class for slides & thumbnails',
      // },
    ].concat(this._getStaticImages());
  }

  _onImageClick(event) {
    console.debug('clicked on image', event.target, 'at index', this._imageGallery.getCurrentIndex());
  }

  _onImageLoad(event) {
    console.debug('loaded image', event.target.src);
  }

  _onSlide(index) {
    this._resetVideo();
    console.debug('slid to index', index);
  }

  _onPause(index) {
    console.debug('paused on index', index);
  }

  _onScreenChange(fullScreenElement) {
    console.debug('isFullScreen?', !!fullScreenElement);
  }

  _onPlay(index) {
    console.debug('playing from index', index);
  }

  _handleInputChange(state, event) {
    if (event.target.value > 0) {
      this.setState({ [state]: event.target.value });
    }
  }

  _handleCheckboxChange(state, event) {
    this.setState({ [state]: event.target.checked });
  }

  _handleThumbnailPositionChange(event) {
    this.setState({ thumbnailPosition: event.target.value });
  }

  _getStaticImages() {

    var imageNames = [
      "frente2.jpg",
      "sala.jpg",
      "sala_banheiro_cozinha.jpg",
      "sala_banheiro.jpg",
      "cozinha1.jpg",
      "cozinha2.jpg",
      "cozinha3.jpg",
      "cozinha_quintal.jpg",
      // "frente1.jpg",
      "quarto1.jpg",
      "quarto2.jpg",
      // "quarto3.jpg",
      "quarto4.jpg",
      // "quintal.jpg",
      "banheiro1.jpg",
      "banheiro5.jpg",
      "banheiro3.jpg",
      "banheiro4.jpg",
      "banheiro2.jpg",
      "frente_porta_aberta2.jpg",
      // "frente_porta_aberta1.jpg",
      "primeiro_andar.jpg",
      "fachada.jpg",


    ];


    let images = [];
    for (let i = 0; i < imageNames.length; i++) {
      images.push({
        original: `${PREFIX_URL}${imageNames[i]}`,
        thumbnail: `${PREFIX_URL}${imageNames[i]}`
      });
    }

    return images;
  }

  _resetVideo() {
    this.setState({ showVideo: {} });

    if (this.state.showPlayButton) {
      this.setState({ showGalleryPlayButton: true });
    }

    if (this.state.showFullscreenButton) {
      this.setState({ showGalleryFullscreenButton: true });
    }
  }

  _toggleShowVideo(url) {
    const showVideo = this.state;
    this.setState({
      showVideo: {
        ...showVideo,
        [url]: !showVideo[url]
      }
    });

    if (!showVideo[url]) {
      if (this.state.showPlayButton) {
        this.setState({ showGalleryPlayButton: false });
      }

      if (this.state.showFullscreenButton) {
        this.setState({ showGalleryFullscreenButton: false });
      }
    }
  }

  _renderVideo(item) {
    return (
      <div>
        {
          this.state.showVideo[item.embedUrl] ?
            <div className='video-wrapper'>
              <a
                className='close-video'
                onClick={this._toggleShowVideo.bind(this, item.embedUrl)}
              >
              </a>
              <iframe
                width='560'
                height='315'
                src={item.embedUrl}
                frameBorder='0'
                allowFullScreen
              >
              </iframe>
            </div>
            :
            <a onClick={this._toggleShowVideo.bind(this, item.embedUrl)}>
              <div className='play-button'></div>
              <img className='image-gallery-image' src={item.original} />
              {
                item.description &&
                <span
                  className='image-gallery-description'
                  style={{ right: '0', left: 'initial' }}
                >
                  {item.description}
                </span>
              }
            </a>
        }
      </div>
    );
  }

  render() {
    const message = "Olá! Estou interessado no apartamento para alugar.";
    const phoneNumber = "5511964500515"; // substitua pelo número de telefone desejado
    const phoneNumberView = "(11) 9 6450-0515"; // substitua pelo número de telefone desejado

    return (
      <section className='app'>
        <h1 class="app-title">Alugue o Seu Novo Lar em Itu!</h1>

        <ImageGallery
          ref={i => this._imageGallery = i}
          items={this.images}
          onClick={this._onImageClick.bind(this)}
          onImageLoad={this._onImageLoad}
          onSlide={this._onSlide.bind(this)}
          onPause={this._onPause.bind(this)}
          onScreenChange={this._onScreenChange.bind(this)}
          onPlay={this._onPlay.bind(this)}
          infinite={this.state.infinite}
          showBullets={this.state.showBullets}
          showFullscreenButton={this.state.showFullscreenButton && this.state.showGalleryFullscreenButton}
          showPlayButton={this.state.showPlayButton && this.state.showGalleryPlayButton}
          showThumbnails={this.state.showThumbnails}
          showIndex={this.state.showIndex}
          showNav={this.state.showNav}
          isRTL={this.state.isRTL}
          thumbnailPosition={this.state.thumbnailPosition}
          slideDuration={parseInt(this.state.slideDuration)}
          slideInterval={parseInt(this.state.slideInterval)}
          slideOnThumbnailOver={this.state.slideOnThumbnailOver}
          additionalClass="app-image-gallery"
          useWindowKeyDown={this.state.useWindowKeyDown}
        />

        <div className='app-sandbox'>

          <div className='app-sandbox-content'>
            <h2 className='app-header'>Settings</h2>

            <ul className='app-buttons'>
              <li>
                <div className='app-interval-input-group'>
                  <span className='app-interval-label'>Play Interval</span>
                  <input
                    className='app-interval-input'
                    type='text'
                    onChange={this._handleInputChange.bind(this, 'slideInterval')}
                    value={this.state.slideInterval} />
                </div>
              </li>

              <li>
                <div className='app-interval-input-group'>
                  <span className='app-interval-label'>Slide Duration</span>
                  <input
                    className='app-interval-input'
                    type='text'
                    onChange={this._handleInputChange.bind(this, 'slideDuration')}
                    value={this.state.slideDuration} />
                </div>
              </li>

              <li>
                <div className='app-interval-input-group'>
                  <span className='app-interval-label'>Thumbnail Bar Position</span>
                  <select
                    className='app-interval-input'
                    value={this.state.thumbnailPosition}
                    onChange={this._handleThumbnailPositionChange.bind(this)}
                  >
                    <option value='bottom'>Bottom</option>
                    <option value='top'>Top</option>
                    <option value='left'>Left</option>
                    <option value='right'>Right</option>
                  </select>
                </div>
              </li>
            </ul>

            <ul className='app-checkboxes'>
              <li>
                <input
                  id='infinite'
                  type='checkbox'
                  onChange={this._handleCheckboxChange.bind(this, 'infinite')}
                  checked={this.state.infinite} />
                <label htmlFor='infinite'>allow infinite sliding</label>
              </li>
              <li>
                <input
                  id='show_fullscreen'
                  type='checkbox'
                  onChange={this._handleCheckboxChange.bind(this, 'showFullscreenButton')}
                  checked={this.state.showFullscreenButton} />
                <label htmlFor='show_fullscreen'>show fullscreen button</label>
              </li>
              <li>
                <input
                  id='show_playbutton'
                  type='checkbox'
                  onChange={this._handleCheckboxChange.bind(this, 'showPlayButton')}
                  checked={this.state.showPlayButton} />
                <label htmlFor='show_playbutton'>show play button</label>
              </li>
              <li>
                <input
                  id='show_bullets'
                  type='checkbox'
                  onChange={this._handleCheckboxChange.bind(this, 'showBullets')}
                  checked={this.state.showBullets} />
                <label htmlFor='show_bullets'>show bullets</label>
              </li>
              <li>
                <input
                  id='show_thumbnails'
                  type='checkbox'
                  onChange={this._handleCheckboxChange.bind(this, 'showThumbnails')}
                  checked={this.state.showThumbnails} />
                <label htmlFor='show_thumbnails'>show thumbnails</label>
              </li>
              <li>
                <input
                  id='show_navigation'
                  type='checkbox'
                  onChange={this._handleCheckboxChange.bind(this, 'showNav')}
                  checked={this.state.showNav} />
                <label htmlFor='show_navigation'>show navigation</label>
              </li>
              <li>
                <input
                  id='show_index'
                  type='checkbox'
                  onChange={this._handleCheckboxChange.bind(this, 'showIndex')}
                  checked={this.state.showIndex} />
                <label htmlFor='show_index'>show index</label>
              </li>
              <li>
                <input
                  id='is_rtl'
                  type='checkbox'
                  onChange={this._handleCheckboxChange.bind(this, 'isRTL')}
                  checked={this.state.isRTL} />
                <label htmlFor='is_rtl'>is right to left</label>
              </li>
              <li>
                <input
                  id='slide_on_thumbnail_hover'
                  type='checkbox'
                  onChange={this._handleCheckboxChange.bind(this, 'slideOnThumbnailOver')}
                  checked={this.state.slideOnThumbnailOver} />
                <label htmlFor='slide_on_thumbnail_hover'>slide on mouse over thumbnails</label>
              </li>
              <li>
                <input
                  id='use_window_keydown'
                  type='checkbox'
                  onChange={this._handleCheckboxChange.bind(this, 'useWindowKeyDown')}
                  checked={this.state.useWindowKeyDown} />
                <label htmlFor='use_window_keydown'>use window keydown</label>
              </li>
            </ul>
          </div>

        </div>
        <div class="app-container">
          <p class="app-text">Apresentamos um apartamento aconchegante e bem localizado, pronto para você chamar de lar. Com um quarto com guarda-roupa, sala de estar confortável, cozinha com armárino e gabinete de pia e um banheiro equipado com gabinete e box. Este apartamento tem tudo o que você precisa para viver com conforto e estilo.</p>
          <p class="app-text">Mas o que realmente torna este apartamento especial são os benefícios inclusos. Você não precisa se preocupar com contas de água e gás - elas já estão incluídas no aluguel! Além disso, o IPTU também é por nossa conta. E para completar, você terá à sua disposição uma vaga de garagem, proporcionando segurança e comodidade para o seu veículo.</p>
          <p class="app-text">A localização é outro ponto forte deste imóvel. Situado próximo ao shopping, você terá fácil acesso a uma variedade de lojas, restaurantes e entretenimento. Além disso, a região é bem servida por transportes públicos, tornando o seu dia a dia ainda mais prático.</p>
          <p class="app-text app-highlight">Não perca esta oportunidade de viver em um lugar que oferece conforto, comodidade e uma excelente localização. Entre em contato conosco hoje mesmo e agende uma visita!</p>
          <WhatsAppButton phoneNumber={phoneNumber} phoneNumberView={phoneNumberView} message={message} />
        </div>
      </section>
    );
  }
}

export default App;

// const container = document.getElementById('root');
// const root = createRoot(container);
// root.render(<App />);
