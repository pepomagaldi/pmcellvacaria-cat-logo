'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowDown, ArrowUpRight, ShieldCheck, Sparkles, Sun, MapPin } from 'lucide-react';
import s from './Blindagem.module.css';
const contact = 'https://wa.me/5554996899213?text='+encodeURIComponent('Olá! Vi o site da blindagem NanoTitanium e quero consultar o valor para meu celular. Meu modelo é: ');
const chapters = [
  { label: '01 / NANO REVESTIMENTO', title: <>Invisível aos olhos.<br/><em>Presente no cuidado.</em></>, text: 'Uma aplicação sobre o vidro, com acabamento discreto para acompanhar o seu dia.' },
  { label: '02 / APLICAÇÃO', title: <>Cada detalhe.<br/><em>Uma nova camada.</em></>, text: 'A superfície é preparada e recebe o revestimento NanoTitanium com aplicação cuidadosa.' },
  { label: '03 / CURA UV', title: <>Luz que transforma.<br/><em>Cuidado que permanece.</em></>, text: 'Depois da aplicação, a cura com luz UV e o polimento completam o processo.' },
  { label: '04 / PRONTO PARA A ROTINA', title: <>Seu celular.<br/><em>Uma camada a mais.</em></>, text: 'Conheça a blindagem, tire suas dúvidas e descubra a opção para o seu aparelho.' }
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
      <div className={s.dropHeading}><p className={s.kicker}>O IMPREVISTO NÃO AVISA.</p><h2>Um instante.<br/><span>Muda tudo.</span></h2></div>
      <div className={s.dropLabels}><p data-label="fall">A queda começa.<small>Você controla o tempo. Continue rolando.</small></p><p data-label="slow">O tempo desacelera.<small>O cuidado começa antes do impacto.</small></p><p data-label="impact">Não espere acontecer.<small>Conheça a blindagem. Cuide do seu aparelho.</small></p></div>
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
    <header className={s.header}><a href="#" className={s.brand}><Image src="/brand/logo.webp" width={34} height={48} alt="PM Cell Vacaria"/><span>PM CELL<small>VACARIA</small></span></a><nav aria-label="Navegação principal"><a href="#experiencia">Tecnologia</a><a href="#queda">A queda</a><a href="#processo">Aplicação</a><a href="#duvidas">Dúvidas</a></nav><a className={s.smallCta} href={contact} target="_blank" rel="noopener noreferrer">Agendar <ArrowUpRight size={15}/></a></header>
    <main>
      <section className={s.intro}><div className={s.introMeta}><span>PM CELL APRESENTA</span><span>VACARIA / RS</span></div><p className={s.kicker}>BLINDAGEM NANOTITANIUM</p><h1>O próximo nível<br/>de <span>cuidado.</span></h1><p className={s.lead}>Uma nova camada para o vidro.<br/>Uma nova forma de cuidar do seu celular.</p><a className={s.explore} href="#experiencia">Role para descobrir <ArrowDown size={16}/></a><div className={s.heroOrb} aria-hidden="true"/><div className={s.introBottom}><span>NANO REVESTIMENTO + CURA UV</span><span>TECNOLOGIA APLICADA COM CUIDADO</span></div></section>
      <section ref={story} className={s.story} id="experiencia" aria-label="Conheça as etapas da blindagem">
        <div ref={scene} className={s.scene} data-chapter="0">
          <div className={s.sceneGlow} aria-hidden="true"/>
          <div className={s.chapterCopy}>{chapters.map((c,i)=><div className={s.chapter} data-index={i} key={c.label}><p className={s.kicker}>{c.label}</p><h2>{c.title}</h2><p>{c.text}</p></div>)}</div>
          <div className={s.deviceStage} aria-hidden="true"><div className={s.device}><div className={s.screen}><div className={s.island}/><div className={s.wallpaper}/><div className={s.screenType}>nano<span>titanium.</span><small>PM CELL / VACARIA</small></div><div className={s.coating}/><div className={s.uvLight}/><div className={s.glassShine}/></div><div className={s.sideButton}/></div><span className={s.deviceNote}>VISUALIZAÇÃO ILUSTRATIVA DO REVESTIMENTO</span></div>
          <div className={s.timeline}><span>NANOTITANIUM</span><div><i/></div><span>EXPLORE COM A ROLAGEM ↓</span></div>
        </div>
      </section>
      <DropExperience />
      <section className={s.statement} id="sobre"><p className={s.kicker}>PROTEÇÃO COMEÇA COM INFORMAÇÃO.</p><h2>Mais cuidado.<br/><span>Sem mudar a essência.</span></h2><div className={s.statementGrid}><p>A blindagem NanoTitanium é um revestimento aplicado sobre o vidro do aparelho. Conheça o processo e as condições de uso diretamente com quem faz a aplicação.</p><div><ShieldCheck size={28}/><h3>Cuidado extra para a superfície.</h3><p>A proposta é contribuir para a resistência a riscos no uso diário. O aparelho continua exigindo cuidado com quedas e impactos.</p></div></div></section>
      <section className={s.process} id="processo"><div className={s.sectionTop}><p className={s.kicker}>DA PREPARAÇÃO AO ACABAMENTO</p><span>01 — 04</span></div><h2>O cuidado está<br/>no processo inteiro.</h2><div className={s.steps}>{[{icon:Sparkles,title:'Preparar.',text:'Limpeza cuidadosa do vidro para receber a aplicação.'},{icon:ShieldCheck,title:'Aplicar.',text:'Distribuição do revestimento sobre a superfície preparada.'},{icon:Sun,title:'Curar.',text:'Etapa de cura com luz UV durante o procedimento.'},{icon:Sparkles,title:'Finalizar.',text:'Polimento e conferência do acabamento do aparelho.'}].map((step,i)=><article key={step.title}><div><span>0{i+1}</span><step.icon size={24}/></div><h3>{step.title}</h3><p>{step.text}</p></article>)}</div><p className={s.processNote}>Aplicação em aproximadamente 1 hora. O tempo pode variar conforme o aparelho.</p></section>
      <section className={s.realCase} id="aplicacoes" aria-labelledby="case-heading">
        <div className={s.caseCopy}>
          <p className={s.kicker}>APLICAÇÕES REAIS EM VACARIA</p>
          <h2 id="case-heading">Da tecnologia.<br/><span>Para a sua rotina.</span></h2>
          <p>Mais do que uma animação, a blindagem faz parte do nosso atendimento diário. Veja um exemplo de aplicação já realizada.</p>
          <a href="#agendar">Quero blindar meu aparelho <ArrowUpRight size={17}/></a>
        </div>
        <article className={s.caseCard}>
          <div className={s.caseCardTop}><span>REGISTRO DE ATENDIMENTO</span><span>PM CELL / VACARIA</span></div>
          <div className={s.caseDevice} aria-hidden="true"><span>14</span><i/></div>
          <div className={s.caseCardBottom}>
            <span className={s.casePill}>IPHONE 14</span>
            <h3>Blindagem no local da cliente.</h3>
            <p>Tela, traseira e lentes de câmera receberam o tratamento, com polimento e conferência do aparelho. Aplicação realizada no consultório da cliente em cerca de 50 minutos.</p>
            <small>Tempo e cobertura podem variar conforme o modelo e as condições do aparelho.</small>
          </div>
        </article>
      </section>
      <section className={s.faq} id="duvidas"><div><p className={s.kicker}>SEM MISTÉRIO</p><h2>Antes de<br/>blindar, entenda.</h2></div><div>{[['O celular fica inquebrável?','Não. A blindagem não elimina o risco de quebra e não é um seguro para a tela. Quedas e impactos ainda podem causar danos.'],['Posso continuar usando capinha?','Continue cuidando do aparelho. Consulte a PM Cell sobre o uso de capinha e a compatibilidade de películas com a aplicação.'],['A blindagem afeta a nitidez das câmeras?','A compatibilidade do tratamento nas lentes é avaliada conforme o modelo. Quando essa área é tratada, verificamos o acabamento e a imagem das câmeras após o procedimento. Consulte antes da aplicação.'],['Qual é a durabilidade?','A durabilidade estimada do tratamento é de 6 a 8 meses, podendo variar conforme o uso, a limpeza e os cuidados com o aparelho.'],['Quanto custa para o meu modelo?','O valor depende do aparelho e das áreas tratadas. Informe seu modelo no formulário abaixo para receber um orçamento personalizado.'],['Onde é feita a aplicação?','Atendemos em Vacaria, na assistência ou em domicílio mediante agendamento. Consulte a disponibilidade para seu endereço.']].map(([q,a])=><details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></section>
      <section className={s.contact} id="agendar"><p className={s.kicker}><MapPin size={14}/> VACARIA, RIO GRANDE DO SUL</p><h2>Seu celular merece<br/><span>esse cuidado.</span></h2><p>Informe seu modelo. O WhatsApp já abre com os dados do seu orçamento.</p>
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
