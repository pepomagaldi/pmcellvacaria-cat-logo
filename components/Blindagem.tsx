'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowDown, ArrowUpRight, ShieldCheck, Sparkles, Sun, MapPin } from 'lucide-react';
import s from './Blindagem.module.css';
const contact = 'https://wa.me/5554996899213?text='+encodeURIComponent('Olá! Vi o site da blindagem NanoTitanium e quero consultar o valor para meu celular. Meu modelo é: ');
const chapters = [
  { label: '01 / SOBRE O VIDRO', title: <>Não é uma<br/><em>película convencional.</em></>, text: 'O NanoTitanium é um revestimento aplicado nas superfícies de vidro compatíveis do aparelho. Sem uma película espessa por cima da tela.' },
  { label: '02 / PREPARAÇÃO', title: <>O resultado começa<br/><em>antes da aplicação.</em></>, text: 'Limpeza e preparação cuidadosas das áreas que vão receber o tratamento, conforme as características do modelo.' },
  { label: '03 / CURA UV', title: <>Aplicar. Curar.<br/><em>Conferir.</em></>, text: 'Após distribuir o revestimento, a etapa de cura com luz UV faz parte do procedimento NanoTitanium.' },
  { label: '04 / ACABAMENTO', title: <>De volta às mãos.<br/><em>Com tudo conferido.</em></>, text: 'Polimento, inspeção visual e verificação das áreas tratadas. Nas lentes compatíveis, também conferimos a imagem das câmeras.' }
];
function DropExperience() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const section = root.current, view = stage.current;
    if (!section || !view) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const clamp = (n: number) => Math.max(0, Math.min(1,n));
    let frame = 0;
    const update = () => {
      frame = 0;
      const range = section.offsetHeight - window.innerHeight;
      const p = media.matches ? 1 : clamp(-section.getBoundingClientRect().top / Math.max(1, range));
      // The long final approach gives the visitor direct slow-motion control.
      const approach = p < .42 ? Math.pow(p/.42, 1.65)*.73 : .73+clamp((p-.42)/.30)*.27;
      const impact = clamp((p-.72)/.14);
      const bounce = p > .72 && p < .87 ? Math.sin((p-.72)/.15*Math.PI)*3 : 0;
      view.style.setProperty('--fall-y', `${-17+approach*37-bounce}svh`);
      view.style.setProperty('--fall-x', `${-12+approach*20}deg`);
      view.style.setProperty('--fall-tilt', `${15+approach*57}deg`);
      view.style.setProperty('--fall-spin', `${-27+approach*49}deg`);
      view.style.setProperty('--fall-scale', `${.85+approach*.18}`);
      view.style.setProperty('--shadow', `${.12+approach*.68}`);
      view.style.setProperty('--ring-scale', `${.3+impact*2.6}`);
      view.style.setProperty('--ring-opacity', `${p >= .72 && p < .9 ? Math.sin(impact*Math.PI) : 0}`);
      view.style.setProperty('--drop-progress', `${p*100}%`);
      view.dataset.phase = p < .35 ? 'fall' : p < .72 ? 'slow' : 'impact';
    };
    const queue = () => { if (!frame) frame = requestAnimationFrame(update); };
    update(); window.addEventListener('scroll',queue,{passive:true}); window.addEventListener('resize',queue); media.addEventListener('change',queue);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll',queue); window.removeEventListener('resize',queue); media.removeEventListener('change',queue); };
  },[]);
  return <section ref={root} id="queda" className={s.dropStory} aria-label="Cena ilustrativa de queda controlada pela rolagem">
    <div ref={stage} className={s.dropScene} data-phase="fall">
      <div className={s.dropHeading}><p className={s.kicker}>O ENSAIO QUE VOCÊ CONTROLA.</p><h2>A queda acontece<br/><span>em um segundo.</span></h2></div>
      <div className={s.dropLabels}><p data-label="fall">Vai cair.<small>Role para acompanhar a cena em câmera lenta.</small></p><p data-label="slow">Agora, milésimo a milésimo.<small>Você controla a cena. Na vida real, não.</small></p><p data-label="impact">Sem promessa impossível.<small>O tratamento não elimina quebras ou danos por impacto.</small></p></div>
      <div className={s.dropWorld} aria-hidden="true">
        <div className={s.floor}><div className={s.floorGrid}/></div>
        <div className={s.groundShadow}/><div className={s.impactRing}/><div className={s.impactRingSecond}/>
        <div className={s.fallingPhone}><div className={s.phoneThickness}/><div className={s.screen}><div className={s.island}/><div className={s.wallpaper}/><div className={s.screenType}>nano<span>titanium.</span><small>PM CELL / VACARIA</small></div><div className={s.dropCoat}/><div className={s.glassShine}/></div></div>
      </div>
      <div className={s.dropFooter}><p>Demonstração ilustrativa. A blindagem não torna o aparelho inquebrável.<br/>Quedas e impactos ainda podem causar danos.</p><a href="#sobre">Conheça os cuidados <ArrowDown size={14}/></a><div className={s.dropProgress}/></div>
    </div>
  </section>;
}
export default function Blindagem() {
  const story = useRef<HTMLElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = story.current, stage = scene.current;
    if (!root || !stage) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const update = () => {
      frame = 0;
      const p = Math.max(0, Math.min(1, -root.getBoundingClientRect().top / (root.offsetHeight-window.innerHeight)));
      stage.style.setProperty('--turn', `${reduced.matches ? -12 : -24+p*46}deg`);
      stage.style.setProperty('--tilt', `${reduced.matches ? 0 : 12-Math.sin(p*Math.PI)*30}deg`);
      stage.style.setProperty('--zoom', `${reduced.matches ? 1 : 1+Math.sin(p*Math.PI)*0.15}`);
      stage.style.setProperty('--coat', `${Math.max(0,Math.min(1,(p-.16)*4))}`);
      stage.style.setProperty('--uv', `${Math.max(0,1-Math.abs(p-.65)*5)}`);
      stage.style.setProperty('--progress', `${p*100}%`);
      stage.dataset.chapter=String(Math.min(3,Math.floor(p*4)));
    };
    const schedule = () => { if (!frame) frame=requestAnimationFrame(update); };
    update(); window.addEventListener('scroll',schedule,{passive:true}); window.addEventListener('resize',schedule); reduced.addEventListener('change',schedule);
    return () => {cancelAnimationFrame(frame);window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);reduced.removeEventListener('change',schedule);};
  },[]);
  const [quoteModel, setQuoteModel] = useState('');
  const [quoteLocation, setQuoteLocation] = useState<'assistência' | 'domicílio'>('assistência');
  const quoteMessage = 'Olá! Vi o site da blindagem NanoTitanium da PM Cell Vacaria. Meu aparelho é ' +
    (quoteModel.trim() || '(modelo a informar)') +
    '. Quero consultar o valor e a disponibilidade para aplicação ' +
    (quoteLocation === 'domicílio' ? 'em domicílio' : 'na assistência') + '.';
  const quoteHref = 'https://wa.me/5554996899213?text=' + encodeURIComponent(quoteMessage);
  return <div className={s.site}>
    <a className="skip-link" href="#sobre">Pular apresentação</a>
    <header className={s.header}><a href="#inicio" className={s.brand}><Image src="/brand/logo.webp" width={34} height={48} alt="PM Cell Vacaria"/><span>PM CELL<small>VACARIA</small></span></a><nav aria-label="Navegação principal"><a href="#experiencia">O tratamento</a><a href="#queda">Queda simulada</a><a href="#aplicacoes">Caso real</a><a href="#duvidas">Dúvidas</a></nav><a className={s.smallCta} href="#agendar">Pedir orçamento <ArrowUpRight size={15}/></a></header>
    <main>
      <section className={s.intro} id="inicio">
        <div className={s.introMeta}><span>PM CELL / VACARIA — RS</span><span>APLICAÇÃO NANOTITANIUM / 2026</span></div>
        <div className={s.introCopy}>
          <p className={s.kicker}><span className={s.pulseDot}/> BLINDAGEM DE VIDRO · CURA UV</p>
          <h1>Não é<br/>película.<br/><span>É NanoTitanium.</span></h1>
          <p className={s.lead}>Blindagem aplicada diretamente no vidro do seu celular. Tela, traseira e lentes compatíveis. Sem precisar sair da sua rotina.</p>
          <div className={s.heroActions}><a href="#agendar" className={s.heroPrimary}>Quero blindar meu celular <ArrowUpRight size={19}/></a><a href="#experiencia" className={s.explore}>Ver como funciona <ArrowDown size={16}/></a></div>
          <div className={s.heroStats}><div><strong>50–60 <sup>MIN</sup></strong><small>tempo aproximado</small></div><div><strong>UV <sup>+</sup> NANO</strong><small>aplicação e cura</small></div><div><strong>VACARIA</strong><small>inclusive em domicílio*</small></div></div>
        </div>
        <div className={s.heroDevice} aria-hidden="true"><div className={s.heroEdge}><div className={s.heroScreen}><div className={s.heroIsland}/><div className={s.heroLens}/><span className={s.heroSmallMark}>PM CELL / NANO</span><span className={s.heroBigMark}>N.</span></div></div><div className={s.heroGlassPlane}/><div className={s.heroLightLine}/><span className={s.heroSpecLabel}>REVESTIMENTO / VISUALIZAÇÃO CONCEITUAL</span></div>
        <div className={s.introBottom}><span>*DOMICÍLIO MEDIANTE AGENDAMENTO</span><span>BLINDAGEM NÃO TORNA O APARELHO INQUEBRÁVEL</span></div>
      </section>
      <section className={s.serviceStrip} aria-label="Diferenciais da aplicação">
        <div><span>01 /</span><strong>NO SEU ENDEREÇO</strong><small>Aplicação também em domicílio, sob agendamento.</small></div>
        <div><span>02 /</span><strong>ATÉ AS LENTES</strong><small>Tratamento nas áreas compatíveis do aparelho.</small></div>
        <div><span>03 /</span><strong>SEM MISTÉRIO</strong><small>Processo, cuidados e limites explicados.</small></div>
      </section>
      <section ref={story} className={s.story} id="experiencia" aria-label="Conheça as etapas da blindagem">
        <div ref={scene} className={s.scene} data-chapter="0">
          <div className={s.sceneGlow} aria-hidden="true"/>
          <div className={s.chapterCopy}>{chapters.map((c,i)=><div className={s.chapter} data-index={i} key={c.label}><p className={s.kicker}>{c.label}</p><h2>{c.title}</h2><p>{c.text}</p></div>)}</div>
          <div className={s.deviceStage} aria-hidden="true"><div className={s.device}><div className={s.screen}><div className={s.island}/><div className={s.wallpaper}/><div className={s.screenType}>nano<span>titanium.</span><small>PM CELL / VACARIA</small></div><div className={s.coating}/><div className={s.uvLight}/><div className={s.glassShine}/></div><div className={s.sideButton}/></div><span className={s.deviceNote}>VISUALIZAÇÃO ILUSTRATIVA DO REVESTIMENTO</span></div>
          <div className={s.timeline}><span>NANOTITANIUM</span><div><i/></div><span>EXPLORE COM A ROLAGEM ↓</span></div>
        </div>
      </section>
      <DropExperience />
      <section className={s.statement} id="sobre"><p className={s.kicker}>TRANSPARÊNCIA FAZ PARTE DA APLICAÇÃO.</p><h2>Sem truque.<br/><span>Sem promessa impossível.</span></h2><div className={s.statementGrid}><div><p>A blindagem NanoTitanium é um tratamento de superfície para áreas de vidro compatíveis. O objetivo é acrescentar resistência a riscos do uso cotidiano, sem substituir os cuidados normais com o aparelho.</p><span className={s.honestyLine}>RECOMENDAÇÃO PM CELL / CONTINUE USANDO CAPINHA</span></div><div className={s.honestyCard}><ShieldCheck size={26}/><h3>O que a blindagem não faz?</h3><p>Não torna o celular inquebrável, não impede toda quebra por queda e não funciona como seguro para tela, traseira ou câmeras.</p></div></div></section>
      <section className={s.process} id="processo"><div className={s.sectionTop}><p className={s.kicker}>O PROCESSO NA PM CELL</p><span>04 ETAPAS / APROX. 1 HORA</span></div><h2>Do vidro limpo<br/>à conferência final.</h2><div className={s.steps}>{[{icon:Sparkles,title:'Limpeza.',text:'Preparação da tela, da traseira e das áreas compatíveis.'},{icon:ShieldCheck,title:'NanoTitanium.',text:'Revestimento distribuído nas superfícies selecionadas.'},{icon:Sun,title:'Cura UV.',text:'Exposição à luz UV como etapa do tratamento.'},{icon:Sparkles,title:'Polimento.',text:'Acabamento e conferência, incluindo a imagem das lentes quando tratadas.'}].map((step,i)=><article key={step.title}><div><span>0{i+1}</span><step.icon size={24}/></div><h3>{step.title}</h3><p>{step.text}</p></article>)}</div><p className={s.processNote}>A aplicação costuma levar cerca de 50 a 60 minutos. O tempo exato e as áreas tratadas dependem do modelo e das condições do aparelho.</p></section>
      <section className={s.realCase} id="aplicacoes" aria-labelledby="case-heading">
        <div className={s.caseCopy}>
          <p className={s.kicker}><span className={s.pulseDot}/> ATENDIMENTO REAL · 04.11.2026</p>
          <h2 id="case-heading">Um iPhone 14.<br/><span>Um consultório.</span><br/>50 minutos.</h2>
          <p>Em Vacaria, fizemos a aplicação diretamente no local de trabalho da cliente. Blindamos as áreas compatíveis, realizamos o polimento e conferimos as funções e a nitidez das câmeras.</p>
          <div className={s.caseTags}><span>TELA</span><span>TRASEIRA</span><span>LENTES</span><span>POLIMENTO</span></div>
          <a href="#agendar">Quero atendimento assim <ArrowUpRight size={17}/></a>
        </div>
        <article className={s.caseCard}>
          <div className={s.caseCardTop}><span>PM CELL / CASO REAL · IPHONE 14</span><span>VACARIA — RS</span></div>
          <div className={s.caseMetric} aria-label="Cerca de 50 minutos de aplicação"><span>APLICAÇÃO REALIZADA EM</span><div>50<span>MIN</span></div><p>no consultório da cliente</p></div>
          <div className={s.caseCardBottom}>
            <span className={s.casePill}>IPHONE 14 · BLINDAGEM NANOTITANIUM</span>
            <h3>Atendemos onde a rotina acontece.</h3>
            <p>Tela, traseira e lentes de câmera tratadas, com polimento e conferência final do aparelho.</p>
            <small>Registro descritivo de atendimento. A ilustração e os dados de tempo não constituem garantia contra quebra. Tempo e cobertura variam conforme o aparelho.</small>
          </div>
        </article>
      </section>
      <section className={s.faq} id="duvidas"><div><p className={s.kicker}>DÚVIDAS QUE OUVIMOS NO ATENDIMENTO</p><h2>Perguntas reais.<br/>Respostas diretas.</h2></div><div>{[['A blindagem tem garantia contra quebra?','Não. A aplicação não equivale a seguro nem cobre trincas ou quebras causadas por quedas e impactos. O aparelho continua sujeito a danos.'],['O celular fica inquebrável?','Não. A blindagem não elimina o risco de quebra nem transforma o vidro em material inquebrável. Quedas e impactos ainda podem causar danos.'],['Posso continuar usando capinha?','Continue cuidando do aparelho. Consulte a PM Cell sobre o uso de capinha e a compatibilidade de películas com a aplicação.'],['A blindagem afeta a nitidez das câmeras?','A compatibilidade do tratamento nas lentes é avaliada conforme o modelo. Quando essa área é tratada, verificamos o acabamento e a imagem das câmeras após o procedimento. Consulte antes da aplicação.'],['Qual é a durabilidade?','A durabilidade estimada do tratamento é de 6 a 8 meses, podendo variar conforme o uso, a limpeza e os cuidados com o aparelho.'],['Quanto custa para o meu modelo?','O valor depende do aparelho e das áreas tratadas. Informe seu modelo no formulário abaixo para receber um orçamento personalizado.'],['Onde é feita a aplicação?','Atendemos em Vacaria, na assistência ou em domicílio mediante agendamento. Consulte a disponibilidade para seu endereço.']].map(([q,a])=><details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></section>
      <section className={s.contact} id="agendar"><p className={s.kicker}><MapPin size={14}/> A PM CELL VAI ATÉ VOCÊ / VACARIA — RS</p><h2>Qual celular<br/><span>vamos blindar?</span></h2><p>Orçamento direto, sem cadastro. Informe o modelo e escolha onde quer ser atendido.</p>
        <div className={s.quotePanel}>
          <label htmlFor="quote-model">Qual é o modelo do seu celular?</label>
          <input id="quote-model" name="modelo" value={quoteModel} onChange={(event) => setQuoteModel(event.target.value)} placeholder="Ex.: iPhone 14, Galaxy S24, Redmi Note 13..." autoComplete="off" maxLength={90}/>
          <span className={s.quoteHelp}>Onde você prefere o atendimento?</span>
          <div className={s.quoteChoices} role="group" aria-label="Local de atendimento">
            <button type="button" className={quoteLocation === 'assistência' ? s.selected : ''} aria-pressed={quoteLocation === 'assistência'} onClick={() => setQuoteLocation('assistência')}>Na assistência</button>
            <button type="button" className={quoteLocation === 'domicílio' ? s.selected : ''} aria-pressed={quoteLocation === 'domicílio'} onClick={() => setQuoteLocation('domicílio')}>Em domicílio</button>
          </div>
          <a className={s.quoteSubmit} href={quoteHref} target="_blank" rel="noopener noreferrer">Solicitar orçamento pelo WhatsApp <ArrowUpRight size={20}/></a>
          <small>Sem compromisso. Valores e disponibilidade sob consulta.</small>
        </div>
        <small>Aplicação em cerca de 50 a 60 minutos, conforme o aparelho. Atendimento em Vacaria mediante agendamento.</small></section>
    </main>
    <a className={s.mobileContact} href="#agendar" aria-label="Ir ao orçamento da blindagem">Pedir orçamento <ArrowUpRight size={17}/></a>
    <footer className={s.footer}><span>PM CELL VACARIA © {new Date().getFullYear()}</span><a href="/catalogo">Catálogo de smartphones <ArrowUpRight size={13}/></a><span>TECNOLOGIA. PROXIMIDADE. CUIDADO.</span></footer>
  </div>;
}
