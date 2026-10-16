# CRAP — Cercador de Pel·lícules

Documentació de la pràctica de disseny sobre l'aplicació **Cercador de Pel·lícules**:
captures de l'estat inicial, anàlisi crítica basada en els principis C.R.A.P. i la
refactorització aplicada per resoldre els problemes detectats.

**Què és C.R.A.P.?** Són quatre principis de disseny visual de Robin Williams
(*The Non-Designer's Design Book*):

| Principi          | Idea                                                                                                    |
| ----------------- | ------------------------------------------------------------------------------------------------------- |
| **C**ontrast      | Si dues coses no són iguals, fes-les *molt* diferents. El que és important ha de dominar visualment.     |
| **R**epetició     | Repeteix elements visuals (color, forma, espaiat, tipografia) per crear unitat i coherència.             |
| **A**lineació     | Res no es col·loca a l'atzar: cada element s'alinea amb un altre sobre un eix compartit.                 |
| **P**roximitat    | Els elements relacionats s'agrupen; els que no hi tenen res a veure se separen.                          |

---

## 1. Captures de l'estat inicial

> **Com afegir les captures:** crea una carpeta `screenshots/` a l'arrel del projecte,
> desa-hi les imatges amb els noms indicats i les rutes de sota es mostraran soles
> (si fas servir altres noms, només cal canviar les rutes).

Captura de la pantalla de cerca (estat inicial):

![Estat inicial — pantalla de cerca](screenshots/inicial-1.png)

Captura del diàleg de detall d'una pel·lícula (estat inicial):

![Estat inicial — detall de la pel·lícula](screenshots/inicial-2.png)

---

## 2. Anàlisi crítica (principis C.R.A.P.)

L'estat inicial de l'aplicació és funcional, però visualment és pla i no guia la
mirada de l'usuari. Pel que fa al **contrast**, no hi ha cap títol ni element que
actuï com a punt focal, de manera que el camp de cerca apareix «orfe» a dalt de tot
d'una pàgina blanca. Tots els botons comparteixen el mateix tractament (contorn gris
amb `border`), tant l'acció principal («More») com la secundària («Go back»), i els
títols de les targetes gairebé no es distingeixen dels subtítols; a més, les targetes
blanques sobre fons blanc no generen cap sensació de profunditat. Quant a la
**repetició**, no hi ha un llenguatge visual consistent: targetes, diàleg i botons es
construeixen sense un patró comú, hi ha detalls descuidats (per exemple
`class=" w-auto"` amb un espai sobrant) i, quan l'API retorna `"N/A"`, les imatges
surten trencades.

