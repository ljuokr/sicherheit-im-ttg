(function(){
  'use strict';
  function $(s,r){ return (r||document).querySelector(s); }
  function $$(s,r){ return [].slice.call((r||document).querySelectorAll(s)); }
  function el(tag,cls,text){ var e=document.createElement(tag); if(cls) e.className=cls; if(text!=null) e.textContent=text; return e; }
  function kopie(node){
    var c=node.cloneNode(true);
    [c].concat($$('[id],[data-instr],[tabindex],[role],[aria-labelledby]',c)).forEach(function(x){
      ['id','data-instr','tabindex','role','aria-labelledby'].forEach(function(a){ x.removeAttribute(a); });
    });
    c.hidden=false; return c;
  }
  function mz(n,ein,mehr){ return n+' '+(n===1?ein:mehr); }

  var leiste=$('#leiste'), reg=$('#reg'), reg2=$('#reg2'), register=$('#register');
  var verfahren=$$('#verfahren section.verfahren');
  var VNAME={}; verfahren.forEach(function(s){ VNAME[s.id]=s.getAttribute('data-titel'); });
  var MAT={holz:'Holz',metall:'Metall',kunststoff:'Kunststoff',keramik:'Keramik, Glas, Stein',textil:'Textil'};
  var legende=$('#aufsicht .legende'), legQuelle=$('#aufsicht .legende + p.quelle');
  var LEG={}; $$('span',legende).forEach(function(sp){ LEG[sp.textContent.trim()]=sp.nextElementSibling.textContent; });

  // Höhe der haftenden Leiste für Sprungziele
  function hoehe(){ document.documentElement.style.setProperty('--hh',leiste.offsetHeight+'px'); }
  if(window.ResizeObserver) new ResizeObserver(hoehe).observe(leiste); hoehe();

  /* Plakat: Maschinen wie auf dem bfu-Plakat, gebaut aus den Tabellen der Verfahren */
  var mLeer=$('#leer');
  var ZUORDNUNG=/*ZUORDNUNG*/{};
  var KURZ={A:'selbstständig nach Einführung',B:'nur unter Aufsicht der Lehrperson',C:'nicht für Schülerinnen und Schüler'};
  var GRUPPEN=[
    [{titel:'Verbinden',sec:'verbinden'},{titel:'Trennen: schneiden, bohren, sägen',sec:'trennen',gruppe:'Schneiden, bohren, sägen'}],
    [{titel:'Trennen: schleifen',sec:'trennen',gruppe:'Schleifen'},{titel:'Oberflächenverändernde Verfahren',sec:'oberflaeche'},
     {titel:'Umformen',sec:'umformen'},{titel:'Maschinen nur für Lehrpersonen',sec:'lehrpersonen'}]
  ];
  function themaTitel(id){ var t=document.getElementById(id); return t?$('h3',t).textContent:id; }
  function punkte(k){
    var d=el('span','dots');
    k.forEach(function(K,i){ var p=el('span','dot '+K); p.setAttribute('aria-hidden','true'); d.appendChild(p); });
    d.appendChild(el('span','sr',k.map(function(K,i){ return 'Zyklus '+(i+1)+' '+K; }).join(', ')));
    return d;
  }
  (function(){
    var ziel=$('#plakat-ziel'), nr=0;
    GRUPPEN.forEach(function(spalte){
      var sp=el('div','p-spalte'), zk=el('div','p-zk'), zz=el('span','p-zyk');
      zk.setAttribute('aria-hidden','true'); zk.appendChild(el('p',null,'Zyklus'));
      ['1','2','3'].forEach(function(z){ zz.appendChild(el('span',null,z)); }); zk.appendChild(zz); sp.appendChild(zk);
      spalte.forEach(function(g){
        var sec=document.getElementById(g.sec), tab=$('table.mtab',sec), drin=!g.gruppe, rows=[];
        $$('tbody tr',tab).forEach(function(r){
          if(r.classList.contains('gruppe')){ drin=!g.gruppe || r.textContent.trim()===g.gruppe; return; }
          if(drin) rows.push({name:r.cells[0].textContent.trim(),k:[1,2,3].map(function(i){ return r.cells[i].textContent.trim(); })});
        });
        var box=el('section','p-gruppe'), kopf=el('div','p-kopf'), h=el('h3'), a=el('a',null,g.titel);
        a.href='#'+g.sec; h.appendChild(a); kopf.appendChild(h);
        box.appendChild(kopf);
        var ul=el('ul','p-liste');
        rows.forEach(function(r){
          var li=el('li'), b=el('button','m-zeile'), kid='karte-'+(++nr);
          b.type='button'; b.setAttribute('aria-expanded','false'); b.setAttribute('aria-controls',kid);
          b.appendChild(punkte(r.k)); b.appendChild(el('span','m-name',r.name)); b.setAttribute('aria-label',r.name+', '+r.k.map(function(K,i){return 'Zyklus '+(i+1)+': '+K;}).join(', '));
          var k=el('div','karte'); k.id=kid; k.hidden=true;
          var dl=el('dl','kz');
          r.k.forEach(function(K,i){
            var row=el('div'); row.appendChild(el('dt',null,'Zyklus '+(i+1)));
            var dd=el('dd'); var p=el('span','dot '+K); p.setAttribute('aria-hidden','true'); dd.appendChild(p);
            dd.appendChild(el('span','sr',K+', ')); dd.appendChild(document.createTextNode(KURZ[K])); row.appendChild(dd); dl.appendChild(row);
          });
          k.appendChild(dl);
          var z=ZUORDNUNG[r.name]||{};
          if(z.hinweis&&z.hinweis.length){
            var hw=el('ul','k-hinweise');
            z.hinweis.forEach(function(h){
              var x=el('li',null,h[0]+' ');
              if(h[1]){ var q=el('a','ql',h[1]); var pf=el('span',null,'\u00a0\u2197'); pf.setAttribute('aria-hidden','true'); q.appendChild(pf); q.href=h[2]; x.appendChild(q); }
              else x.appendChild(el('span','k-eigen','Hinweis dieser Seite'));
              hw.appendChild(x);
            });
            k.appendChild(hw);
          }
          if(z.themen&&z.themen.length){
            k.appendChild(el('p','k-titel','Regeln dazu'));
            var tl=el('ul','k-links');
            z.themen.forEach(function(id){ var x=el('li'), l=el('a',null,themaTitel(id)); l.href='#'+id; x.appendChild(l); tl.appendChild(x); });
            k.appendChild(tl);
          }
          var extra=[];
          (z.video||[]).forEach(function(v){ var l=el('a',null,'Video: '+v[0]); l.href=v[1]; extra.push(l); });
          (z.links||[]).forEach(function(v){ var l=el('a',null,v[0]); l.href=v[1]; extra.push(l); });
          if(extra.length){
            var ex=el('p','k-extra'); extra.forEach(function(l,i){ if(i) ex.appendChild(document.createTextNode(' · ')); ex.appendChild(l); });
            k.appendChild(ex);
          }
          if(r.name.indexOf('*')>-1){
            $$(':scope > ul li',sec).forEach(function(f){
              var t=f.textContent.trim(), stern=r.name.indexOf('**')>-1?'**':'*';
              if(t.indexOf(stern+' ')===0) k.appendChild(el('p','k-fuss',t));
            });
          }
          if(!z.themen && !z.video && !z.hinweis && !z.links) k.appendChild(el('p','k-fuss','Zu dieser Maschine nennen die Quellen keine eigenen Regeln. Es gelten die Grundregeln im Fachraum.'));
          b.addEventListener('click',function(){
            var offen=b.getAttribute('aria-expanded')!=='true';
            b.setAttribute('aria-expanded',offen?'true':'false'); k.hidden=!offen;
          });
          li.appendChild(b); li.appendChild(k); ul.appendChild(li);
        });
        box.appendChild(ul); sp.appendChild(box);
      });
      ziel.appendChild(sp);
    });
    // Legende wie auf dem Plakat
    var lg=$('#p-legende');
    ['A','B','C'].forEach(function(K){
      var d=el('div','p-leg'), p=el('span','dot '+K); p.setAttribute('aria-hidden','true');
      var t=el('p'); t.appendChild(el('b',null,K+' ')); t.appendChild(document.createTextNode(LEG[K]));
      d.appendChild(p); d.appendChild(t); lg.appendChild(d);
    });
  })();

  /* Register */
  var haupt=$$('#tl-haupt [role=tab]');
  var SUBS={}; $$('#reg2 [role=tablist]').forEach(function(l){ SUBS[l.getAttribute('data-haupt')]=l; });
  var letzte={};
  $$('[role=tab]').forEach(function(t){
    var p=document.getElementById(t.getAttribute('aria-controls'));
    p.setAttribute('role','tabpanel'); p.setAttribute('aria-labelledby',t.id); p.tabIndex=-1;
  });
  function zeige(hid,sid,hash){
    haupt.forEach(function(t){
      var on=t.getAttribute('aria-controls')===hid;
      t.setAttribute('aria-selected',on?'true':'false'); t.tabIndex=on?0:-1;
      document.getElementById(t.getAttribute('aria-controls')).hidden=!on;
    });
    Object.keys(SUBS).forEach(function(k){ SUBS[k].hidden=(k!==hid); });
    reg2.hidden=!SUBS[hid];
    if(SUBS[hid]){
      var tabs=$$('[role=tab]',SUBS[hid]);
      if(!sid) sid=letzte[hid]||tabs[0].getAttribute('aria-controls');
      tabs.forEach(function(t){
        var on=t.getAttribute('aria-controls')===sid;
        t.setAttribute('aria-selected',on?'true':'false'); t.tabIndex=on?0:-1;
        document.getElementById(t.getAttribute('aria-controls')).hidden=!on;
      });
      letzte[hid]=sid;
    } else sid=null;
    try{ history.replaceState(null,'','#'+(hash||sid||hid)); }catch(e){}
    hoehe();
  }
  function nachOben(){
    var y=document.getElementById('inhalt').getBoundingClientRect().top+window.pageYOffset-leiste.offsetHeight-16;
    if(window.pageYOffset>y) window.scrollTo(0,Math.max(0,y));
  }
  function tastatur(list){
    list.addEventListener('keydown',function(e){
      var tabs=$$('[role=tab]',list), i=tabs.indexOf(document.activeElement), n=null;
      if(i<0) return;
      if(e.key==='ArrowRight') n=(i+1)%tabs.length;
      else if(e.key==='ArrowLeft') n=(i-1+tabs.length)%tabs.length;
      else if(e.key==='Home') n=0;
      else if(e.key==='End') n=tabs.length-1;
      if(n===null) return;
      e.preventDefault(); tabs[n].focus(); tabs[n].click();
    });
  }
  haupt.forEach(function(t){ t.addEventListener('click',function(){ zeige(t.getAttribute('aria-controls')); nachOben(); }); });
  Object.keys(SUBS).forEach(function(k){
    tastatur(SUBS[k]);
    $$('[role=tab]',SUBS[k]).forEach(function(t){ t.addEventListener('click',function(){ zeige(k,t.getAttribute('aria-controls')); nachOben(); }); });
  });
  tastatur($('#tl-haupt'));

  /* Finder */
  var form=$('#finder'), fv={value:''}, fm={value:''}, fz={value:''}, fq=$('#f-q'), tlHaupt=$('#tl-haupt');
  var erg=$('#ergebnis'), titel=$('#erg-titel'), status=$('#erg-status'), inhalt=$('#erg-inhalt');
  var warAktiv=false;

  function zeilen(sec,q){
    var tab=$('table.mtab',sec), out=[]; if(!tab) return out;
    $$('tbody tr',tab).forEach(function(r){
      if(r.classList.contains('gruppe')) return;
      var name=r.cells[0].textContent;
      if(q && name.toLowerCase().indexOf(q)<0) return;
      out.push({name:name,k:[r.cells[1].textContent.trim(),r.cells[2].textContent.trim(),r.cells[3].textContent.trim()]});
    });
    return out;
  }

  function render(){
    var s={v:fv.value,m:fm.value,z:fz.value,q:fq.value.trim()}, q=s.q.toLowerCase();
    var aktiv=!!(s.v||s.m||s.z||q);
    erg.hidden=!aktiv; register.hidden=aktiv; tlHaupt.hidden=aktiv;
    var teile=[]; if(s.v) teile.push(VNAME[s.v]); if(s.m) teile.push(MAT[s.m]); if(s.z) teile.push('Zyklus '+s.z); if(q) teile.push('«'+s.q+'»');
    if(!aktiv){ inhalt.textContent=''; status.textContent=''; if(warAktiv){ warAktiv=false; hoehe(); } return; }
    if(!warAktiv){ warAktiv=true; hoehe(); nachOben(); }
    titel.textContent='Ergebnis für '+teile.join(' · ');
    inhalt.textContent='';
    var n={mas:0,A:0,B:0,C:0,th:0,vb:0}, mitTabelle=false;
    var wantTab=!!(s.v||s.z||q), wantTh=!!(s.v||s.m||q);

    verfahren.forEach(function(sec){
      if(s.v && s.v!==sec.id) return;
      var box=el('section','erg-v'), da=false;
      box.appendChild(el('h3',null,VNAME[sec.id]));
      if(s.v){ var ip=$(':scope > p:not(.quelle):not(.keine)',sec); if(ip) box.appendChild(kopie(ip)); }
      if(wantTab){
        var rs=zeilen(sec,q);
        if(rs.length){
          da=true; mitTabelle=true; n.mas+=rs.length;
          box.appendChild(el('p','blocktitel','Maschinen'));
          if(s.z){
            var kats=el('div','kats');
            ['A','B','C'].forEach(function(K){
              var liste=rs.filter(function(r){ return r.k[s.z-1]===K; });
              if(!liste.length) return; n[K]+=liste.length;
              var kat=el('div','kat '+K), b=el('div','kat-b',K), ki=el('div','kat-i');
              b.setAttribute('aria-hidden','true');
              ki.appendChild(el('p',null,LEG[K]));
              var ul=el('ul'); ul.setAttribute('aria-label','Kategorie '+K+', '+mz(liste.length,'Maschine','Maschinen'));
              liste.forEach(function(r){ ul.appendChild(el('li',null,r.name)); });
              ki.appendChild(ul); kat.appendChild(b); kat.appendChild(ki); kats.appendChild(kat);
            });
            box.appendChild(kats);
          } else {
            var t=kopie($('.wrap',sec)), namen=rs.map(function(r){ return r.name; }), grp=null, grpHit=false;
            $$('tbody tr',t).forEach(function(r){
              if(r.classList.contains('gruppe')){ if(grp) grp.hidden=!grpHit; grp=r; grpHit=false; return; }
              var hit=namen.indexOf(r.cells[0].textContent)>-1; r.hidden=!hit; if(hit) grpHit=true;
            });
            if(grp) grp.hidden=!grpHit;
            box.appendChild(t);
          }
          if(rs.some(function(r){ return r.name.indexOf('*')>-1; })) $$(':scope > ul',sec).forEach(function(u){ box.appendChild(kopie(u)); });
          var pq=$(':scope > p.quelle',sec); if(pq) box.appendChild(kopie(pq));
        }
      }
      if(wantTh){
        var th=$$('.thema',sec).filter(function(t){
          var tg=t.getAttribute('data-mat').split(' ');
          if(s.m && tg.indexOf('alle')<0 && tg.indexOf(s.m)<0) return false;
          if(q && t.textContent.toLowerCase().indexOf(q)<0) return false;
          return true;
        });
        var spezifisch=s.m && th.some(function(t){ return t.getAttribute('data-mat').split(' ').indexOf(s.m)>-1; });
        if(th.length){
          da=true;
          box.appendChild(el('p','blocktitel','Regeln zu den Stoffen'));
          th.forEach(function(t){ var c=kopie(t); $$('details',c).forEach(function(d){ d.open=true; }); n.th++; n.vb+=$$('li.verbot',c).length; box.appendChild(c); });
        }
        if(s.m && !q && !spezifisch && (s.v || da)){ var k=$('.keine',sec); if(k) box.appendChild(kopie(k)); }
      }
      if(s.v && !da && !q){ var fq2=$(':scope > p.quelle',sec); if(fq2 && !$('.quelle',box)) box.appendChild(kopie(fq2)); da=true; }
      if(da) inhalt.appendChild(box);
    });

    // Suche auch in den übrigen Registern: Treffer nach Abschnitt gruppiert, mit Link zum Abschnitt
    var weitere=0;
    if(q){
      ['grundlage','matrix','fachraum','unterricht','kantone','recht','quellen'].forEach(function(pid){
        var kopf=null, gruppen=[], akt=null;
        $$('h2,h3,li,p:not(.quelle):not(.g-k):not(.g-mehr),tr',document.getElementById(pid)).forEach(function(x){
          if(x.closest('.rand')) return;
          if(/^H[23]$/.test(x.tagName)){ kopf=x; akt=null; if(x.textContent.toLowerCase().indexOf(q)>-1){ akt={kopf:x,treffer:[]}; gruppen.push(akt); } return; }
          if(x.tagName==='P' && x.closest('li,td')) return;
          if(x.textContent.toLowerCase().indexOf(q)<0) return;
          if(!akt){ akt={kopf:kopf,treffer:[]}; gruppen.push(akt); }
          akt.treffer.push(x);
        });
        weitere+=gruppen.length;
        gruppen.forEach(function(g){
          var box=el('section','erg-v'), h=el('h3'), ziel=g.kopf&&(g.kopf.id?g.kopf:g.kopf.closest('[id]'));
          var titel=g.kopf?g.kopf.textContent:document.getElementById('t-'+pid).textContent;
          if(ziel){ var l=el('a',null,titel); l.href='#'+ziel.id; h.appendChild(l); } else h.textContent=titel;
          box.appendChild(h);
          if(g.treffer.length){
            var ul=el('ul');
            g.treffer.forEach(function(x){ ul.appendChild(el('li',null,x.textContent.replace(/\s+/g,' ').trim())); });
            box.appendChild(ul);
          }
          inhalt.appendChild(box);
        });
      });
    }

    if(mitTabelle){
      if(!s.z) inhalt.insertBefore(kopie(legende),inhalt.firstChild);
      var mq=kopie(legQuelle); mq.insertBefore(document.createTextNode('Einteilung A, B, C: '),mq.firstChild); inhalt.appendChild(mq);
    }
    if(!inhalt.firstChild){
      var l=el('div','leer'); l.appendChild(el('p',null,'Keine Treffer. Ein kürzeres Wort oder eine andere Schreibweise versuchen, z. B. «Säge» statt «Stichsägen».'));
      if(q) l.appendChild(kopie(mLeer));
      inhalt.appendChild(l);
    }
    var tx=[];
    if(n.mas){ var t2=mz(n.mas,'Maschine','Maschinen'); if(s.z) t2+=' ('+n.A+' A, '+n.B+' B, '+n.C+' C)'; tx.push(t2); }
    if(n.th) tx.push(mz(n.th,'Thema','Themen'));
    if(n.vb) tx.push(mz(n.vb,'Warnpunkt','Warnpunkte'));
    if(weitere) tx.push(mz(weitere,'Abschnitt in anderen Registern','Abschnitte in anderen Registern'));
    status.textContent=tx.length?tx.join(', ')+'.':'Keine Treffer.';
  }

  function beenden(){ form.reset(); render(); }
  var timer;
  form.addEventListener('change',function(e){ if(e.target.tagName==='SELECT') render(); });
  fq.addEventListener('input',function(){ clearTimeout(timer); timer=setTimeout(render,200); });
  form.addEventListener('submit',function(e){ e.preventDefault(); render(); });
  form.addEventListener('reset',function(){ setTimeout(render,0); });

  $('#zurueck').addEventListener('click',function(){
    beenden(); var t=$('#tl-haupt [aria-selected=true]'); if(t) t.focus();
  });

  /* Begriffe: erstes Vorkommen je Abschnitt antippbar, Karte als Popover */
  (function(){
    var begriffe=$$('section.begriff'); if(!begriffe.length) return;
    var woerter=[];
    begriffe.forEach(function(b){ (b.getAttribute('data-wort')||'').split('|').forEach(function(w){ if(w) woerter.push({w:w,id:b.id}); }); });
    woerter.sort(function(a,b){ return b.w.length-a.w.length; });
    var esc=function(s){ return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'); };
    var muster=new RegExp('(^|[^\\wäöüÄÖÜ\u00df-])('+woerter.map(function(x){ return esc(x.w); }).join('|')+')(?![\\wäöüÄÖÜ\u00df-])');
    var idVon={}; woerter.forEach(function(x){ idVon[x.w]=x.id; });
    // Abschnitte, in denen je Begriff nur das erste Vorkommen verlinkt wird
    var bloecke=$$('#register .thema, #register .sub, #grundlage, #verfahren > .text > section:not(.verfahren), #matrix .mat-teil, #fachraum, #unterricht, #kantone, #recht, #quellen');
    var NICHT=['A','BUTTON','H2','H3','H4','TH','FIGCAPTION','LABEL','OPTION','SCRIPT','STYLE'];
    bloecke.forEach(function(blk){
      if(blk.closest('.begriff')) return;
      var gesehen={};
      var walker=document.createTreeWalker(blk,NodeFilter.SHOW_TEXT,{acceptNode:function(n){
        var p=n.parentNode;
        while(p && p!==blk){ if(NICHT.indexOf(p.tagName)>-1 || (p.classList && (p.classList.contains('quelle')||p.classList.contains('begriff')||p.classList.contains('vb')||p.classList.contains('uebersicht')||p.classList.contains('lernort')))) return NodeFilter.FILTER_REJECT; p=p.parentNode; }
        return NodeFilter.FILTER_ACCEPT;
      }});
      var knoten=[]; while(walker.nextNode()) knoten.push(walker.currentNode);
      knoten.forEach(function(n){
        var rest=n, m;
        while(rest && (m=muster.exec(rest.nodeValue))){
          var wort=m[2], id=idVon[wort];
          var start=m.index+m[1].length;
          if(gesehen[id] || blk.closest('#'+id)){
            // schon verlinkt: hinter dem Treffer weitersuchen
            var weiter=rest.splitText(start+wort.length); rest=weiter; continue;
          }
          gesehen[id]=true;
          var vor=rest, treffer=vor.splitText(start), nach=treffer.splitText(wort.length);
          var b=el('a','b-wort',wort); b.href='#'+id; b.setAttribute('data-b',id); b.setAttribute('aria-haspopup','dialog'); b.setAttribute('aria-expanded','false');
          treffer.parentNode.replaceChild(b,treffer);
          rest=nach;
        }
      });
    });
    var pop=el('div','b-pop'); pop.id='b-pop'; pop.setAttribute('role','dialog'); pop.setAttribute('aria-modal','false'); pop.hidden=true;
    document.body.appendChild(pop);
    var offenVon=null;
    function schliessen(){ if(pop.hidden) return; pop.hidden=true; if(offenVon){ offenVon.setAttribute('aria-expanded','false'); offenVon.focus({preventScroll:true}); } offenVon=null; }
    var perHover=false;
    function oeffnen(btn,hover){
      var quelle=document.getElementById(btn.getAttribute('data-b')); if(!quelle) return;
      pop.textContent='';
      var kopf=el('div','b-pop-kopf'), t=el('p','b-pop-titel',$('h3',quelle).textContent), x=el('button','b-zu','Schliessen'); x.type='button';
      x.addEventListener('click',schliessen); kopf.appendChild(t); kopf.appendChild(x); pop.appendChild(kopf);
      var inh=kopie(quelle); var h=$('h3',inh); if(h) h.remove(); inh.className='b-pop-inhalt';
      $$('.b-wort',inh).forEach(function(w){ w.replaceWith(document.createTextNode(w.textContent)); });
      pop.appendChild(inh);
      var alle=el('p','b-pop-alle'), a=el('a',null,'Alle Begriffe'); a.href='#begriffe'; a.addEventListener('click',function(){ schliessen(); }); alle.appendChild(a); pop.appendChild(alle);
      pop.setAttribute('aria-label',t.textContent);
      pop.hidden=false; offenVon=btn; btn.setAttribute('aria-expanded','true');
      // auf breiten Bildschirmen neben dem Wort, sonst als Blatt unten
      if(window.innerWidth>=700){
        var r=btn.getBoundingClientRect(), w=Math.min(26*16,window.innerWidth-32);
        var left=Math.max(16,Math.min(r.left,window.innerWidth-w-16));
        pop.style.left=left+'px'; pop.style.width=w+'px';
        // Platz zwischen haftender Leiste und Fensterrand: Karte dort, wo mehr Raum ist, notfalls mit eigener Bildlaufleiste
        var oben=leiste.getBoundingClientRect().bottom+8, unten=window.innerHeight-8;
        var platzU=unten-(r.bottom+8), platzO=(r.top-8)-oben;
        pop.style.maxHeight=''; var ph=pop.getBoundingClientRect().height, top;
        if(ph<=platzU || platzU>=platzO){ top=r.bottom+8; if(ph>platzU) pop.style.maxHeight=Math.max(160,platzU)+'px'; }
        else { if(ph>platzO) pop.style.maxHeight=Math.max(160,platzO)+'px'; ph=pop.getBoundingClientRect().height; top=r.top-8-ph; }
        pop.style.top=(top+window.pageYOffset)+'px'; pop.style.left=(left+window.pageXOffset)+'px';
      } else { pop.style.left=''; pop.style.top=''; pop.style.width=''; pop.style.maxHeight=''; }
      perHover=!!hover; if(!hover) x.focus({preventScroll:true});
    }
    document.addEventListener('click',function(e){
      var b=e.target.closest('.b-wort');
      if(b){ e.preventDefault(); e.stopImmediatePropagation(); if(offenVon===b && perHover){ perHover=false; return; } if(offenVon===b) schliessen(); else oeffnen(b); return; }
      if(!pop.hidden && !pop.contains(e.target)) schliessen();
    });
    document.addEventListener('keydown',function(e){ if(e.key==='Escape') schliessen(); });
    // Mit Maus: nach einer halben Sekunde über dem Begriff öffnen, beim Verlassen wieder schliessen
    if(window.matchMedia && window.matchMedia('(hover:hover)').matches){
      var tAuf=null, tZu=null;
      function spaeterZu(){ clearTimeout(tZu); tZu=setTimeout(function(){ if(perHover) { pop.hidden=true; if(offenVon) offenVon.setAttribute('aria-expanded','false'); offenVon=null; perHover=false; } },300); }
      document.addEventListener('mouseover',function(e){
        var b=e.target.closest('.b-wort');
        if(b){ clearTimeout(tZu); if(offenVon!==b){ clearTimeout(tAuf); tAuf=setTimeout(function(){ oeffnen(b,true); },500); } return; }
        if(pop.contains(e.target)){ clearTimeout(tZu); return; }
      });
      document.addEventListener('mouseout',function(e){
        var b=e.target.closest('.b-wort'), nach=e.relatedTarget;
        if(b && !(nach && (b.contains(nach)||pop.contains(nach)))){ clearTimeout(tAuf); spaeterZu(); }
        if(pop.contains(e.target) && !(nach && (pop.contains(nach)||(offenVon && offenVon.contains(nach))))) spaeterZu();
      });
    }
  })();

  /* Sprungziele: einfache Anker öffnen das passende Register */
  function gehe(id,fokus){
    var z=id && document.getElementById(id);
    if(!z || erg.contains(z) || leiste.contains(z)) return false;
    var panel=z.closest('.panel'); if(!panel) return false;
    if(!erg.hidden) beenden();
    var sub=z.closest('.sub'), auf=z.closest('details')||z.querySelector(':scope > details');
    if(auf) auf.open=true;
    var aus=z.closest('details'); if(aus && aus.parentNode) { var ob=aus.parentNode.closest('details'); if(ob) ob.open=true; }
    zeige(panel.id,sub?sub.id:null,id);
    if(z===panel||z===sub) nachOben(); else z.scrollIntoView();
    if(fokus){ if(!z.hasAttribute('tabindex')) z.setAttribute('tabindex','-1'); z.focus({preventScroll:true}); }
    return true;
  }
  document.addEventListener('click',function(e){
    var a=e.target.closest('a[href^="#"]'); if(!a) return;
    if(gehe(decodeURIComponent(a.getAttribute('href').slice(1)),true)) e.preventDefault();
  });
  window.addEventListener('hashchange',function(){ gehe(decodeURIComponent(location.hash.slice(1))); });

  render();
  // Links, die in ein anderes Register führen, mit dem Registernamen kennzeichnen
  $$('.panel .text a[href^="#"]').forEach(function(a){
    if(a.closest('#grundlage,.rand,.sprung,.gruppen,.ql,.b-wort,.plakat,.karte,nav,.psa-bezug,.quelle')) return;
    var z=document.getElementById(a.getAttribute('href').slice(1)), von=a.closest('.panel'), nach=z&&z.closest('.panel');
    if(!nach||!von||nach===von) return;
    if(a.textContent.trim()===(document.getElementById('t-'+nach.id)||{}).textContent) return;
    var t=document.getElementById('t-'+nach.id); if(!t) return;
    a.appendChild(el('span','reg-hin',' (Register '+t.textContent.trim()+')'));
  });
  if(!gehe(decodeURIComponent(location.hash.slice(1)))){
    var h=location.hash; zeige('grundlage');
    if(!h){ try{ history.replaceState(null,'',location.pathname+location.search); }catch(e){} }
  }
})();

/* Themen und Verfahren öffnen sich in einem Fenster statt in der langen Liste */
(function(){
  'use strict';
  var f=document.createElement('aside'); f.className='fenster'; f.id='fenster'; f.hidden=true; f.tabIndex=-1;
  f.setAttribute('role','dialog'); f.setAttribute('aria-labelledby','f-titel');
  f.innerHTML='<div class="f-kopf"><div><p class="f-art" id="f-art"></p><h2 id="f-titel"></h2><p class="f-meta" id="f-meta"></p></div><button type="button" class="knopf" id="f-zu">Schliessen</button></div><div class="f-in" id="f-in"></div>';
  document.body.appendChild(f);
  var fin=document.getElementById('f-in'), ausloeser=null;
  function ohneIds(n){ if(!n.querySelectorAll) return n; n.removeAttribute('id'); [].forEach.call(n.querySelectorAll('[id]'),function(x){ x.removeAttribute('id'); }); return n; }
  function oeffne(z,von){
    var verf=z.matches('section.verfahren')?z:z.closest('section.verfahren');
    var art=document.getElementById('f-art'), titel=document.getElementById('f-titel'), meta=document.getElementById('f-meta');
    fin.textContent='';
    if(z.matches('section.thema')){
      var d=z.querySelector('details.thema-d'), m=z.querySelector('.t-meta');
      art.textContent=verf?verf.getAttribute('data-titel'):'';
      titel.textContent=z.querySelector('h3').textContent;
      meta.innerHTML=m?m.innerHTML:'';
      [].forEach.call(d.childNodes,function(c){ if(c.nodeName!=='SUMMARY') fin.appendChild(ohneIds(c.cloneNode(true))); });
    } else if(z.matches('th.mx-zeile')){
      // Material: nur was dieses Material betrifft und bei keinem Verfahren steht
      art.textContent='Material';
      titel.textContent=z.querySelector('.mx-mat').textContent;
      var k=z.querySelector('.mx-klein'); meta.textContent=k?k.textContent:'';
      var tpl=document.getElementById('eigen-'+z.id.slice(4));
      if(tpl) fin.appendChild(tpl.content.cloneNode(true));
    } else {
      art.textContent='Verfahren';
      titel.textContent=z.querySelector('h2').textContent;
      meta.textContent='';
      [].forEach.call(z.children,function(c){
        if(c.matches('h2,section.thema')) return;
        fin.appendChild(ohneIds(c.cloneNode(true)));
      });
      var th=z.querySelectorAll('section.thema');
      if(th.length){
        var box=document.createElement('div'); box.className='f-themen';
        box.innerHTML='<p>Themen</p><ul></ul>';
        [].forEach.call(th,function(t){ var li=document.createElement('li'), a=document.createElement('a'); a.href='#'+t.id; a.textContent=t.querySelector('h3').textContent; li.appendChild(a); box.querySelector('ul').appendChild(li); });
        fin.appendChild(box);
      }
    }
    [].forEach.call(document.querySelectorAll('.mchip, .mx-mat'),function(c){ c.setAttribute('aria-current',c.getAttribute('href')==='#'+z.id?'true':'false'); });
    if(f.hidden && von && !f.contains(von)) ausloeser=von;
    f.hidden=false; document.body.classList.add('f-offen');
    f.scrollTop=0; f.focus({preventScroll:true});
    try{ history.replaceState(null,'','#'+z.id); }catch(e){}
  }
  function zu(){
    if(f.hidden) return;
    f.hidden=true; document.body.classList.remove('f-offen');
    [].forEach.call(document.querySelectorAll('.mchip[aria-current="true"]'),function(c){ c.setAttribute('aria-current','false'); });
    if(ausloeser && document.contains(ausloeser)) ausloeser.focus({preventScroll:true});
    ausloeser=null;
  }
  document.getElementById('f-zu').addEventListener('click',zu);
  document.addEventListener('keydown',function(e){ if(e.key==='Escape' && !f.hidden && !document.querySelector('.b-pop:not([hidden])')) zu(); });
  // Vor dem Register-Sprung von app.js abfangen
  document.addEventListener('click',function(e){
    var a=e.target.closest('a[href^="#"]'); if(!a || a.classList.contains('b-wort')) return;
    // Maschine ohne eigenes Thema: Karte auf dem Plakat öffnen
    if(a.hasAttribute('data-maschine')){
      e.preventDefault(); e.stopPropagation(); zu();
      document.getElementById('t-verfahren').click();
      var name=a.getAttribute('data-maschine');
      var b=[].filter.call(document.querySelectorAll('#plakat-ziel .m-zeile'),function(x){ return x.querySelector('.m-name').textContent===name; })[0];
      if(b){ if(b.getAttribute('aria-expanded')!=='true') b.click(); b.scrollIntoView({block:'center'}); b.focus({preventScroll:true}); }
      return;
    }
    var z=document.getElementById(decodeURIComponent(a.getAttribute('href').slice(1)));
    if(z && z.matches('section.thema, section.verfahren, th.mx-zeile')){ e.preventDefault(); e.stopPropagation(); oeffne(z,a); return; }
    if(f.contains(a)) zu();
  },true);
  // Registerhinweise bei Links auf Themen entfernen, die öffnen ja jetzt das Fenster
  [].forEach.call(document.querySelectorAll('a[href^="#"] .reg-hin'),function(s){
    var z=document.getElementById(s.parentNode.getAttribute('href').slice(1));
    if(z && z.matches('section.thema, section.verfahren, th.mx-zeile')) s.remove();
  });
  var h=decodeURIComponent(location.hash.slice(1)), z=h&&document.getElementById(h);
  if(z && z.matches('section.thema, section.verfahren, th.mx-zeile')){ document.getElementById('t-matrix').click(); oeffne(z,null); }
})();