D'altra banda, l'**alineació** és deficient: a `MovieList.vue` hi ha un `v-container`
imbricat dins del `v-container` de la pàgina, cosa que duplica el *padding* i fa que
la graella de resultats no coincideixi amb l'eix de la resta de contingut; a més, els
botons de les targetes no queden alineats entre si quan el títol ocupa una o dues
línies, i al diàleg de detall hi ha un text perdut
(«trar la informació detallada dins d'un v-dialog.») que trenca la composició.
Finalment, la **proximitat** tampoc agrupa bé els elements: el camp de cerca no
s'associa visualment amb cap bloc ni amb els resultats, no s'indica quants resultats
s'han trobat, i dins del diàleg el títol, les dades (any, gènere, durada) i la
sinopsi queden barrejats sense jerarquia.

---

## 3. Refactorització

A continuació es resumeix cada problema detectat, la solució aplicada i el principi
C.R.A.P. que la justifica.

### 3.1 Contrast

| Problema a l'estat inicial                                                        | Solució aplicada                                                                                  |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| No hi ha punt focal ni jerarquia: tot pesa igual                                | Capçalera de pàgina amb icona, títol gran (`text-4xl`) i descripció en text atenuat              |
| Títol gris sobre fons blanc, poc èmfasi                                           | Títol dividit: «Cercador de» en `slate-900` i «Pel·lícules» en el color **primary** del tema        |
| Tots els botons són iguals (contorn gris), l'acció principal no destaca           | Accions principals amb botó **omplert** (`variant="flat"`, `color="primary"`); la resta, discretes |
| Títol i subtítol de la targeta gairebé idèntics                                   | Títol en negreta i fosc; metadades petites, atenuades i en majúscules                             |
| Targetes blanques sobre fons blanc sense profunditat                              | Fons de pàgina `bg-slate-100` i superfícies blanques amb vora + ombra                             |
| Alertes i metadades sense tractament propi                                        | Alertes **tonal** i metadades en **chips** de color                                              |

### 3.2 Repetició

| Problema a l'estat inicial                                                       | Solució aplicada                                                                                   |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Cada targeta es munta d'una manera i sense patró                                | Totes les targetes comparteixen la mateixa anatomia: pòster → títol → metadades → CTA              |
| Estils de superfície incoherents                                                 | Mateix radi `rounded-xl`, vora suau, ombra i escala d'espaiat a targetes, panell de cerca i diàleg |
| Metadades com a text pla, sense coherència amb la resta                          | Mateixa família de **chips** a la graella i al diàleg                                               |
| Imatges trencades quan l'API retorna `"N/A"`                                     | Pòster de reserva compartit (`src/utils/poster.ts` + `src/assets/poster-placeholder.svg`)           |
| Estats de càrrega diferents                                                     | Mateix `v-progress-circular` (mida, gruix i color) a la llista i al diàleg                          |

### 3.3 Alineació

| Problema a l'estat inicial                                                                            | Solució aplicada                                                                                     |
| ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `v-container` imbricat a `MovieList.vue`: doble *padding* i contingut desalineat                       | Eliminat el contenidor intern; tot comparteix una única graella                                       |
| Contingut sense un eix comú                                                                           | Columna única centrada (`mx-auto max-w-6xl`) per a capçalera, cerca i resultats                       |
| Botons que no s'alineen entre targetes quan el títol té llargada diferent                             | CTA fixat a la vora inferior de cada targeta                                                          |
| No s'indica quants resultats hi ha, sense relació amb la graella                                      | Encapçalament «Resultats (n)» alineat amb la graella                                                  |
| Text perdut al diàleg («trar la informació detallada dins d'un v-dialog.») que trencava la composició | Eliminat aquest text d'escombraries                                                                   |

### 3.4 Proximitat

| Problema a l'estat inicial                                                     | Solució aplicada                                                                              |
| ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| Camp de cerca orfe, sense identificar-se com un bloc                           | Cerca + botó agrupats dins d'un panell elevat (`v-sheet`) que els separa dels resultats        |
| Capçalera, cerca i resultats amb espaiat arbitrari                             | Títol i descripció units; més espai abans del panell de cerca                                   |
| Contingut de la targeta amb espaiat desordenat                                 | Espaiat intern estret (pòster→títol→metadades) i separació àmplia *entre* targetes             |
| Diàleg amb títol, dades i sinopsi barrejats                                    | Bloc títol + chips, després la sinopsi, i tancament amb divisor i acció d'amplada completa     |

### 3.5 Altres correccions incloses

- **`vite.config.mts` restablert.** El projecte no tenia cap configuració de Vite, de
  manera que el plugin de Vue no es registrava i l'aplicació ni compilava ni s'executava
  (error `[PARSE_ERROR]` a tots els fitxers `.vue`).
- **El diàleg es tanca amb `Esc` o clic al fons** (`@update:model-value` emet
  `movieClose`), mantenint sincronitzat l'estat del component pare.
- **Títol del document** d'`index.html` canviat de *«Welcome to Vuetify 4»* a
  *«Movie Searcher»*.

---

## 4. Captures de la versió millorada

> Mateix procediment: desa les noves captures a `screenshots/`.

Pantalla de cerca amb capçalera, panell de cerca i graella de resultats:

![Versió millorada — pantalla de cerca](screenshots/millora-1.png)

Detall de pel·lícula amb chips, sinopsi i acció destacada:

![Versió millorada — detall de la pel·lícula](screenshots/millora-2.png)

(afegeix tantes captures com calgui, p. ex. l'estat de càrrega o el resultat buit)

![Versió millorada — estat de càrrega](screenshots/millora-3.png)

---

## 5. Fitxers modificats

| Fitxer                                        | Canvi                                                            |
| --------------------------------------------- | ---------------------------------------------------------------- |
| `src/App.vue`                                 | Fons de pàgina atenuat (`bg-slate-100`)                          |
| `src/pages/index.vue`                         | Capçalera de pàgina i columna de contingut                       |
| `src/components/Searchbar.vue`                | Panell de cerca agrupat + botó principal                         |
| `src/components/MovieList.vue`                | Encapçalament de resultats, targetes d'alçada igual, estats      |
| `src/components/MoviePage.vue`                | Layout del diàleg, chips, accions i neteja de text perdut        |
| `src/utils/poster.ts`, `src/assets/poster-placeholder.svg` | Pòster de reserva compartit                          |
| `vite.config.mts`                             | Configuració de build restablerta                                |
| `index.html`                                  | Títol del document                                               |

---

## 6. Resum abans → després

| Àrea          | Abans                                                              | Després                                                                |
| ------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| Identitat     | Cap: la cerca penja en una pàgina en blanc                         | Títol centrat amb icona i descripció, accent primari al títol          |
| Cerca         | Camp de text sol                                                    | Camp + botó «Cerca» agrupats en una superfície elevada                 |
| Resultats     | Targetes amb títol/subtítol iguals i botó gris «More»              | Graella escanejable, títols en negreta, metadades atenuades, CTA primari |
| Estats        | Alertes genèriques i un sol espiner                                 | Estats coherents amb etiquetes i estil d'espiner repetit               |
| Diàleg        | Text perdut, layout pla, botó gris «Go back»                       | Pòster + chips de metadades + divisor + botó «Close» primari           |
